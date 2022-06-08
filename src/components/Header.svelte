<script>
	import { fade, slide } from 'svelte/transition';
	import { currentToggleBurger } from '../store';
	// components
	import Logo from './Logo.svelte';
	import MainMenu from './MainMenu.svelte';
	import SideMenu from './SideMenu.svelte';
	import BurgerMenuButton from './BurgerMenuButton.svelte';
	import LangDropdown from './LangDropdown.svelte';

	export let url;

	let y = 0;
	let lastY = 0;
	const offset = 0;

	let isToggleBurger = false;
	let isShowHeader = true;
	let isScrolled = false;

	currentToggleBurger.subscribe((newValue) => (isToggleBurger = newValue));

	const onToggleBurger = () => {
		isToggleBurger = !isToggleBurger;
		currentToggleBurger.update(() => isToggleBurger);
	};

	const onToggleShowHeader = (y) => {
		const dy = lastY - y;
		lastY = y;
		return onToggleShow(y, dy);
	};

	const onToggleShow = (y, dy) => {
		if (isToggleBurger) {
			onToggleBurger();
		}
		if (y === offset) {
			isScrolled = false;
			return (isShowHeader = true);
		}
		if (dy < 0) {
			isScrolled = false;
			return (isShowHeader = false);
		}
		isScrolled = true;
		return (isShowHeader = true);
	};

	$: toggleShowHeader = onToggleShowHeader(y);
</script>

<svelte:window bind:scrollY={y} />

{#if isShowHeader}
	<header class="fixed top-0 left-0 w-full z-30">
		<div
			class="container flex items-center mx-auto py-4 px-4 md:px-12 lg:py-6"
			in:fade={{ duration: 300, delay: 300 }}
			out:fade={{ duration: 300 }}
		>
			<div class="mr-8 lg:mr-12">
				<Logo />
			</div>

			<MainMenu />
		</div>

		<div
			class="absolute flex items-center top-0 bottom-0 right-4 md:right-12 my-auto"
			in:fade={{ duration: 300, delay: 300 }}
			out:fade={{ duration: 300 }}
		>
			<div class="mr-3">
				<LangDropdown {url} />
			</div>

			{#if isToggleBurger}
				<SideMenu />
			{/if}

			<BurgerMenuButton on:click={onToggleBurger} />
		</div>

		{#if isScrolled}
			<div
				class="absolute top-0 left-0 right-0 bottom-0 -z-10 w-full h-full bg-black bg-opacity-90"
				in:slide={{ duration: 300 }}
				out:slide={{ duration: 300, delay: 300 }}
			/>
		{/if}
	</header>
{/if}
