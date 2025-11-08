<script lang="ts">
	// About page content
	import Footer from '$lib/components/Footer.svelte';
	import { slide, fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let shortBioExpanded = false;
	let veryShortBioExpanded = false;
	let superShortBioExpanded = false;
	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Sina Karachiani - About</title>
	<meta
		name="description"
		content="Learn more about Sina Karachiani, composer, artist, and software engineer."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col bg-gray-50">
	<!-- Profile Images -->
	{#if mounted}
		<div
			class="relative z-[2] mt-16 mb-10 flex justify-center"
			in:fly={{ y: 50, duration: 1200, delay: 200 }}
			out:fade
		>
			<img
				src="/assets/about/about-1.png"
				alt="Sina Karachiani portrait"
				class="h-64 w-64 rounded-full border-4 border-white object-cover shadow-lg transition-transform duration-200 hover:scale-105"
			/>
		</div>
	{/if}

	<!-- Biography Section -->
	{#if mounted}
		<section
			class="relative z-[2] mx-auto mb-20 max-w-2xl flex-1 px-4"
			in:fly={{ y: 30, duration: 1000, delay: 500 }}
			out:fade
		>
			<h2
				class="mb-8 text-center text-2xl md:text-3xl font-bold text-gray-900"
				in:fade={{ duration: 900, delay: 600 }}
			>
				Biography
			</h2>
			<div class="text-justify text-base md:text-lg text-gray-600" in:fade={{ duration: 800, delay: 800 }}>
				<p class="mb-4">
					<span class="font-bold text-black">Sina Karachiani (b. 1996, Esfahan, Iran)</span>
					is a San Francisco-based Iranian-American composer, pianist, and artist. His artistic practice is rooted in storytelling, exploring the full spectrum of human emotion while embracing vulnerability. His compositions often investigate intimate concepts of identity, self-discovery, and mental health. Drawing inspiration from his upbringing in Esfahan, Iran, his music fuses Western classical traditions with Persian folk and traditional music, creating a rich cultural dialogue and a unique musical voice known for its intricate flowing melodies and colorful orchestration.
				</p>
				<p class="mb-4">
					Sina's compositions have been performed across the United States by leading ensembles. His orchestral work <span class="font-bold text-black">"Stranger of Kin,"</span> inspired by his grandmother's Alzheimer's, was selected for the 2025 Memphis Composers Institute and premiered by the <span class="font-bold text-black">Memphis Symphony Orchestra</span>. 
					A chamber version was performed and recorded by members of the <span class="font-bold text-black">International Contemporary Ensemble (ICE)</span>. His <span class="font-bold text-black">"Orison for String Quartet"</span> was commissioned and premiered by the <span class="font-bold text-black">Bergamot Quartet</span> in 2025. He has also received multiple honors from The American Prize, including 2nd place in the COVID-Related Compositions category for <span class="font-bold text-black">"Cool & Good"</span> and 3rd place in the Orchestra Category for <span class="font-bold text-black">"Whirling, Onward..."</span> , which was also premiered by the USC Thornton Symphony. This piece, exploring self-discovery, was also produced as a dance film in collaboration with choreographer Aurora Vaughan and filmmaker Cameron Kostopoulos.
				</p>
				<p class="mb-4">
					Sina immigrated to California from Iran after high school and began his formal music education at Irvine Valley College. He graduated summa cum laude from the <span class="font-bold text-black">University of Southern California (USC)</span> with dual degrees in <span class="font-bold text-black">Music Composition (B.M.)</span> and <span class="font-bold text-black">Computer Science (B.S.).</span> 
					At USC, he was named a prestigious <span class="font-bold text-black">Renaissance Scholar</span> for his studies in the "vastly different fields" of music and computer science and a <span class="font-bold text-black">Discovery Scholar</span> for a collection of pieces themed on mental health and personal growth. His principal teachers include Andrew Norman, Donald Crockett, Frank Ticheli, and Morten Lauridsen.
				</p>
				<p class="mb-4">
					Outside of his artistic practice, Sina works as a UI/UX Software Engineer at Apple, designing new immersive experiences for AR/VR platforms, including <span class="font-bold text-black">Apple Vision Pro</span>. He is also a talented cartoonist, sketch artist, and aviation enthusiast.
				</p>
			</div>
		</section>
	{/if}

	<!-- Short Bio Collapsible Card -->
	{#if mounted}
		<div
			class="mx-auto mb-10 w-full max-w-2xl px-4"
			in:fly={{ y: 30, duration: 800, delay: 1000 }}
			out:fade
		>
			<button
				type="button"
				class="relative z-10 flex w-full cursor-pointer items-center justify-between border border-white/30 bg-white/60 p-4 backdrop-blur-lg transition-all duration-300 focus:outline-none {shortBioExpanded
					? 'rounded-t-2xl'
					: 'rounded-2xl'} {shortBioExpanded ? '' : 'shadow-lg hover:shadow-xl'}"
				on:click={() => (shortBioExpanded = !shortBioExpanded)}
				aria-expanded={shortBioExpanded}
				aria-controls="short-bio-panel"
			>
				<h3 class="text-xl font-bold text-zinc-700">Bio (200 Words)</h3>
				<svg
					class="h-6 w-6 text-zinc-600 transition-transform duration-300"
					style="transform: rotate({shortBioExpanded ? 180 : 0}deg);"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{#if shortBioExpanded}
				<div
					id="short-bio-panel"
					class="relative z-0 -mt-1 rounded-b-2xl border-x border-t-0 border-b border-white/30 bg-white px-6 py-4 shadow-inner"
					transition:slide
				>
					<div class="border-t border-zinc-200 pt-4 text-base text-zinc-700">
						<p class="mb-4">
							<span class="font-bold text-black">Sina Karachiani (b. 1996, Esfahan, Iran)</span> is a San Francisco-based Iranian-American composer, pianist, and artist. 
							His artistic practice is rooted in storytelling, exploring intimate concepts of identity, self-discovery, and mental health. 
							Drawing from his upbringing in Esfahan, Iran, his music fuses Western classical traditions with Persian folk music, creating 
							a unique musical voice known for its intricate flowing melodies and colorful orchestration.

						</p>
						<p class="mb-4">
							Sina's compositions have been performed by leading ensembles. 
							His orchestral work "Stranger of Kin" was premiered by the Memphis Symphony Orchestra, and a chamber version was recorded by members of the International Contemporary Ensemble (ICE). 
							He has received multiple honors from The American Prize, including for "Whirling, Onward...," which was also produced as a dance film.
						</p>
						<p>
							Sina graduated summa cum laude from the University of Southern California with dual degrees in Music Composition and Computer Science. 
							At USC, he was named a prestigious Renaissance Scholar for his interdisciplinary studies and a Discovery Scholar. 
							Outside of his artistic practice, Sina works as a UI/UX Software Engineer at Apple, designing new immersive experiences for AR/VR platforms, 
							including Apple Vision Pro. He is also a talented sketch artist.
						</p>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Very Short Bio Collapsible Card -->
	{#if mounted}
		<div
			class="mx-auto mb-10 w-full max-w-2xl px-4"
			in:fly={{ y: 30, duration: 800, delay: 1200 }}
			out:fade
		>
			<button
				type="button"
				class="relative z-10 flex w-full cursor-pointer items-center justify-between border border-white/30 bg-white/60 p-4 backdrop-blur-lg transition-all duration-300 focus:outline-none {veryShortBioExpanded
					? 'rounded-t-2xl'
					: 'rounded-2xl'} {veryShortBioExpanded ? '' : 'shadow-lg hover:shadow-xl'}"
				on:click={() => (veryShortBioExpanded = !veryShortBioExpanded)}
				aria-expanded={veryShortBioExpanded}
				aria-controls="short-bio-panel"
			>
				<h3 class="text-xl font-bold text-zinc-700">Bio (150 Words)</h3>
				<svg
					class="h-6 w-6 text-zinc-600 transition-transform duration-300"
					style="transform: rotate({veryShortBioExpanded ? 180 : 0}deg);"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{#if veryShortBioExpanded}
				<div
					id="short-bio-panel"
					class="-mt-1 rounded-b-2xl border-x border-t-0 border-b border-white/30 bg-white px-6 py-4 shadow-inner"
					transition:slide
				>
					
					<div class="border-t border-zinc-200 pt-4 text-base text-zinc-700">
						<p class="mb-4">
							<span class="font-bold text-black">Sina Karachiani (b. 1996, Esfahan, Iran)</span> is a San Francisco-based Iranian-American composer whose music fuses Western classical and Persian folk traditions. 
							His work explores identity and vulnerability, resulting in a unique voice known for "intricate flowing melodies and colorful orchestration."
						</p>
						<p class="mb-4">
							His compositions have been performed by ensembles like the Memphis Symphony Orchestra and members of the International Contemporary Ensemble (ICE).
							He has also received multiple honors from The American Prize, and his orchestral piece "Whirling, Onward..." was produced as a dance film.
						</p>
						<p>
							Sina graduated summa cum laude from USC with dual degrees in Music Composition and Computer Science, where he was named a Renaissance Scholar. 
							He now works as a UI/UX Software Engineer at Apple, designing immersive AR/VR experiences, while also pursuing his artistic practice as a composer and artist.
						</p>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<!--Super Short Bio Collapsible Card -->
	{#if mounted}
		<div
			class="mx-auto mb-10 w-full max-w-2xl px-4"
			in:fly={{ y: 30, duration: 800, delay: 1200 }}
			out:fade
		>
			<button
				type="button"
				class="relative z-10 flex w-full cursor-pointer items-center justify-between border border-white/30 bg-white/60 p-4 backdrop-blur-lg transition-all duration-300 focus:outline-none {veryShortBioExpanded
					? 'rounded-t-2xl'
					: 'rounded-2xl'} {superShortBioExpanded ? '' : 'shadow-lg hover:shadow-xl'}"
				on:click={() => (superShortBioExpanded = !superShortBioExpanded)}
				aria-expanded={superShortBioExpanded}
				aria-controls="short-bio-panel"
			>
				<h3 class="text-xl font-bold text-zinc-700">Bio (100 Words)</h3>
				<svg
					class="h-6 w-6 text-zinc-600 transition-transform duration-300"
					style="transform: rotate({superShortBioExpanded ? 180 : 0}deg);"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{#if superShortBioExpanded}
				<div
					id="short-bio-panel"
					class="-mt-1 rounded-b-2xl border-x border-t-0 border-b border-white/30 bg-white px-6 py-4 shadow-inner"
					transition:slide
				>
					<p class="border-t border-zinc-200 pt-4 text-base text-zinc-700">
						<span class="font-bold text-black">Sina Karachiani (b. 1996, Esfahan, Iran)</span> is a San Francisco-based Iranian-American composer, artist, and software engineer. His music fuses Western classical and Persian folk traditions, exploring themes of identity and vulnerability through "intricate flowing melodies and colorful orchestration.” His compositions have been performed by the Memphis Symphony Orchestra and members of the International Contemporary Ensemble (ICE) and have won multiple honors from The American Prize. A summa cum laude USC graduate with dual degrees in Music Composition and Computer Science, he was named a Renaissance Scholar and now works at Apple designing AR/VR experiences.
					</p>
				</div>
			{/if}
		</div>
	{/if}

	<Footer />
</div>
