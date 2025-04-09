<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import { ClerkProvider, SignedIn, SignedOut, SignUpButton, UserButton } from 'svelte-clerk';
  import { buttonVariants } from '$lib/components/ui/button';
  import { useClerkAppearance } from '$lib/utils/clerkTheme';

  const { children }: { children: Snippet } = $props();
</script>

<ClerkProvider appearance={useClerkAppearance()}>
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
