import { db } from '$lib/server/db';
import { posts, type TPostClient } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';
import { clerkClient } from 'svelte-clerk/server';
import { v4 } from 'uuid';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (): Promise<{ storedPosts: TPostClient[] }> => {
  const dbPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  const storedPosts: TPostClient[] = [];

  // Replace the user IDs with useful details
  for (const post of dbPosts) {
    // BE CAREFUL TO NOT RETURN THE CLERK OBJECT, THAT WILL
    // LEAK SENSITIVE DATA SUCH AS EMAILS & PHONE NUMBERS
    const userData = await clerkClient.users.getUser(post.user);
    storedPosts.push({
      ...post,
      username: userData.username!,
      image: userData.imageUrl,
    });
  }

  return { storedPosts };
};

export const actions = {
  default: async ({ locals, request }) => {
    // Check if the user is authenticated
    const { userId } = locals.auth;
    if (!userId) return fail(401);

    // Grab the post content
    const formData = await request.formData();
    const content = formData.get('content') as string;

    // Save the post in the DB
    const id = v4();
    await db.insert(posts).values({
      content,
      createdAt: new Date(),
      framework: 'svelte',
      id,
      user: userId,
    });

    return { success: true, id };
  },
} satisfies Actions;
