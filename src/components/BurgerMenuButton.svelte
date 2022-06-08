<script>
	import { currentToggleBurger } from '../store';

	let toggle;

	currentToggleBurger.subscribe((newValue) => (toggle = newValue));
</script>

<button class="relative w-5 h-5 z-[33]" on:click>
	<div class="line line-top" class:toggle />
	<div class="line line-middle" class:toggle />
	<div class="line line-bottom" class:toggle />
</button>

<style>
	.line {
		position: absolute;
		left: 0;
		width: 1.25rem;
		height: 0.125rem;
		border-radius: 2px;
		background-color: #fff;
		transform: matrix(1, 0, 0, 1, 0, 0);
		transform-origin: center center;
		transition: all 0.2s ease-out;
	}
	.line-top {
		top: 0.25rem;
	}
	.line-middle {
		top: 0.5625rem;
		transform: scaleX(1);
	}
	.line-bottom {
		top: 0.875rem;
	}
	.line-top.toggle {
		transform: matrix(0.7, 0.7, -0.7, 0.7, 0, 5);
	}
	.line-middle.toggle {
		transform: scaleX(0);
	}
	.line-bottom.toggle {
		transform: matrix(0.7, -0.7, 0.7, 0.7, 0, -5);
	}
</style>
