<script lang="ts">
  import Post from '$lib/components/post.svelte';

  const { data } = $props();
  console.log(data.posts);
</script>

<div class="mt-8 flex w-full flex-col items-center justify-center">
  <img
    class="h-36 w-36 rounded-full"
    src={data.user.image}
    alt="verity user @{data.user.username}'s profile photo"
  />
  <h1 class="text-foreground text-3xl">@{data.user.username}</h1>
</div>

<div class="mt-8 flex flex-col gap-4 pb-8">
  {#each data.posts as post}
    <Post
      post={{
        ...post,
        createdAt: new Date(post.createdAt),
        username: data.user.username,
        image: data.user.image!,
      }}
    />
  {/each}
</div>
