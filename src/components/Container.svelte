<script>
	export let classes = null;
</script>

<div
	class="container relative mx-auto px-4 py-24 md:px-12 w-full h-full {classes}"
	{...$$restProps}
>
	<slot />
</div>