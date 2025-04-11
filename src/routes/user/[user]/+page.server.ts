import { db } from '$lib/server/db';
import type { TPost } from '$lib/server/db/schema';
import { posts } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { User } from 'svelte-clerk/server';
import { clerkClient } from 'svelte-clerk/server';
import type { PageServerLoad } from '../$types';

export type UserReturn = Promise<{
  posts: Omit<TPost, 'user'>[];
  user: {
    username: string;
    image: string;
  };
}>;

export const load = (async ({ params }) => {
  const username = params.user;
  const { data } = await clerkClient.users.getUserList({
    username: [username],
  });

  const userData: User = data[0];
  const userPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .where(eq(posts.user, userData.id));

  return {
    user: {
      username,
      image: userData.imageUrl,
    },
    posts: userPosts,
  };
}) satisfies PageServerLoad;
