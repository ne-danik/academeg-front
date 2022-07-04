<script context="module">
	import { getOneProject } from '../../../services/projects';
	import { getYoutubeVideos } from '../../../services/getYoutubeVideos';

	export async function load({ params, fetch }) {
		const data = await getOneProject(params, fetch, params.project).then(async (data) => {
			const options = {
				playlistId: data.playlist_id
			};
			return {
				projectData: data,
				videosData: await getYoutubeVideos(options)
			};
		});

		return {
			props: {
				locale: params.locale,
				projectData: data.projectData,
				videosData: {
					nextPage: data.videosData.nextPage,
					data: data.videosData.data
				}
			}
		};
	}
</script>

<script>
	import { afterUpdate } from 'svelte';
	import { fade } from 'svelte/transition';
	import { animate } from '../../../services/intersectionObserver';
	// store
	import { localeStore } from '../../../store';
	// components
	import { Tabs, TabList, TabPanel, Tab } from '../../../components/Tabs';
	import { Grid, GridCell, GridHead, Ch, Ct } from '../../../components/Grid';
	import { H1, H3 } from '../../../components/Headings';
	import Section from '../../../components/Section.svelte';
	import Container from '../../../components/Container.svelte';
	import Modal from '../../../components/Modal.svelte';
	import Button from '../../../components/Button.svelte';
	import Plug from '../../../components/Plug.svelte';
	import Spinner from '../../../components/Spinner.svelte';

	export let locale;
	export let projectData;
	export let videosData;

	let scrollY = 0;
	let loading = false;

	let showModal = false;
	let videoData = {};

	const openModal = (id, title, subtitle) => {
		showModal = true;
		videoData.id = id;
		videoData.title = title;
		videoData.subtitle = subtitle || '';
	};

	const loadMore = async (nextPage) => {
		loading = true;
		const options = {
			page: nextPage,
			playlistId: projectData.playlist_id
		};
		const newVideo = await getYoutubeVideos(options);
		loading = false;
		videosData = {
			nextPage: newVideo.nextPage,
			data: [...videosData.data, ...newVideo.data]
		};
	};

	afterUpdate(() => {
		const animations = document.querySelectorAll('.animate');
		animate(animations);
	});
</script>

<svelte:head>
	<title>{projectData.title} • AcademeG</title>
</svelte:head>

<svelte:window bind:scrollY />

