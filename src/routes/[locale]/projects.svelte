<script context="module">
	import { getAllProjects } from '../../services/projects';

	export async function load({ params, fetch }) {
		return {
			props: {
				locale: params.locale,
				projectsData: await getAllProjects(params, fetch)
			}
		};
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { animate, lazyLoadImages } from '../../services/intersectionObserver';
	// store
	import { localeStore } from '../../store';
	// components
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import Section from '../../components/Section.svelte';
	import Container from '../../components/Container.svelte';
	import H2 from '../../components/Headings/H2.svelte';
	import ButtonLink from '../../components/ButtonLink.svelte';
	// styles
	import '@splidejs/svelte-splide/css/core';
	import '../../assets/styles/slider.scss';

  import thumb from '../../assets/static/images/thumb.svg';

	export let locale;
	export let projectsData;

	onMount(() => {
		const animations = document.querySelectorAll('.animate');
		const section = document.querySelectorAll('[data-entry="background"]');
		const img = document.querySelectorAll('[data-entry="img"]');

		animate(animations);
		lazyLoadImages(section);
		lazyLoadImages(img);
	});
</script>

<svelte:head>
	<title>Проекты • AcademeG</title>
</svelte:head>

{#each projectsData as project}
	<Section
		classes="flex items-center lg:min-h-screen bg-center bg-cover bg-no-repeat animate"
		data-src={project.bg_preview}
		data-entry="background"
	>
		<Container classes="flex items-center">
			<div class="w-full">
				<H2 classes="mb-7 md:w-4/5 animate" data-animate-fly="right">{project.title}</H2>
				<a
					class="group hidden sm:flex items-center mb-7 max-w-fit uppercase animate"
					data-animate-fly="right"
					href={project.webcast}
					target="_blank"
					rel="nofollow noopener noreferrer"
				>
					<svg
						width="48"
						height="48"
						viewBox="0 0 48 48"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="mr-4 duration-300 group-hover:scale-110"
					>
						<path
							d="M24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8ZM4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24Z"
							fill="white"
						/>
						<path
							d="M18 18.741C18 17.1975 19.6744 16.2357 21.0077 17.0135L30.0231 22.2725C31.3461 23.0442 31.3461 24.9558 30.0231 25.7276L21.0077 30.9865C19.6744 31.7643 18 30.8026 18 29.259V18.741Z"
							fill="white"
						/>
					</svg>
					{$localeStore.watch_on_youtube}
				</a>
				<div
					class="hidden sm:flex flex-wrap mb-14 md:mb-20 2xl:mb-14 w-full justify-center md:justify-between"
				>
					<div class="md:mb-7 2xl:mb-0 max-w-[38.75rem] animate" data-animate-fly="right">
						<p class="whitespace-pre-wrap">{project.short_description}</p>
					</div>
					<div class="hidden md:block animate" data-animate-fly="left">
						<Splide
							options={{
								perPage: 2,
								perMove: 2,
								speed: 1000,
								width: '36.25rem',
								gap: '1.25rem',
								arrowPath:
									'M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z',
								classes: {
									arrow: 'splide__arrow slider-arrow',
									prev: 'splide__arrow--prev slider-prev',
									next: 'splide__arrow--next slider-next',
									pagination: 'splide__pagination slider-pagination',
									page: 'splide__pagination__page slider-page'
								}
								/* breakpoints: {
									640: {
										perPage: 1,
										perMove: 1,
										autoWidth: true,
										gap: '0.625rem',
										arrows: false,
										focus: 'center'
									}
								} */
							}}
						>
							{#each project.slider as image, i}
								<SplideSlide>
									<img
										src={thumb}
                    alt="{project.title}: image {i + 1}"
										data-src={image}
										data-entry="img"
                    width="280"
                    height="140"
										class="w-[17.5rem] h-[8.75rem] object-cover"
									/>
								</SplideSlide>
							{/each}
						</Splide>
					</div>
				</div>
				<div class="animate" data-animate-fly="right">
					<ButtonLink href="/{locale}/projects/{project.id}" type="internal">
						{$localeStore.read_more}
					</ButtonLink>
				</div>
			</div>
		</Container>
	</Section>
{/each}
