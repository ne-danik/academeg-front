<script>
	import { slide } from 'svelte/transition';
	import { languageStore, currentLang } from '../store';
	import { clickOutside } from '../actions/click_outside';

  export let url;
  
	const languages = $languageStore;
  
	let selectToggle = false;

	const onSelect = () => {
		selectToggle = !selectToggle;
	};
</script>

<div class="relative" id="select-lang" use:clickOutside on:outclick={() => (selectToggle = false)}>
	<button on:click={onSelect} class="px-3 py-1 font-exo font-semibold text-sm uppercase">
		{$currentLang}
	</button>
	{#if selectToggle}
		<div
			in:slide={{ duration: 300 }}
			out:slide={{ duration: 300 }}
			class="absolute top-full left-1/2 -translate-x-1/2 py-1 bg-white font-exo font-semibold text-sm text-black uppercase"
		>
			{#each languages as lang}
				{#if lang !== $currentLang}
					<a sveltekit:reload href="/{lang}{url.pathname.substring(3)}{url.searchParams}" class="block px-3 py-1">
						{lang}
					</a>
				{/if}
			{/each}
		</div>
	{/if}
</div>
