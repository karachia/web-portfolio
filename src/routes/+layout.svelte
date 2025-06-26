<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/Navbar.svelte';
</script>

<Navbar />
<div class="pt-20">
	<slot />
</div>

<svelte:head>
	<title>Sina Karachiani</title>
	<meta name="description" content="Portfolio of Sina Karachiani, composer, artist, and software engineer." />
	<link rel="canonical" href="https://sinakarachiani.com/" />
	<meta property="og:title" content="Sina Karachiani" />
	<meta property="og:description" content="Portfolio of Sina Karachiani, composer, artist, and software engineer." />
	<meta property="og:image" content="/assets/web_icon.png" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://sinakarachiani.com/" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Sina Karachiani" />
	<meta name="twitter:description" content="Portfolio of Sina Karachiani, composer, artist, and software engineer." />
	<meta name="twitter:image" content="/assets/web_icon.png" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Sina Karachiani",
			"url": "https://sinakarachiani.com/",
			"sameAs": [
				"https://www.linkedin.com/in/sina-karachiani-5b9b8593/",
				"https://github.com/karachia",
				"https://www.instagram.com/skarachiani/",
				"https://soundcloud.com/sinakarachiani",
				"https://www.youtube.com/@sinakarachiani7415",
				"https://www.instagram.com/sina.karachiani.music/""

			]
		}
	</script>
</svelte:head>
