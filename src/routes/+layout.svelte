<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import { ClerkProvider, SignedIn, SignedOut, SignUpButton, UserButton } from 'svelte-clerk';
  import { buttonVariants } from '$lib/components/ui/button';
  import { useClerkAppearance } from '$lib/utils/clerkTheme';
  import Logo from '$lib/components/logo.svelte';

  const { children }: { children: Snippet } = $props();
</script>

<ClerkProvider appearance={useClerkAppearance()}>
  <div class="text-foreground absolute top-4 right-4 flex flex-col items-end">
    <a href="/"><Logo /></a>
    <p class="w-fit">
      by <a
        href="https://www.arithefirst.com/"
        class="text-primary hover:text-primary/90 mr-2 underline"
        target="_blank">April Hall</a
      >
    </p>
  </div>
  <nav class="absolute top-4 left-4">
    <SignedOut>
      <SignUpButton mode="modal" appearance={useClerkAppearance()}>
        <div class="{buttonVariants({ variant: 'default' })} cursor-pointer">Sign Up</div>
      </SignUpButton>
    </SignedOut>
    <SignedIn>
      <UserButton
        appearance={{
          ...useClerkAppearance(),
          elements: {
            userButtonAvatarBox: {
              height: '48px',
              width: '48px',
            },
          },
        }}
      />
    </SignedIn>
  </nav>
  <div>
    {@render children()}
  </div>
</ClerkProvider>
