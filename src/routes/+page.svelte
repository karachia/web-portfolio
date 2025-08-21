<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Footer from '$lib/components/Footer.svelte';
	import HorizontalScrollSection from '$lib/components/HorizontalScrollSection.svelte';
	import Icon from 'svelte-awesome';

	/// *** Embedded Icons ***
	import github from 'svelte-awesome/icons/github';
	import linkedin from 'svelte-awesome/icons/linkedin';
	import instagram from 'svelte-awesome/icons/instagram';
	import soundcloud from 'svelte-awesome/icons/soundcloud';

	let showRest = false;
	let welcomeSection: HTMLElement | null = null;

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

	onMount(() => {
		const onScroll = () => {
			if (!showRest && window.scrollY > 10) {
				showRest = true;
				window.removeEventListener('scroll', onScroll);
			}
		};
		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
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
	<!-- Hero Content Container -->
	<div class="w-full max-w-6xl mx-auto">
		<div class="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
			<img
				src="/assets/SK_Brand.png"
				alt="Sina Karachiani Logo"
				class="-mt-6 h-44 w-auto rounded drop-shadow-lg"
			/>
			<div class="flex flex-col items-center text-center sm:items-start sm:text-left">
				<h1
					style="font-family: 'Zen Kurenaido', spagans-serif;"
					class="font-serif text-2xl font-extrabold tracking-tight text-gray-900 drop-shadow-lg sm:text-4xl md:text-6xl"
				>
					S I N A&nbsp;&nbsp;&nbsp;K A R A C H I A N I
				</h1>
				<h2 class="mt-2 text-base font-light tracking-wide text-gray-600 drop-shadow-lg sm:text-lg md:text-2xl">
					<!-- Composer, Artist, Pianist, Software Engineer -->
	        Composer • Artist • Pianist • Software Engineer
				</h2>
				<div class="mt-4 flex space-x-4 sm:space-x-6">
					<a
						href="https://github.com/karachia"
						target="_blank"
						class="text-gray-600 transition-colors hover:text-gray-900"
					>
						<Icon data={github} scale={1.2} class="sm:scale-150" />
					</a>
					<a
						href="https://www.linkedin.com/in/sina-karachiani-5b9b8593/"
						target="_blank"
						class="text-gray-600 transition-colors hover:text-gray-900"
					>
						<Icon data={linkedin} scale={1.2} class="sm:scale-150" />
					</a>
					<a
						href="https://www.instagram.com/sina.karachiani.music/"
						target="_blank"
						class="text-gray-600 transition-colors hover:text-gray-900"
					>
						<Icon data={instagram} scale={1.2} class="sm:scale-150" />
					</a>
					<a
						href="https://soundcloud.com/sinakarachiani/"
						target="_blank"
						class="text-gray-600 transition-colors hover:text-gray-900 md:ml-2"
					>
						<Icon data={soundcloud} scale={1.5} class="sm:scale-200" />
					</a>
				</div>
			</div>
		</div>

		<!-- Latest Releases Section - Aligned with hero content -->
		<div class="mt-16 w-full">
			<HorizontalScrollSection 
				title="Latest Releases & News"
				dataSource="/data/featured_items.json"
				showSpacerAlignment={true}
			/>
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
		class="flex min-h-screen flex-col items-center justify-center px-4 py-24 md:py-32 relative z-10 mt-50"
	>
		<div transition:fade={{ duration: 2100 }}>
			<div class="mt-6 mb-2 max-w-2xl text-center text-base text-gray-600 md:text-lg">
				<p>
					Welcome! I'm Sina :)
					<br />
					<span class="text-zinc-400">/ˈsiː.nə/</span>
				</p>

				<!-- <p class="mt-3">Welcome to my corner of the internet!</p> -->

				<p class="mt-3">
					I am a composer, pianist, artist, and software engineer
					<br />
					based in <span class="font-bold">San Francisco, CA</span>.
				<!-- </p>

				<p class="mt-3"> -->
					By day, I design and develop software for Vision products at Apple that enable groundbreaking new possibilities. By night, you'll often find me composing at the piano, or drawing.
				</p>
				<p class="mt-3">
					I love <span class="font-bold">collaborating with people to bring fresh ideas to life</span>  across music, art, software, and where they intersect. <span class="font-bold">Storytelling is at the heart of everything I do</span>, whether it's through a new musical piece or a visual design.
					<!-- I am also a big aviation enthusiast and enjoying reading and learing about technology, urbanism, and public transit. -->
				</p> 
				<p class="mt-3">You can follow my ongoing creative journey and projects on this website, which I have  <span class="font-bold">personally coded</span>.
				</p>
				<!-- <p class="mt-3">
					Here, you can learn more about me and explore my art and music.
				</p> -->
			</div>
      
			<p class="mt-6 max-w-2xl text-center text-lg text-gray-600 md:text-xl">Explore my work:</p>
			<div class="mt-6 mb-8 flex w-full justify-center relative z-10">
				<div class="grid w-full max-w-sm sm:max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
					<a
						href="/music"
						class="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-3 text-center font-medium text-zinc-500 shadow-xl backdrop-blur transition-all duration-200 hover:bg-violet-100 hover:text-purple-500 hover:scale-110"
					>
						Music Catalog
					</a>
					<a
						href="/media"
						class="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-3 text-center font-medium text-zinc-500 shadow-xl backdrop-blur transition-all duration-200 hover:bg-violet-100 hover:text-purple-500 hover:scale-110"
					>
						Media &amp; Recordings
					</a>
					<a
						href="/art"
						class="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-3 text-center font-medium text-zinc-500 shadow-xl backdrop-blur transition-all duration-200 hover:bg-violet-100 hover:text-purple-500 hover:scale-110"
					>
						Art
					</a>
				</div>
			</div>
    <!-- <p class="mt-10 text-center text-lg text-gray-600 md:text-xl">***</p> -->
    <p class="mt-10 mb-2 max-w-2xl text-center text-base text-gray-600 md:text-lg">
      Whether you're interested in a potential collaboration, or just want to say hello, I'd love to hear from you!
  </p>
			<div class="mt-6 flex justify-center">
      
				<a
					href="/contact"
					class="inline-flex items-center rounded-3xl bg-gray-900 px-8 py-3 font-large text-white shadow-xl transition-all duration-200 hover:bg-gray-700 hover:shadow-xl hover:scale-110"
				>
					Contact Me!
				</a>
			</div>
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
