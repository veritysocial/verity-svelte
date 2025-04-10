<script lang="ts">
  import { enhance } from '$app/forms';
  import Post from '$lib/components/post.svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import type { TPost, TPostClient } from '$lib/server/db/schema';
  import { SignedIn } from 'svelte-clerk';
  import { source } from 'sveltekit-sse';
  import type { PageServerData } from './$types';
  import { useClerkContext } from 'svelte-clerk';

  const ctx = useClerkContext();
  const { data }: { data: PageServerData } = $props();
  const value = source('/api/events').select('post');
  let messages: TPostClient[] = $state([]);

  value.subscribe((v) => {
    if (v.length !== 0) {
      const parsed = JSON.parse(v);
      console.log(ctx.user?.username, parsed.username);
      if (parsed.username !== ctx.user?.username) {
        // Append to messages without .push
        messages = [
          {
            id: parsed.id,
            content: parsed.content,
            createdAt: new Date(parsed.createdAt),
            framework: parsed.framework,
            username: parsed.username,
            image: parsed.image,
          },
          ...messages,
        ];
      }
    }
  });
</script>

<SignedIn>
  <Card.Root class="border-primary mx-auto mt-8 w-11/12 rounded-lg md:w-1/2">
    <form method="POST" use:enhance>
      <Card.Header>
        <Card.Title>Create Post</Card.Title>
        <Card.Description
          >Posting from Verity <span class="font-bold text-[#FF3E00]">Svelte</span></Card.Description
        >
      </Card.Header>
      <Card.Content>
        <Textarea name="content" id="content" placeholder="Share your thoughts with the world!" />
      </Card.Content>
      <Card.Footer>
        <Button type="submit" class="cursor-pointer">Post!</Button>
      </Card.Footer>
    </form>
  </Card.Root>
</SignedIn>

<div class="mt-8 flex flex-col gap-4">
  {#each messages as post}
    <Post {post} />
  {/each}
  {#each data.storedPosts as post}
    <Post {post} />
  {/each}
</div>
