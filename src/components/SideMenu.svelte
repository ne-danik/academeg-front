<script>
  import { getContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import {
		currentLang,
		currentToggleBurger,
		sideMenuStore,
		shopLinkStore,
		mainMenuStore
	} from '../store';

	const liveStream = getContext('liveStream');

	const locale = $currentLang;
	const sideMenuLinks = $sideMenuStore;
	const mainMenuLinks = $mainMenuStore;
	const shopLink = $shopLinkStore;

	const navLinks = [...sideMenuLinks, ...shopLink];
	const mobileNavLinks = [...mainMenuLinks, ...sideMenuLinks, ...shopLink];

	let width;
	let isToggleBurger;

	currentToggleBurger.subscribe((newValue) => (isToggleBurger = newValue));

	const onToggleMenu = () => {
		isToggleBurger = !isToggleBurger;
		currentToggleBurger.update(() => isToggleBurger);
	};

	$: menu = width > 768 ? navLinks : mobileNavLinks;
</script>

<svelte:window bind:innerWidth={width} />

<div
	class="fixed top-0 left-0 bg-black bg-opacity-50 backdrop-blur-[2px] w-full h-full z-[31]"
	in:fade={{ duration: 600 }}
	out:fade={{ duration: 600 }}
	on:click|self={onToggleMenu}
/>
<div
	class="fixed top-0 right-0 px-12 pt-14 bg-black h-full w-[21.875rem] md:pt-20 xs:px-8 xs:w-full z-[32] overflow-y-auto"
	in:fly={{ x: 350, duration: 600, easing: cubicOut, opacity: 1 }}
	out:fly={{ x: 350, duration: 600, easing: cubicOut, opacity: 1 }}
>
	<nav>
		<ul>
			{#each menu as link, i}
				<li
					class="border-b border-b-white/20 font-exo text-sm uppercase leading-none"
					in:fly={{ x: 10, duration: 600, delay: 300 + (i + 1) * 50 }}
					out:fade={{ duration: 100 }}
				>
					<a
						href="{link.external_link ? '' : `/${locale}`}{link.url}"
						target={link.external_link ? '_blank' : ''}
						on:click={onToggleMenu}
						class="block py-3.5 duration-300 hover:opacity-60"
					>
						<span class="relative">
							{link.title}
							{#if link.title === 'Live' && liveStream}
								<span
									class="absolute -right-2.5 top-0 bottom-0 my-auto h-1.5 w-1.5 rounded-[50%] bg-red"
								/>
								<span
									class="absolute -right-3 top-0 bottom-0 my-auto h-2.5 w-2.5 rounded-[50%] bg-red animate-ping"
									title="Идёт трансляция"
								/>
							{/if}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>