<Section classes="overflow-hidden" style="opacity: {-scrollY / 1000 + 1.2};">
	{#if projectData.hero_video}
		<div
			class="absolute z-[1] w-full h-full bg-no-repeat bg-cover bg-center pointer-events-none animate"
			style="background-image: url(https://i.ibb.co/tqpG1HH/shadow.png);"
		/>
		<video
			class="absolute w-full h-full object-cover"
			style="transform: translateY({scrollY / 4}px);"
			width="100%"
			height="100%"
			poster={projectData.bg_hero}
			autoplay
			muted
			loop
			webkit-playsinline
			playsinline
		>
			<source src={projectData.hero_video} type="video/mp4" />
		</video>
	{:else}
		<div
			class="absolute w-full h-full bg-no-repeat bg-cover animate"
			style="background-image: url({projectData.bg_hero}); background-position-x: center; background-position-y: {scrollY /
				4}px;"
		/>
	{/if}

	<Container classes="flex flex-col items-center justify-center h-screen text-center z-[2]">
		<a
			href="/{locale}/projects"
			class="group absolute left-4 md:left-12 top-28 md:top-36 flex items-center text-xs uppercase animate"
			data-animate-fly="left"
			data-animate-delay="600"
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="mr-2 duration-300 group-hover:-translate-x-1"
			>
				<path
					d="M6.13807 3.52859C6.39842 3.78894 6.39842 4.21105 6.13807 4.4714L3.27614 7.33333H14.3333C14.7015 7.33333 15 7.6318 15 7.99999C15 8.36818 14.7015 8.66666 14.3333 8.66666H3.27614L6.13807 11.5286C6.39842 11.7889 6.39842 12.211 6.13807 12.4714C5.87772 12.7317 5.45561 12.7317 5.19526 12.4714L1.19526 8.4714C1.07024 8.34637 1 8.1768 1 7.99999C1 7.82318 1.07024 7.65361 1.19526 7.52859L5.19526 3.52859C5.45561 3.26824 5.87772 3.26824 6.13807 3.52859Z"
					fill="white"
				/>
			</svg>
			{$localeStore.back_to_project}
		</a>
		<H1 classes="max-w-full md:max-w-[90%] animate" data-animate-fly="bottom"
			>{projectData.title}</H1
		>
		{#if projectData.quote}
			<q
				class="w-4/5 md:w-2/3 xl:w-1/2 mt-16 italic whitespace-pre-wrap animate"
				data-animate-fly="top"
			>
				{projectData.quote}
			</q>
		{/if}
	</Container>
</Section>

<Section>
	<Container>
		<H3 classes="mb-8 md:mb-10 lg:mb-12 animate" data-animate-fly="top"
			>{$localeStore.description}</H3
		>
		<p class="w-full lg:w-2/3 whitespace-pre-wrap animate" data-animate-fly="top">
			{projectData.description}
		</p>
	</Container>
</Section>

<Section
	classes="bg-bottom bg-contain bg-no-repeat"
	style="background-image: url({projectData.bg_spec})"
>
	<Container classes="pb-15">
		<H3 classes="mb-8 md:mb-10 lg:mb-12 animate" data-animate-fly="top">
			{$localeStore.specifications}
		</H3>
		<Grid classes="grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-2 xl:gap-x-24 lg:gap-y-12">
			<GridCell class="animate" data-animate-fly="top">
				<GridHead>{$localeStore.efficiency}</GridHead>
				<Grid classes="grid-cols-2 xs:grid-cols-1 gap-x-2 md:gap-x-4 lg:gap-x-5 gap-y-2">
					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.max_speed}</Ch>
						<Ct>
							{projectData.specifications.efficiency.max_speed}
							{$localeStore.km_h}
						</Ct>
					</GridCell>
					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.fuel}</Ch>
						<Ct>
							{projectData.specifications.efficiency.fuel}
							{$localeStore.l_mile}
						</Ct>
					</GridCell>
					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.overclocking}</Ch>
						<Ct>
							{projectData.specifications.efficiency.overclocking}
							{$localeStore.sec}.
						</Ct>
					</GridCell>
					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.fuel_grade}</Ch>
						<Ct>{projectData.specifications.efficiency.fuel_grade}</Ct>
					</GridCell>
				</Grid>
			</GridCell>
			<GridCell class="animate" data-animate-fly="top">
				<GridHead>{$localeStore.dimensions}</GridHead>
				<Grid classes="grid-cols-2 xs:grid-cols-1 gap-x-2 md:gap-x-4 lg:gap-x-5 gap-y-2">
					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.height}</Ch>
						<Ct>
							{projectData.specifications.dimensions.height}
							{$localeStore.mm}
						</Ct>
					</GridCell>
					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.length}</Ch>
						<Ct>
							{projectData.specifications.dimensions.length}
							{$localeStore.mm}
						</Ct>
					</GridCell>
					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.width}</Ch>
						<Ct>
							{projectData.specifications.dimensions.width}
							{$localeStore.mm}
						</Ct>
					</GridCell>

					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.clearance}</Ch>
						<Ct>
							{projectData.specifications.dimensions.clearance}
							{$localeStore.mm}
						</Ct>
					</GridCell>
				</Grid>
			</GridCell>
			<GridCell class="animate" data-animate-fly="top">
				<GridHead>{$localeStore.engine}</GridHead>
				<Grid classes="grid-cols-2 xs:grid-cols-1 gap-x-2 md:gap-x-4 lg:gap-x-5 gap-y-2">
					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.max_power}</Ch>
						<Ct>
							{projectData.specifications.engine.max_power_hp}
							{$localeStore.hp}
							{projectData.specifications.engine.max_power_rpm}
							{$localeStore.rpm}
						</Ct>
					</GridCell>
					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.engine_type}</Ch>
						<Ct>{projectData.specifications.engine.engine_type}</Ct>
					</GridCell>
					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.max_torque}</Ch>
						<Ct>
							{projectData.specifications.engine.max_torque_nm}
							{$localeStore.nm}
							{projectData.specifications.engine.max_torque_rpm}
							{$localeStore.rpm}
						</Ct>
					</GridCell>
				</Grid>
			</GridCell>
			<GridCell class="animate" data-animate-fly="top">
				<GridHead>{$localeStore.payload}</GridHead>
				<Grid classes="grid-cols-2 xs:grid-cols-1 gap-x-2 md:gap-x-4 lg:gap-x-5 gap-y-2">
					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.curb_weight}</Ch>
						<Ct>
							{projectData.specifications.payload.curb_weight}
							{$localeStore.kg}
						</Ct>
					</GridCell>
					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.fuel_tank}</Ch>
						<Ct>
							{projectData.specifications.payload.fuel_tank}
							{$localeStore.l}
						</Ct>
					</GridCell>
					<GridCell class="pb-2 border-b border-b-white/20 w-full">
						<Ch>{$localeStore.full_mass}</Ch>
						<Ct>
							{projectData.specifications.payload.full_mass}
							{$localeStore.kg}
						</Ct>
					</GridCell>
				</Grid>
			</GridCell>
			<GridCell class="animate" data-animate-fly="top">
				<GridHead>{$localeStore.transmission}</GridHead>
				<Grid classes="grid-cols-2 lg:grid-cols-1 xs:grid-cols-1 gap-x-2 lg:gap-x-5 gap-y-2">
					<GridCell class="pb-2 border-b border-b-white/20 w-full lg:w-1/2">
						<Ch>{$localeStore.box_gear}</Ch>
						<Ct>{projectData.specifications.transmission.transmission}</Ct>
					</GridCell>
					<GridCell class="pb-2 border-b border-b-white/20 w-full lg:w-1/2">
						<Ch>{$localeStore.gears}</Ch>
						<Ct>{projectData.specifications.transmission.gears}</Ct>
					</GridCell>
					<GridCell class="pb-2 border-b border-b-white/20 w-full lg:w-1/2">
						<Ch>{$localeStore.drive}</Ch>
						<Ct>{projectData.specifications.transmission.drive}</Ct>
					</GridCell>
				</Grid>
			</GridCell>
		</Grid>
	</Container>
