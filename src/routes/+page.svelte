<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Card.Root class="border-primary mx-auto mt-8 w-11/12 md:w-1/2">
	<form>
		<Card.Header>
			<Card.Title>Create Post</Card.Title>
		</Card.Header>
		<Card.Content>
			<Textarea name="content" id="content" placeholder="Share your thoughts with the world!" />
		</Card.Content>
		<Card.Footer>
			<Button type="submit" class="cursor-pointer">Post!</Button>
		</Card.Footer>
	</form>
</Card.Root>
