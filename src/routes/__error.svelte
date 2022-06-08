<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				status: status,
				message: error.message
			}
		};
	}
</script>

<script>
	import goose from '../assets/static/images/error_bg.svg';

	export let status;
	export let message;
</script>

<section>
	<span>{status}</span>
	<h2>Ooops...</h2>
	<h1>{message}</h1>
	<a href="/" title="Take me home">Ga-Ga-Ga!!!!!!!!1</a>

	<div>
		<img class="goose" src={goose} alt="Goose" />
	</div>
</section>

<style>
	section {
		position: relative;
		margin: 0 auto;
		max-width: 920px;
		color: #9cbad2;
		font-family: monospace;
		overflow: hidden;
		text-align: center;
	}
	span {
		display: block;
		font-size: 144px;
		font-weight: bold;
		transform: rotate(6deg);
	}
	h2 {
		margin: 0;
		font-size: 48px;
		line-height: 1;
	}
	h1 {
		line-height: 1;
	}
	a {
		display: inline-block;
		margin: 50px 0;
		padding: 16px 24px;
		background-color: #9cbad2;
		color: #ffffff;
		text-decoration: none;
	}
	div {
		margin: 0 auto;
		max-width: 400px;
	}
	.goose {
		width: 100%;
		object-fit: contain;
		pointer-events: none;
		user-select: none;
	}
</style>
