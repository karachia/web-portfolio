<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/Navbar.svelte';

	let { children } = $props();
</script>

<Navbar />
<div class="pt-20">
	{@render children()}
</div>
