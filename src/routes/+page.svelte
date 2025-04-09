<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { SignedIn } from 'svelte-clerk';
  import { enhance } from '$app/forms';
  import Post from '$lib/components/post.svelte';

  import type { PageServerData } from './$types';
  const { data }: { data: PageServerData } = $props();
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
  {#each data.storedPosts as post}
    <Post {post} />
  {/each}
</div>
