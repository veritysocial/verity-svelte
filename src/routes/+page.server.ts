import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { posts, type TPost } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

import { v4 } from 'uuid';

export const load: PageServerLoad = async (): Promise<{ storedPosts: TPost[] }> => {
  const storedPosts: TPost[] = await db.select().from(posts);
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
