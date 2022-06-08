<script>
	export let type = '';
	export let width;
	export let height;

	let button;
	let path;
	let hover;
	let btnWidth;
	let btnHeight;

	const handleMouseenter = () => {
		hover.style.transform = `translateX(0)`;
		button.style.color = 'black';
		if (path) {
			path.style.fill = 'black';
		}
	};

	const handleMouseleave = () => {
		hover.style.transform = `translateX(${btnWidth + btnHeight - 20}px)`;
		button.style.color = 'white';
		if (path) {
			path.style.fill = 'white';
		}
	};
</script>

<button
	class="relative inline-flex items-center px-6 py-4 border-2 border-white text-sm leading-none uppercase select-none overflow-hidden transition duration-300"
	style:width
	style:height
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
	bind:offsetWidth={btnWidth}
	bind:offsetHeight={btnHeight}
	bind:this={button}
	on:click
>
	{#if type === 'watch'}
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="mr-3"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM7 7.37052C7 6.59873 7.83721 6.11786 8.50387 6.50674L13.0116 9.13622C13.6731 9.5221 13.6731 10.4779 13.0116 10.8638L8.50387 13.4933C7.83721 13.8821 7 13.4013 7 12.6295V7.37052Z"
				fill="white"
				class="ease-out-expo duration-600"
				bind:this={path}
			/>
		</svg>
	{/if}

	<slot />

	<div
		class="absolute -top-0.5 right-0 bottom-0 -z-[1] ease-out-expo duration-600"
		style="left: -{btnHeight}px; border-bottom: {btnHeight}px solid white; border-left: {btnHeight}px solid transparent; transform: translateX({btnWidth +
			btnHeight -
			20}px);"
		bind:this={hover}
	/>
</button>

<style>
	button {
		color: white;
	}
	svg > path {
		fill: white;
	}
</style>
