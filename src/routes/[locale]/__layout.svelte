<script context="module">
	// services
	import { getLiveStream } from '../../services/getLiveStream';

	import * as langs from '../../db/language.json';
	import * as localesRu from '../../db/ru/locales.json';
	import * as localesEn from '../../db/en/locales.json';
	import * as mainMenuRu from '../../db/ru/main_menu.json';
	import * as mainMenuEn from '../../db/en/main_menu.json';
	import * as sideMenuRu from '../../db/ru/side_menu.json';
	import * as sideMenuEn from '../../db/en/side_menu.json';
	import * as shopMenuRu from '../../db/ru/shop_menu.json';
	import * as shopMenuEn from '../../db/en/shop_menu.json';

	import {
		currentLang,
		localeStore,
		languageStore,
		mainMenuStore,
		sideMenuStore,
		shopLinkStore
	} from '../../store';

	export async function load({ url, params }) {
		// get locales fields
		const localesData = params.locale === 'ru' ? localesRu : localesEn;
		// get main menu links
		const mainMenuData = params.locale === 'ru' ? mainMenuRu : mainMenuEn;
		// get side menu links
		const sideMenuData = params.locale === 'ru' ? sideMenuRu : sideMenuEn;
		// get shop menu link
		const shopData = params.locale === 'ru' ? shopMenuRu : shopMenuEn;

		// set current language
		currentLang.set(params.locale || 'ru');
		// set languages list
		if (langs) {
			const arr = Object.values(langs.data.attributes);
			languageStore.set(arr);
		}
		// set locales fields
		if (localesData) {
			localeStore.set(localesData.data.attributes);
		}
		// set main menu links
		if (mainMenuData) {
			mainMenuStore.set(mainMenuData.data.attributes.Route);
		}
		// set side menu links
		if (sideMenuData) {
			sideMenuStore.set(sideMenuData.data.attributes.Route);
		}
		// set shop link
		if (shopData) {
			shopLinkStore.set(shopData.data.attributes.Route);
		}
    
		const status = await getLiveStream()
			.then((data) => data.event)
			.catch((e) => console.log(e.message));

		return {
			props: {
				url,
				liveStream: status
			}
		};
	}
</script>

<script>
	import { setContext } from 'svelte';
	// components
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	// styles
	import '../../app.css';

	export let url;
	export let liveStream;

	setContext('liveStream', liveStream);
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
