import { produce } from 'sveltekit-sse';
import { DATABASE_URL } from '$env/static/private';
import { clerkClient } from 'svelte-clerk/server';
import pg from 'pg';

const client = new pg.Client({
  connectionString: DATABASE_URL,
});

// Initialize connection and LISTEN
async function initializePostgres() {
  await client.connect();
  await client.query(`LISTEN ${channel}`);

  // Basic error handling
  client.on('error', async (err) => {
    console.error('Postgres connection error:', err);
    await client.end();
    await initializePostgres();
  });
}

const channel = 'new_post';
await initializePostgres();

export function POST() {
  return produce(function start({ emit }) {
    client.on('notification', async (msg) => {
      const post = JSON.parse(msg.payload!).post;
      const user = await clerkClient.users.getUser(post.user);
      emit(
        'post',
        JSON.stringify({
          ...post,
          username: user.username,
          image: user.imageUrl,
          createdAt: new Date(post.createdAt),
        }),
      );
    });
  });
}
