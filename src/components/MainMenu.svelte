<script>
	import { fade } from 'svelte/transition';
	import { currentLang, mainMenuStore, shopLinkStore } from '../store';

	const locale = $currentLang;
	const mainMenuLinks = $mainMenuStore;
	const shopLink = $shopLinkStore;

	const navLinks = [...mainMenuLinks, ...shopLink];

	let width = 0;
	let left = 0;
	let opacitySpan = 0;
	let hovering = false;

	const onMouseenter = () => {
		opacitySpan = 1;
	};

	const onMouseleave = () => {
		hovering = false;
		opacitySpan = 0;
	};

	const movingBar = (e) => {
		hovering = true;
		width = e.target.offsetWidth;
		left = e.target.offsetLeft;
	};
</script>

<nav
	class="hidden relative overflow-hidden md:block"
	on:mouseenter={onMouseenter}
	on:mouseleave={onMouseleave}
>
	{#each navLinks as link}
		<a
			href="{link.external_link ? '' : `/${locale}`}{link.url}"
			target={link.external_link ? '_blank' : '_self'}
			class="relative inline-block mr-4 lg:mr-6 py-1 font-exo font-semibold text-sm uppercase text-shadow"
			on:mouseenter={movingBar}
		>
			<span>{link.title}</span>
		</a>
	{/each}
	{#if hovering}
		<span
			class="absolute left-0 bottom-0 w-0 h-0.5 bg-white rounded duration-300 ease-[cubic-bezier(0.65, 0.05, 0.36, 1)]"
			style="width: {width}px; left: {left}px; opacity: {opacitySpan}"
			transition:fade={{ duration: 150 }}
		/>
	{/if}
</nav>
