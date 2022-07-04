<script>
	export let classes = null;
</script>

<section class="relative w-full {classes}" {...$$restProps} on:click>
	<slot />
</section>
