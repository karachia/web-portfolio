<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Icon from 'svelte-awesome';

	/// *** Embedded Icons ***
	import github from 'svelte-awesome/icons/github';
	import linkedin from 'svelte-awesome/icons/linkedin';
	import instagram from 'svelte-awesome/icons/instagram';
	import soundcloud from 'svelte-awesome/icons/soundcloud';

	let showRest = false;
	let welcomeSection: HTMLElement | null = null;
	let welcomeOpacity = 1;

	function revealRestAndScroll(e: Event) {
		showRest = true;
		// Let the anchor scroll after revealing
		setTimeout(() => {
			const welcome = document.getElementById('welcome');
			if (welcome) {
				// Custom smooth scroll
				const targetY = welcome.getBoundingClientRect().top + window.pageYOffset;
				const startY = window.pageYOffset;
				const duration = 900; // ms
				const startTime = performance.now();
				function scrollStep(now: number) {
					const elapsed = now - startTime;
					const progress = Math.min(elapsed / duration, 1);
					const ease =
						progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
					window.scrollTo(0, startY + (targetY - startY) * ease);
					if (progress < 1) {
						requestAnimationFrame(scrollStep);
					}
				}
				requestAnimationFrame(scrollStep);
			}
		}, 10);
		e.preventDefault();
	}

	function updateWelcomeOpacity() {
		if (!welcomeSection) return;
		const rect = welcomeSection.getBoundingClientRect();
		const sectionCenter = rect.top + rect.height / 2;
		const viewportCenter = window.innerHeight / 2;
		const distance = Math.abs(sectionCenter - viewportCenter);
		// Fade out when the center is more than half the section height away from center of viewport
		const fadeDistance = rect.height / 2 + window.innerHeight / 2;
		let opacity = 1 - 2 * (distance / fadeDistance);
		welcomeOpacity = Math.max(0, Math.min(1, opacity));
	}

	onMount(() => {
		const onScroll = () => {
			if (!showRest && window.scrollY > 10) {
				showRest = true;
				window.removeEventListener('scroll', onScroll);
			}
		};
		window.addEventListener('scroll', onScroll);

		window.addEventListener('scroll', updateWelcomeOpacity);
		window.addEventListener('resize', updateWelcomeOpacity);
		setTimeout(updateWelcomeOpacity, 0);

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('scroll', updateWelcomeOpacity);
			window.removeEventListener('resize', updateWelcomeOpacity);
		};
	});
</script>

<svelte:head>
	<title>Sina Karachiani</title>
	<meta
		name="description"
		content="Portfolio of Sina Karachiani, composer, artist, and software engineer."
	/>
</svelte:head>

<section
	id="home"
	class="fade-in relative flex min-h-[70vh] flex-col items-center justify-center px-4 pt-16"
>
	<div class="flex items-center justify-center space-x-4">
		<img
			src="/assets/SK_Brand.png"
			alt="Sina Karachiani Logo"
			class="-mt-6 h-44 w-auto rounded drop-shadow-lg"
		/>
		<div class="flex flex-col">
			<h1
				style="font-family: 'Zen Kurenaido', sans-serif;"
				class="font-serif text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow-lg md:text-6xl"
			>
				S I N A&nbsp;&nbsp;&nbsp;K A R A C H I A N I
			</h1>
			<h2 class="mt-2 text-lg font-light tracking-wide text-gray-600 drop-shadow-lg md:text-2xl">
				Composer, Artist, Pianist, Software Engineer
			</h2>
			<div class="mt-4 flex space-x-6">
				<a
					href="https://github.com/karachia"
					target="_blank"
					class="text-gray-600 transition-colors hover:text-gray-900"
				>
					<Icon data={github} scale={1.5} />
				</a>
				<a
					href="https://www.linkedin.com/in/sina-karachiani-5b9b8593/"
					target="_blank"
					class="text-gray-600 transition-colors hover:text-gray-900"
				>
					<Icon data={linkedin} scale={1.5} />
				</a>
				<a
					href="https://www.instagram.com/sina.karachiani.music/ "
					target="_blank"
					class="text-gray-600 transition-colors hover:text-gray-900"
				>
					<Icon data={instagram} scale={1.5} />
				</a>
				<a
					href="https://soundcloud.com/sinakarachiani/ "
					target="_blank"
					class="text-gray-600 transition-colors hover:text-gray-900"
				>
					<Icon data={soundcloud} scale={2} />
				</a>
			</div>
		</div>
	</div>
	<!-- Down chevron button -->
	<a
		href="#welcome"
		aria-label="Scroll to Welcome section"
		class="group fixed bottom-0 left-1/2 z-40 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/80 shadow-lg transition-all duration-200 hover:bg-zinc-400 hover:shadow-xl"
		on:click={revealRestAndScroll}
	>
		<svg
			class="h-7 w-7 text-gray-700 transition-colors group-hover:text-white"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
		</svg>
	</a>
</section>

{#if showRest}
	<section
		id="welcome"
		bind:this={welcomeSection}
		class="flex min-h-screen flex-col items-center justify-center px-4 py-24 md:py-32"
		style="opacity: {welcomeOpacity}; transition: opacity 0.2s;"
	>
		<div class="mt-6 mb-2 max-w-2xl text-center text-lg text-gray-600 md:text-xl">
			<p>
				Hi, I'm Sina.
				<br />
				<span class="text-zinc-400">/ˈsiː.nə/</span>
			</p>

			<p class="mt-3">Welcome to my website!</p>

			<p class="mt-3">
				I am a composer, pianist, artist, and software engineer
				<br />
				based in San Francisco, CA.
			</p>
			<p class="mt-4">***</p>
			<p class="mt-3">
				Here, you can learn more about me and explore my art and music.
			</p>
		</div>

		<p class="mt-6 max-w-2xl text-center text-lg text-gray-600 md:text-xl">Explore:</p>
		<div class="mt-6 mb-8 flex w-full justify-center">
			<div class="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
				<a
					href="/music"
					class="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-100/50 px-3 py-3 text-center font-medium text-zinc-500 shadow-xl backdrop-blur transition-all duration-200 hover:bg-gray-200 hover:text-zinc-600"
				>
					Music Catalog
				</a>
				<a
					href="/media"
					class="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-100/50 px-3 py-3 text-center font-medium text-zinc-500 shadow-xl backdrop-blur transition-all duration-200 hover:bg-gray-200 hover:text-zinc-600"
				>
					Media &amp; Recordings
				</a>
				<a
					href="/art"
					class="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-100/50 px-3 py-3 text-center font-medium text-zinc-500 shadow-xl backdrop-blur transition-all duration-200 hover:bg-gray-200 hover:text-zinc-600"
				>
					Art
				</a>
			</div>
		</div>

    <p class="mt-12 mb-2 max-w-2xl text-center text-lg text-gray-600 md:text-xl">
      And if you'd like to shoot me a message or collaborate,
    <br />
    feel free to reach out!
  </p>
		<div class="mt-6 flex justify-center">
      
			<a
				href="/contact"
				class="inline-flex items-center rounded-3xl bg-gray-900 px-8 py-3 font-large text-white shadow-xl transition-all duration-200 hover:bg-gray-700 hover:shadow-xl"
			>
				Message Me!
			</a>
		</div>
	</section>

	<Footer />
{/if}

<style>
	.fade-in {
		opacity: 0;
		transform: translateY(24px);
		animation: fadeInUp 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}
	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: none;
		}
	}
	html {
		scroll-behavior: smooth;
	}
</style>