</Section>

<Section>
	<Container>
		<H3 classes="mb-8 md:mb-10 lg:mb-12 animate" data-animate-fly="top">{$localeStore.gallery}</H3>
		<div class="animate" data-animate-fly="top">
			<Tabs>
				<TabList>
					<Tab>
						{$localeStore.video}
					</Tab>
					<span class="opacity-20">|</span>
					<Tab>
						{$localeStore.photo}
					</Tab>
				</TabList>

				<TabPanel>
					<Grid
						classes="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xs:grid-cols-1 gap-x-3 gap-y-4 lg:gap-x-6 xl:gap-x-8 xl:gap-y-5 2xl:gap-y-6 2xl:gap-x-12"
					>
						{#if videosData.data}
							{#each videosData.data as item}
								<div
									class="group relative cursor-pointer"
									on:click={() => openModal(item.playlist_id, item.title)}
									in:fade={{ delay: 300, duration: 300 }}
									out:fade={{ duration: 300 }}
								>
									<div class="relative w-full h-44 lg:h-40 xl:h-56">
										<img
											class="w-full h-full object-cover select-none pointer-events-none"
											src={item.thumbnail}
											alt={item.title}
                      width="400"
                      height="225"
										/>
										<div
											class="absolute z-[2] top-0 left-0 riCht-0 bottom-0 w-full h-full flex items-center justify-center"
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
											style="background-image: url({item.thumbnail}); filter: blur(20px) saturate(10)"
										/>
									</div>
									<p class="mt-1">{item.title}</p>
								</div>
							{/each}
						{/if}
					</Grid>
					{#if videosData.nextPage}
						<div class="mt-12 text-center animate" data-animate-fly="top">
							<Button on:click={() => loadMore(videosData.nextPage)} disabled={loading}>
								{#if loading}
									<Spinner />
								{:else}
									{$localeStore.load_more}
								{/if}
							</Button>
						</div>
					{/if}
				</TabPanel>

				<TabPanel>
					<div in:fade={{ delay: 300, duration: 300 }} out:fade={{ duration: 300 }}>
						<Plug />
					</div>
				</TabPanel>
			</Tabs>
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
