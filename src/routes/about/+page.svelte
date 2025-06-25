<script lang="ts">
  // About page content
  import Footer from '$lib/components/Footer.svelte';
  import { slide } from 'svelte/transition';
  import CollapsibleText from '$lib/components/CollapsibleText.svelte';
  let shortBioExpanded = false;
  let veryShortBioExpanded = false;

</script>

<svelte:head>
  <title>About - Sina Karachiani</title>
  <meta name="description" content="Learn more about Sina Karachiani, composer, artist, and software engineer." />
</svelte:head>

<div class="min-h-screen flex flex-col bg-gray-50">
  <!-- Profile Images -->
  <div class="flex justify-center mt-16 mb-10">
    <img src="/assets/about/about-1.png" alt="Sina Karachiani portrait" class="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-white transition-transform duration-200 hover:scale-105" />
  </div>
  <!-- Biography Section -->
  <section class="max-w-2xl mx-auto mb-20 px-4 flex-1">
    <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Biography</h2>
    <div class="text-lg text-gray-600 text-justify">
      <p class="mb-4"><span class="font-bold text-black">Sina Karachiani (b. 1996, Esfahan, Iran)</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.</p>
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.</p>
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.</p>
    </div>
  </section>

  <!-- Short Bio Collapsible Card -->
  <div class="max-w-2xl mx-auto w-full px-4 mb-10">
    <button type="button"
      class="w-full flex items-center justify-between p-4 bg-white/60 backdrop-blur-lg border border-white/30 transition-all duration-300 cursor-pointer focus:outline-none relative z-10 {shortBioExpanded ? 'rounded-t-2xl' : 'rounded-2xl'} {shortBioExpanded ? '' : 'shadow-lg hover:shadow-xl'}"
      on:click={() => shortBioExpanded = !shortBioExpanded}
      aria-expanded={shortBioExpanded}
      aria-controls="short-bio-panel"
    >
      <h3 class="text-xl font-bold text-zinc-700">Short Bio</h3>
      <svg
        class="w-6 h-6 text-zinc-600 transition-transform duration-300" style="transform: rotate({shortBioExpanded ? 180 : 0}deg);"
        viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    {#if shortBioExpanded}
      <div id="short-bio-panel" class="bg-white rounded-b-2xl border-x border-b border-white/30 border-t-0 shadow-inner px-6 py-4 -mt-1 relative z-0" transition:slide>
        <p class="text-zinc-700 text-base border-t border-zinc-200 pt-4">Sina Karachiani is a composer and artist whose work explores the intersection of contemporary music, technology, and visual art. His compositions have been performed internationally and reflect a unique blend of cultural influences and innovative soundscapes.</p>
      </div>
    {/if}
  </div>

  <!-- Very Short Bio Collapsible Card -->
  <div class="max-w-2xl mx-auto w-full px-4 mb-10">
    <button type="button"
      class="w-full flex items-center justify-between p-4 bg-white/60 backdrop-blur-lg border border-white/30 transition-all duration-300 cursor-pointer focus:outline-none relative z-10 {veryShortBioExpanded ? 'rounded-t-2xl' : 'rounded-2xl'} {veryShortBioExpanded ? '' : 'shadow-lg hover:shadow-xl'}"
      on:click={() => veryShortBioExpanded = !veryShortBioExpanded}
      aria-expanded={veryShortBioExpanded}
      aria-controls="short-bio-panel"
    >
      <h3 class="text-xl font-bold text-zinc-700">Very Short Bio</h3>
      <svg
        class="w-6 h-6 text-zinc-600 transition-transform duration-300" style="transform: rotate({veryShortBioExpanded ? 180 : 0}deg);"
        viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    {#if veryShortBioExpanded}
      <div id="short-bio-panel" class="bg-white rounded-b-2xl border-x border-b border-white/30 border-t-0 shadow-inner px-6 py-4 -mt-1" transition:slide>
        <p class="text-zinc-700 text-base border-t border-zinc-200 pt-4">Sina Karachiani is a composer and artist whose work explores the intersection of contemporary music, technology, and visual art.</p>
      </div>
    {/if}
  </div>

  <Footer />
</div> 