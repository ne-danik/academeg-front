<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<button class:selected={$selectedTab === tab} on:click={() => selectTab(tab)}>
	<slot />
</button>

<style>
	button {
		@apply relative mx-2 py-0.5 border-b border-white border-opacity-0 text-white text-opacity-50 uppercase duration-300;
	}
	button:hover {
		@apply text-opacity-100;
	}

	.selected {
		@apply border-opacity-100 text-opacity-100;
	}
</style>
