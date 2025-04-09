<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import type { TPostClient } from '$lib/server/db/schema';

  const { post }: { post: TPostClient } = $props();

  const frameWorkColors = {
    svelte: 'text-[#FF3E00]',
    react: 'text-[#66DBFB]',
    solid: 'text-[#315A99]',
    angular: 'text-[#AF2B2D]',
    vue: 'text-[#3FB27F]',
  };
</script>

<Card.Root class="border-primary mx-auto w-11/12 rounded-lg md:w-1/2">
  <Card.Header>
    <Card.Title class="flex items-center justify-start gap-2 font-normal">
      <img class="h-5 rounded-full" src={post.image} alt="verity user @{post.username}'s profile photo" />
      <div>
        <span class="font-bold">@{post.username}</span>
        <span class="text-muted-foreground">on Verity</span>
        <span class="font-bold {frameWorkColors[post.framework]}"
          >{post.framework.charAt(0).toUpperCase() + post.framework.slice(1)}</span
        >
      </div></Card.Title
    >
  </Card.Header>
  <Card.Content class="text-xl">
    {post.content}
  </Card.Content>
  <Card.Footer class="text-muted-foreground text-sm font-light">
    {post.createdAt.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })}
  </Card.Footer>
</Card.Root>
