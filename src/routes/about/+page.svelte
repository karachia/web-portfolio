<script lang="ts">
	// About page content
	import Footer from '$lib/components/Footer.svelte';
	import { slide, fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let shortBioExpanded = false;
	let veryShortBioExpanded = false;
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
				class="mb-8 text-center text-3xl font-bold text-gray-900"
				in:fade={{ duration: 900, delay: 600 }}
			>
				Biography
			</h2>
			<div class="text-justify text-lg text-gray-600" in:fade={{ duration: 800, delay: 800 }}>
				<p class="mb-4">
					<span class="font-bold text-black">Sina Karachiani (b. 1996, Esfahan, Iran)</span>
					is a San Francisco-based Iranian American composer and Software Engineer whose work explores
					the intimate and vulnerable concepts such as identity conflicts, self-discovery, personal struggles,
					and mental health. His music draws inspiration from both western and eastern musical idioms
					as his upbringing in Iran, immersed in Persian classical and folk music, has profoundly shaped
					his compositional style.  In his music, known for intricate flowing melodies and colorful orchestration,
					Sina experiments with form, concept and progression of time, and fusion of colors and textures,
					with the intention of telling stories that resonate with listeners on a personal level and
					explore the spectrum of human emotion. He seeks to foster a sense of connection with the listener
					and performer and create music that is both accessible and thought-provoking.
				</p>
				<p class="mb-4">
					Sina’s compositions have been premiered across the country and won numerous prizes. The
					highly acclaimed “Stranger of Kin for Orchestra”, inspired by his grandmother’s
					Alzheimer’s disease, was selected for Memphis Composers Institute, followed by a
					performance by Memphis Symphony Orchestra. Its version for mixed-quartet was performed and
					recorded by members of International Contemporary Ensemble (ICE). His orchestral piece,
					“Whirling Onward”, exploring self-discovery, was selected and performed by USC Thornton
					Symphony Orchestra under the baton of Dr. Crockett and won the 3rd place in The American
					Prize Orchestra category. His Double Bass sonata received the first prize in the statewide
					MACCC Composition Contest. His piece Cool & Good for Saxophone and Piano and chamber
					ensemble explores grief, hope, and self acceptance, and won the second place in The
					American Prize Competition for COVID-related works, and enjoyed numerous performances
					across Southern California.
				</p>
				<p class="mb-4">
					Born in Esfahan, Iran, Sina immigrated to California after high school. He began his
					formal music education in Piano Performance and Music Composition at Irvine Valley
					College. He continued his studies in Music Composition and Computer Science at the
					University of Southern California, where he studied with renowned composers such as Donald
					Crockett, Frank Ticheli, Andrew Norman, Sarah Gibson, and Morten Lauridsen. He also
					continued his piano studies with Dr. Pierce, Dr. Park, and Russel Ferrante. Sina graduated
					USC in 2020 with honors, receiving the prestigious Renaissance Scholar and Discovery
					awards for his studies in two vastly different fields of Music Composition and Computer
					Science. He currently works as a software engineer in Augmented and Virtual Reality at
					Apple, developing new immersive experiences. A dedicated cat lover and aviation
					enthusiast, Sina is also a talented cartoonist and sketch artist.
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
				<h3 class="text-xl font-bold text-zinc-700">Short Bio</h3>
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
							Sina Karachiani is a San Francisco-based Iranian American composer and Software
							Engineer whose work explores intimate and vulnerable concepts such as identity
							conflicts, self-discovery, personal struggles, and mental health. His music draws
							inspiration from both western and eastern musical idioms as his upbringing in Iran,
							immersed in Persian classical and folk music, has profoundly shaped his compositional
							style. In his music, known for intricate flowing melodies and colorful orchestration,
							Sina experiments with form, concept and progression of time, and fusion of colors and
							textures, with the intention of telling stories that resonate with listeners on a
							personal level and explore the spectrum of human emotion. He seeks to foster a sense
							of connection with the listener and performer and create music that is both accessible
							and thought-provoking.
						</p>
						<p>
							Sina's compositions have been premiered across the country and won numerous prizes,
							including the highly acclaimed "Stranger of Kin for Orchestra", inspired by his
							grandmother's Alzheimer's disease, which was selected for Memphis Composers Institute
							and performed by Memphis Symphony Orchestra. His orchestral piece "Whirling Onward"
							exploring self-discovery was performed by USC Thornton Symphony Orchestra and won 3rd
							place in The American Prize Orchestra category. Born in Esfahan, Iran, Sina immigrated
							to California after high school and began his formal music education at Irvine Valley
							College before continuing at the University of Southern California, where he studied
							with renowned composers such as Donald Crockett, Frank Ticheli, Andrew Norman, Sarah
							Gibson, and Morten Lauridsen. He graduated USC in 2020 with honors, receiving the
							prestigious Renaissance Scholar and Discovery awards for his studies in Music
							Composition and Computer Science. He currently works as a software engineer in
							Augmented and Virtual Reality at Apple, developing new immersive experiences. A
							dedicated cat lover and aviation enthusiast, Sina is also a talented cartoonist and
							sketch artist.
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
				<h3 class="text-xl font-bold text-zinc-700">Very Short Bio</h3>
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
					<p class="border-t border-zinc-200 pt-4 text-base text-zinc-700">
						Sina Karachiani is a San Francisco-based Iranian American composer and Software Engineer whose work explores intimate and vulnerable concepts such as identity conflicts, self-discovery, personal struggles, and mental health. His music draws inspiration from both western and eastern musical idioms as his upbringing in Iran, immersed in Persian classical and folk music, has profoundly shaped his compositional style. His compositions have been premiered across the country and won numerous prizes, including the highly acclaimed "Stranger of Kin for Orchestra", inspired by his grandmother's Alzheimer's disease, which was selected for Memphis Composers Institute and performed by Memphis Symphony Orchestra. Born in Esfahan, Iran, Sina immigrated to California after high school and studied Music Composition and Computer Science at the University of Southern California, graduating in 2020 with honors and receiving the prestigious Renaissance Scholar and Discovery awards. He currently works as a software engineer in Augmented and Virtual Reality at Apple, developing new immersive experiences, while continuing to compose music that seeks to foster connection with listeners and performers through intricate flowing melodies and colorful orchestration.
					</p>
				</div>
			{/if}
		</div>
	{/if}

	<Footer />
</div>
