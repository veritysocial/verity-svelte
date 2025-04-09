<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from 'svelte-clerk';
  import { buttonVariants } from '$lib/components/ui/button';
  import { useClerkAppearance } from '$lib/utils/clerkTheme';

  const { children }: { children: Snippet } = $props();
</script>

<ClerkProvider>
  <nav class="absolute top-4 left-4">
    <SignedOut>
      <SignInButton mode="modal" appearance={useClerkAppearance()}>
        <div class="{buttonVariants({ variant: 'default' })} cursor-pointer">Sign Up</div>
      </SignInButton>
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </nav>
  <div>
    {@render children()}
  </div>
</ClerkProvider>
