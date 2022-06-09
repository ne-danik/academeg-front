<script>
	export let href = '/';
	export let type = '';
	export let target = null;
	export let rel = null;
	export let norel = false;
	export let styles = null;
	export let iconSize = '24';
	export let iconStyle = 'ml-3';

	let a;
	let path;
	let hover;
	let btnWidth = 0;
	let btnHeight = 0;

	const handleMouseenter = () => {
		hover.style.transform = `translateX(0)`;
		a.style.color = 'black';
		if (path) {
			path.style.fill = 'black';
		}
	};

	const handleMouseleave = () => {
		hover.style.transform = `translateX(${btnWidth + btnHeight - 20}px)`;
		a.style.color = 'white';
		if (path) {
			path.style.fill = 'white';
		}
	};
</script>

<a
	class="relative z-[1] inline-flex items-center justify-center px-6 py-4 border-2 border-white text-white text-sm leading-none uppercase overflow-hidden transition duration-300 {styles}"
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
	bind:offsetWidth={btnWidth}
	bind:offsetHeight={btnHeight}
	bind:this={a}
	{href}
	{target}
	rel={(norel && 'nofollow noopener noreferrer') || rel}
	on:click
>
	<span class="text-sm text-center leading-[140%] select-none">
		<slot />
	</span>

	{#if type === 'internal'}
		<div
			class="inline-block w-[{iconSize / 16}rem] h-[{iconSize / 16}rem] overflow-hidden {iconStyle}"
		>
			<svg
				class="internal"
				width={iconSize}
				height={iconSize}
				viewBox="0 0 96 96"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M55.5716 21.1716C57.1337 19.6095 59.6663 19.6095 61.2284 21.1716L85.2284 45.1716C85.9786 45.9217 86.4 46.9391 86.4 48C86.4 49.0609 85.9786 50.0783 85.2284 50.8284L61.2284 74.8284C59.6663 76.3905 57.1337 76.3905 55.5716 74.8284C54.0095 73.2663 54.0095 70.7337 55.5716 69.1716L72.7431 52L13.5996 52C11.3905 52 9.59961 50.2091 9.59961 48C9.59961 45.7909 11.3905 44 13.5996 44L72.7431 44L55.5716 26.8284C54.0095 25.2663 54.0095 22.7337 55.5716 21.1716Z"
					fill="white"
					bind:this={path}
				/>
			</svg>
		</div>
	{/if}

	{#if type === 'external'}
		<span
			class="inline-block w-[{iconSize / 16}rem] h-[{iconSize / 16}rem] overflow-hidden {iconStyle}"
		>
			<svg
				class="external"
				width={iconSize}
				height={iconSize}
				viewBox="0 0 48 48"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M16 14C16 12.8954 16.8954 12 18 12L34 12C35.1046 12 36 12.8954 36 14V30C36 31.1046 35.1046 32 34 32C32.8954 32 32 31.1046 32 30V18.8284L15.4142 35.4142C14.6332 36.1953 13.3668 36.1953 12.5858 35.4142C11.8047 34.6332 11.8047 33.3668 12.5858 32.5858L29.1716 16L18 16C16.8954 16 16 15.1046 16 14Z"
					fill="white"
					class="ease-out-expo duration-600"
					bind:this={path}
				/>
			</svg>
		</span>
	{/if}
	<span
		class="absolute block -top-0.5 right-0 bottom-0 -z-[1] transition-transform ease-out-expo duration-600"
		style="left: -{btnHeight}px; border-bottom: {btnHeight}px solid white; border-left: {btnHeight}px solid transparent; transform: translateX({btnWidth +
			btnHeight -
			20}px);"
		bind:this={hover}
	/>
</a>

<style>
	svg > path {
		transition: all 0.3s;
		fill: white;
	}

	a:hover svg.external,
	a:active svg.external {
		animation: toTopRight 0.4s linear;
	}

	a:hover svg.internal,
	a:active svg.internal {
		animation: toRight 0.4s linear;
	}

	@keyframes toRight {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(100%);
			opacity: 1;
		}
		50.1% {
			opacity: 0;
		}
		50.2% {
			opacity: 1;
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(0);
		}
	}

	@keyframes toTopRight {
		0% {
			transform: translateX(0) translateY(0);
		}
		50% {
			transform: translateX(100%) translateY(-100%);
			opacity: 1;
		}
		50.1% {
			opacity: 0;
		}
		50.2% {
			opacity: 1;
			transform: translateX(-100%) translateY(100%);
		}
		100% {
			transform: translate(0, 0);
		}
	}
</style>
