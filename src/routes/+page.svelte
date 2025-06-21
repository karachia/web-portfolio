<script>
  import { onMount } from 'svelte';
  import MusicItem from '$lib/components/MusicItem.svelte';
  import MusicDetailModal from '$lib/components/MusicDetailModal.svelte';
  import Icon from 'svelte-awesome';

  /// *** Embedded Icons ***
  // Recommended - import just the icon you need
  import github from 'svelte-awesome/icons/github';
  import linkedin from 'svelte-awesome/icons/linkedin';
  import instagram from 'svelte-awesome/icons/instagram';
  import soundcloud from 'svelte-awesome/icons/soundcloud';

  let music = [];
  let selectedMusicItem = null;

  onMount(async () => {
    const response = await fetch('/data/music.json');
    music = await response.json();
  });

  function showDetails(event) {
    selectedMusicItem = event.detail;
  }

  function closeModal() {
    selectedMusicItem = null;
  }
</script>

<section id="home" class="min-h-[70vh] flex flex-col justify-center items-center px-4 pt-16 fade-in">
  <div class="flex items-center justify-center space-x-4">
    <img src="/assets/SK_Brand.png" alt="Sina Karachiani Logo" class="h-44 w-auto rounded drop-shadow-lg -mt-6" />
    <div class="flex flex-col">
      <h1 style="font-family: 'Zen Kurenaido', sans-serif;" class="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 font-serif drop-shadow-lg">
        S I N A&nbsp;&nbsp;&nbsp;K A R A C H I A N I
      </h1>
      <h2 class="text-lg md:text-2xl text-gray-600 font-light tracking-wide mt-2 drop-shadow-lg">
        Composer, Artist, Pianist, Software Engineer 
      </h2>
      <div class="flex space-x-6 mt-4">
        <a href="https://github.com/karachia" target="_blank" class="text-gray-600 hover:text-gray-900 transition-colors">
          <Icon data={github} scale="1.5"/>
        </a>
        <a href="https://www.linkedin.com/in/sina-karachiani-5b9b8593/" target="_blank" class="text-gray-600 hover:text-gray-900 transition-colors">
          <Icon data={linkedin} scale="1.5"/>
        </a>
        <a href="https://www.instagram.com/sina.karachiani.music/ " target="_blank" class="text-gray-600 hover:text-gray-900 transition-colors">
          <Icon data={instagram} scale="1.5"/>
        </a>
        <a href="https://soundcloud.com/sinakarachiani/ " target="_blank" class="text-gray-600 hover:text-gray-900 transition-colors">
          <Icon data={soundcloud} scale="2"/>
        </a>
      </div>
    </div>
  </div>
</section>

<section id="about" class="min-h-screen flex flex-col justify-center items-center px-4 py-24 md:py-32 fade-in">
  <h2 class="text-3xl md:text-5xl font-bold mb-4 text-gray-900">About</h2>
  <p class="max-w-2xl text-lg md:text-xl text-gray-600 text-center mb-2">
    Hi, I'm Sina. Welcome to my minimal, elegant portfolio. I create music, art, and digital experiences.<br />Scroll down to explore more.
  </p>
</section>

<section id="music" class="min-h-screen flex flex-col items-center px-4 py-24 md:py-32 fade-in">
  <h2 class="text-3xl md:text-5xl font-bold mb-8 text-gray-900">Music</h2>
  <div class="w-full flex flex-col items-center space-y-8">
    {#each music as item}
      <MusicItem {item} on:viewDetails={showDetails} />
    {/each}
  </div>
</section>

{#if selectedMusicItem}
  <MusicDetailModal item={selectedMusicItem} on:close={closeModal} />
{/if}

<section id="art" class="min-h-screen flex flex-col justify-center items-center px-4 py-24 md:py-32 fade-in">
  <h2 class="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Art</h2>
  <p class="max-w-2xl text-lg md:text-xl text-gray-600 text-center mb-2">
    I love creating visual art that inspires and delights. (Gallery coming soon)
  </p>
</section>

<section id="contact" class="min-h-screen flex flex-col justify-center items-center px-4 py-24 md:py-32 fade-in">
  <h2 class="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Contact</h2>
  <p class="max-w-2xl text-lg md:text-xl text-gray-600 text-center mb-6">
    Want to connect? Reach out via email or social media. (Contact form coming soon)
  </p>
  <a href="mailto:youremail@example.com" class="inline-block px-6 py-2 bg-gray-900 text-white rounded shadow hover:bg-gray-700 transition-colors duration-200">Email Me</a>
</section>

<style>
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    animation: fadeInUp 1s cubic-bezier(0.4,0,0.2,1) forwards;
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
