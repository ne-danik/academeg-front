<script>
	import { currentLang } from '../store';
	import logo from '../assets/static/images/logo.svg';

	const locale = $currentLang;
</script>

<a href="/{locale}">
	<picture>
		<img src={logo} alt="AcademeG" />
	</picture>
</a>
