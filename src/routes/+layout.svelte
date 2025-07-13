<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/Navbar.svelte';
	
			// GitHub Pages SPA redirect script
		if (typeof window !== 'undefined') {
			// Single Page Apps for GitHub Pages
			// MIT License
			// https://github.com/rafgraph/spa-github-pages
			// This script checks to see if a redirect is present in the query string,
			// converts it back into the correct url and adds it to the
			// browser's history using window.history.replaceState(...),
			// which won't cause the browser to attempt to load the new url.
			// When the single page app is loaded further down in this file,
			// the correct url will be waiting in the browser's history for
			// the single page app to take over.
			(function(l: Location) {
				if (l.search[1] === '/' ) {
					var decoded = l.search.slice(1).split('&').map(function(s) { 
						return s.replace(/~and~/g, '&')
					}).join('?');
					window.history.replaceState('', '',
						l.pathname.slice(0, -1) + decoded + l.hash
					);
				}
			}(window.location))
		}
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
	<meta property="og:image" content="https://sinakarachiani.com/assets/web_icon.png" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://sinakarachiani.com/" />
	<meta property="og:site_name" content="Sina Karachiani" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Sina Karachiani" />
	<meta name="twitter:description" content="Portfolio of Sina Karachiani, composer, artist, and software engineer." />
	<meta name="twitter:image" content="https://sinakarachiani.com/assets/web_icon.png" />
	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />
	<meta name="author" content="Sina Karachiani" />
	<meta name="keywords" content="Sina Karachiani, composer, artist, pianist, software engineer, San Francisco, music, art, portfolio, new music, composition, piano, apple, AR, VR, Augmented Reality, Virtual Reality, Mixed Reality, Music Technology, Painter, illustrator, paint, illustration, Sina, Karachiani, Persian, American, Iranian, Iranian-American, Iranian-American Artist, Iranian-American Composer, Iranian-American Pianist, Iranian-American Software Engineer, Iranian-American Artist, Iranian-American Composer, Iranian-American Pianist, Iranian-American Software Engineer" />
	<meta name="language" content="en" />
	<meta name="revisit-after" content="7 days" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Sina Karachiani",
			"url": "https://sinakarachiani.com/",
			"description": "Composer, artist, pianist, and software engineer based in San Francisco, CA",
			"jobTitle": "Composer, Artist, Pianist, Software Engineer",
			"worksFor": {
				"@type": "Organization",
				"name": "Apple"
			},
			"address": {
				"@type": "PostalAddress",
				"addressLocality": "San Francisco",
				"addressRegion": "CA",
				"addressCountry": "US"
			},
			"sameAs": [
				"https://www.linkedin.com/in/sina-karachiani-5b9b8593/",
				"https://github.com/karachia",
				"https://www.instagram.com/skarachiani/",
				"https://soundcloud.com/sinakarachiani",
				"https://www.youtube.com/@sinakarachiani7415",
				"https://www.instagram.com/sina.karachiani.music/"
			]
		}
	</script>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			"name": "Sina Karachiani Portfolio",
			"url": "https://sinakarachiani.com/",
			"description": "Portfolio website of Sina Karachiani, composer, artist, and software engineer",
			"author": {
				"@type": "Person",
				"name": "Sina Karachiani"
			},
			"potentialAction": {
				"@type": "SearchAction",
				"target": "https://sinakarachiani.com/search?q={search_term_string}",
				"query-input": "required name=search_term_string"
			}
		}
	</script>
</svelte:head>
