<script context="module">
	import {
		currentLang,
		localeStore,
		languageStore,
		mainMenuStore,
		sideMenuStore,
		shopLinkStore
	} from '../../store';

	import { getMenuLinks } from '../../services/menuLinks';

	export async function load({ url, params, fetch }) {
		const apiUrl = import.meta.env.VITE_API_URL;
		// get languages
		const langsURL = `${apiUrl}/api/language`;
		const langsData = await fetch(langsURL).then((res) => res.json());
		//const langsData = await langsRes.json();
		// get locales fields
		const localesURL = `${apiUrl}/api/localez?locale=${params.locale}&populate[0]=Route`;
		const localesData = await fetch(localesURL).then((res) => res.json());
		//const localesData = await localesRes.json();
		// get main menu links
    const mainMenuLinks = await getMenuLinks(params, fetch, 'main_menu');
		// get side menu links
    const sideMenuLinks = await getMenuLinks(params, fetch, 'side_menu');
		// get shop menu link
		const shopLink = await getMenuLinks(params, fetch, 'shop');

		// set current language
		currentLang.set(params.locale || 'ru');

		// set languages list
		const arr = Object.values(langsData?.data?.attributes);
		languageStore.set(arr || '');

		// set locales fields
		localeStore.set(localesData?.data?.attributes || '');

		// set main menu links
		mainMenuStore.set(mainMenuLinks || '');

		// set side menu links
		sideMenuStore.set(sideMenuLinks || '');

		// set shop link
		shopLinkStore.set(shopLink || '');

		return {
			props: {
				url
			}
		};
	}
</script>

<script>
	// components
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	// styles
	import '../../app.css';

	export let url;
</script>

<Header {url} />
<main>
	<slot />
</main>
<Footer />

<style>
	main {
		flex: 1 0 auto;
	}
</style>
