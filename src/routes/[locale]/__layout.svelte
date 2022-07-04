<script context="module">
	import {
		currentLang,
		localeStore,
		languageStore,
		mainMenuStore,
		sideMenuStore,
		shopLinkStore
	} from '../../store';

	export async function load({ url, params, fetch }) {
		const apiUrl = import.meta.env.VITE_API_URL;
		// get languages
		const langsURL = `${apiUrl}/api/language`;
		const langsData = await fetch(langsURL).then(res => res.json());
		//const langsData = await langsRes.json();
		// get locales fields
		const localesURL = `${apiUrl}/api/localez?locale=${params.locale}&populate[0]=Route`;
		const localesData = await fetch(localesURL).then(res => res.json());
		//const localesData = await localesRes.json();
		// get main menu links
		const mainMenuURL = `${apiUrl}/api/routers/${params.locale === 'ru' ? 1 : 2}?populate[0]=Route`;
		const mainMenuData = await fetch(mainMenuURL).then(res => res.json());
		//const mainMenuData = await mainMenuRes.json();
		// get side menu links
		const sideMenuURL = `${apiUrl}/api/routers/${params.locale === 'ru' ? 3 : 4}?populate[0]=Route`;
		const sideMenuData = await fetch(sideMenuURL).then(res => res.json());
		//const sideMenuData = await sideMenuRes.json();
		// get shop menu link
		const shopURL = `${apiUrl}/api/routers/${params.locale === 'ru' ? 5 : 6}?populate[0]=Route`;
		const shopData = await fetch(shopURL).then(res => res.json());
		//const shopData = await shopRes.json();

		// set current language
		currentLang.set(params.locale || 'ru');

		// set languages list
		if (langsRes.ok) {
			const arr = Object.values(langsData.data.attributes);
			languageStore.set(arr);
		} else {
      languageStore.set('');
    }

		// set locales fields
		if (localesRes.ok) {
			localeStore.set(localesData.data.attributes);
		} else {
      localeStore.set('');
    }

		// set main menu links
		if (mainMenuRes.ok) {
			mainMenuStore.set(mainMenuData.data.attributes.Route);
		} else {
      mainMenuStore.set('');
    }

		// set side menu links
		if (sideMenuRes.ok) {
			sideMenuStore.set(sideMenuData.data.attributes.Route);
		} else {
      sideMenuStore.set('');
    }

		// set shop link
		if (shopRes.ok) {
			shopLinkStore.set(shopData.data.attributes.Route);
		} else {
      shopLinkStore.set('');
    }

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
