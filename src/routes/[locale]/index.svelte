<script context="module">
	import { getLatestVideo } from '../../services/latestVideo';
	import { getPreviousVideo } from '../../services/previousVideo';
	import { getLatestInterview } from '../../services/latestInterview';
	import { getSocialNetworks } from '../../services/socialNetworks';

	export async function load({ params }) {
		return {
			props: {
				locale: params.locale,
				latestVideo: getLatestVideo(),
				previousVideo: getPreviousVideo(),
				latestInterview: getLatestInterview(),
				socials: getSocialNetworks()
			}
		};
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { animate, lazyLoadImages } from '../../services/intersectionObserver';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import 'dayjs/locale/ru';
	// store
	import { localeStore } from '../../store';
	// components
	import Section from '../../components/Section.svelte';
	import Container from '../../components/Container.svelte';
	import { H2, H3, H4 } from '../../components/Headings';
	import Button from '../../components/Button.svelte';
	import ButtonLink from '../../components/ButtonLink.svelte';
	import Modal from '../../components/Modal.svelte';

	export let locale;
	export let latestVideo;
	export let previousVideo;
	export let latestInterview;
	export let socials;

	let innerHeight;
	let scrollY;

	let showModal = false;
	let videoData = {};

	dayjs.extend(relativeTime);
	dayjs.locale(locale);

	const openModal = (id, title, subtitle) => {
		showModal = true;
		videoData.id = id;
		videoData.title = title;
		videoData.subtitle = subtitle || '';
	};

	onMount(() => {
		const animateBlocks = document.querySelectorAll('.animate');
		const section = document.querySelectorAll('[data-entry="background"]');
		const img = document.querySelectorAll('[data-entry="img"]');

		animate(animateBlocks);
		lazyLoadImages(section);
		lazyLoadImages(img);
	});
</script>

<svelte:head>
	<title>AcademeG</title>
</svelte:head>

<svelte:window bind:innerHeight bind:scrollY />

<Section classes="relative h-full overflow-hidden">
	<div
		class="absolute w-full h-full bg-no-repeat bg-cover animate"
		style="background-image: url({latestVideo.thumb_default}); background-position-x: center; background-position-y: {scrollY / 4}px;"
	>
		<div
			class="absolute left-0 right-0 bottom-0 w-full bg-gradient-to-t from-black"
			style="height: {scrollY * 0.04 + 16}rem"
		/>
	</div>
	<Container classes="h-screen" style="height: {innerHeight / 16}rem;">
		<div
			class="absolute left-0 top-1/2 px-4 md:px-12 w-full -translate-y-1/2"
			style="top: {innerHeight / 2 - scrollY / 4}px;"
		>
			<H4 classes="mb-3 lg:mb-2 animate" data-animate-fly="top">
				{$localeStore.latest_realese}
			</H4>
			<H2 classes="mb-1 w-[80%] xl:mb-3 animate" data-animate-fly="top">
				{latestVideo.title}
			</H2>
			{#if latestVideo.subtitle}
				<H3 classes="mb-12 w-[60%] md:mb-14 animate" data-animate-fly="top">
					{latestVideo.subtitle}
				</H3>
			{/if}
			<div class="animate" data-animate-fly="top">
				<Button
					type="watch"
					on:click={() => openModal(latestVideo.video_id, latestVideo.title, latestVideo.subtitle)}
				>
					{$localeStore.watch_btn}
				</Button>
			</div>
		</div>
	</Container>
</Section>

<Section
	classes="bg-bottom bg-no-repeat bg-contain"
	style="background-image: url(https://i.ibb.co/RGKDQzS/prev-bg.webp);"
>
	<Container classes="pb-36 lg:pb-[18.125rem]">
		<H4 classes="mb-8 lg:mb-7 animate" data-animate-fly="top">
			{$localeStore.previous_releases}
		</H4>
		<div
			class="flex flex-col sm:flex-row flex-wrap justify-between items-center sm:items-start w-full"
		>
			{#each previousVideo as item, i}
				<div
					class="group mb-8 w-full sm:w-72 md:w-80 lg:w-[28rem] xl:mb-0 xl:w-80 cursor-pointer animate"
					on:click={() => openModal(item.video_id, item.title, item.subtitle)}
					data-animate-fly="top"
					data-animate-delay={i * 150}
				>
					<div class="relative w-full h-[20%] sm:h-[10rem] lg:h-[14rem] xl:h-[11.25rem]">
						<img
							class="w-full h-full object-cover select-none pointer-events-none"
							src=""
							alt={item.title}
							data-src={item.thumb}
							data-entry="img"
						/>
						<div
							class="absolute z-[2] top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center"
						>
							<svg
								width="64"
								height="64"
								viewBox="0 0 64 64"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								class="duration-600 group-hover:scale-75"
							>
								<path
									d="M16 17.9761C16 13.8599 20.4651 11.2952 24.0206 13.3692L48.0616 27.3932C51.5897 29.4512 51.5896 34.5488 48.0616 36.6068L24.0206 50.6307C20.4651 52.7047 16 50.1401 16 46.0239V17.9761ZM45.3743 32L21.3333 17.9761V46.0239L45.3743 32Z"
									fill="white"
								/>
							</svg>
						</div>
						<div
							class="absolute z-[1] top-0 left-0 right-0 bottom-0 w-full h-full bg-gradient-to-t from-black/50 select-none pointer-events-none group-hover:opacity-0 duration-600"
						/>
						<div
							class="absolute -z-[1] top-0 left-0 right-0 bottom-0 w-full h-full bg-no-repeat bg-center bg-cover scale-105 select-none pointer-events-none opacity-0 group-hover:opacity-30 duration-600"
							style="background-image: url({item.thumb}); filter: blur(20px) saturate(10)"
						/>
					</div>
					<p class="py-2 lg:py-3 text-xs lg:text-sm leading-none text-white/80 uppercase">
						{dayjs().to(dayjs(item.date))}
					</p>
					<p class="text-lg lg:text-xl font-bold leading-none uppercase line-clamp">
						{item.title}
						{item.subtitle ? item.subtitle : ''}
					</p>
				</div>
			{/each}
			<div class="animate" data-animate-fly="top" data-animate-delay="450">
				<ButtonLink
					type="external"
					href="{socials.youtube}/videos"
					styles="flex-col flex-col-reverse sm:w-72 sm:h-[10rem] md:w-80 lg:w-[28rem] lg:h-[14rem] xl:w-40 xl:h-[11.25rem] "
					iconSize="48"
					iconStyle="mb-3"
					target="_blank"
					norel
				>
					{$localeStore.go_to_youtube_channel}
				</ButtonLink>
			</div>
		</div>
	</Container>
</Section>

<Section>
	<Container classes="py-20 lg:px-0 lg:py-32 lg:max-w-[44rem] text-center">
		<H2 classes="mb-1 xl:mb-3 animate" data-animate-fly="top">
			{$localeStore.suprotec_racing}
		</H2>
		<H3 classes="mb-12 animate" data-animate-fly="top">{$localeStore.cars_and_people}</H3>
		<p class="mb-5 animate" data-animate-fly="top">{$localeStore.suprotec_car_people_bigtext}</p>
		<p class="mb-20 font-bold animate" data-animate-fly="top">
			{$localeStore.suprotec_car_people_textbold}
		</p>
		<div class="animate" data-animate-fly="top">
			<ButtonLink type="external" href={socials.youtube_suprotec} target="_blank" norel>
				{$localeStore.watch_all_interviews}
			</ButtonLink>
		</div>
	</Container>
	<div
		class="absolute top-0 left-0 w-full -z-10 h-full bg-top bg-no-repeat bg-contain"
		style="background-image: url(https://i.ibb.co/2h6Lz2T/suprotec-bg.webp)"
	/>
</Section>

<Section
	classes="group h-full cursor-pointer"
	on:click={() =>
		openModal(latestInterview.video_id, latestInterview.title, latestInterview.subtitle)}
>
	<div
		class="absolute w-full h-full bg-center bg-no-repeat bg-cover animate"
		data-src={latestInterview.preview}
		data-entry="background"
	/>
	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9] select-none duration-600 group-hover:scale-75"
	>
		<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M24 26.9642C24 20.7899 30.6977 16.9429 36.031 20.054L72.0924 41.0898C77.3845 44.1769 77.3845 51.8233 72.0924 54.9103L36.031 75.9461C30.6977 79.0572 24 75.2102 24 69.0359V26.9642ZM68.0615 48.0001L32 26.9642V69.0359L68.0615 48.0001Z"
				fill="white"
			/>
		</svg>
	</div>
	<Container classes="h-screen">
		<div class="absolute left-0 bottom-[10%] md:bottom-[15%] xl:bottom-[20%] px-4 md:px-12 w-full">
			<h4 class="h4 mb-3 lg:mb-2 animate" data-animate-fly="top">{$localeStore.big_phrasebook}</h4>
			<h2 class="h2 mb-1 w-[80%] lg:mb-3 animate" data-animate-fly="top">
				{latestInterview.title}
			</h2>
			{#if latestInterview.subtitle}
				<h3 class="h3 w-[60%] animate" data-animate-fly="top">{latestInterview.subtitle}</h3>
			{/if}
		</div>
	</Container>
</Section>

<Section
	classes="h-full bg-top bg-no-repeat bg-contain"
	style="background-image: url(https://i.ibb.co/grW2WVp/suprotec-bottom-bg.webp);"
>
	<Container classes="md:px-12 pt-24 pb-16 lg:pt-36 lg:pb-24">
		<div class="w-full flex flex-col xl:flex-row justify-between xl:gap-x-20 2xl:gap-x-28">
			<div class="basis-full mb-24 animate" data-animate-fly="top">
				<div class="flex items-center text-center flex-col">
					<div class="shrink-0 mb-4 md:mb-6 w-12 md:w-16 xl:w-[4.5rem]">
						<img
							src="https://i.ibb.co/qpbRn2P/ch1.jpg"
							alt="AcademeG DailyStream"
							class="w-12 h-12 md:w-16 md:h-16 xl:w-[4.5rem] xl:h-[4.5rem] rounded-full overflow-hidden object-cover select-none pointer-events-none"
						/>
					</div>
					<H3>AcademeG DailyStream</H3>
				</div>
				<div class="text-center">
					<p class="mb-2 py-4 md:py-6 maw text-center">{$localeStore.about_daily_chn}</p>
					<ButtonLink type="external" href={socials.youtube_daily} target="_blank" norel>
						{$localeStore.go_to_channel}
					</ButtonLink>
				</div>
			</div>
			<div class="basis-full mb-24 animate" data-animate-fly="top" data-animate-delay="300">
				<div class="flex items-center text-center flex-col">
					<div class="shrink-0 mb-4 md:mb-6 w-12 md:w-16 xl:w-[4.5rem]">
						<img
							src="https://i.ibb.co/Jz147yx/ch2.jpg"
							alt="AcademeG 2nd CH"
							class="w-12 h-12 md:w-16 md:h-16 xl:w-[4.5rem] xl:h-[4.5rem] rounded-full overflow-hidden object-cover select-none pointer-events-none"
						/>
					</div>
					<H3>AcademeG 2nd CH</H3>
				</div>
				<div class="text-center">
					<p class="mb-2 py-4 md:py-6 text-center">{$localeStore.about_2nd_chn}</p>
					<ButtonLink type="external" href={socials.youtube_2nd} target="_blank" norel>
						{$localeStore.go_to_channel}
					</ButtonLink>
				</div>
			</div>
		</div>
		<div class="mx-auto w-0.5 h-40 bg-white animate" data-animate-fly="top" />
		<div class="flex mx-auto mt-16 w-max animate" data-animate-fly="top">
			<a
				class="text-xs uppercase mr-7"
				href={socials.vk}
				target="_blank"
				rel="nofollow noopener noreferrer"
			>
				VK
			</a>
			<a
				class="text-xs uppercase mr-7"
				href={socials.youtube}
				target="_blank"
				rel="nofollow noopener noreferrer"
			>
				Youtube
			</a>
			<a
				class="text-xs uppercase mr-0"
				href={socials.instagram}
				target="_blank"
				rel="nofollow noopener noreferrer"
			>
				Instagram
			</a>
		</div>
	</Container>
</Section>

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<div class="relative w-full h-0 pb-[56.25%]">
			<iframe
				class="absolute top-0 left-0 w-full aspect-video"
				src="https://www.youtube.com/embed/{videoData.id}?autoplay=1"
				title={videoData.title}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				autoplay
			/>
		</div>
	</Modal>
{/if}
