<script lang="ts">
  import { onMount } from 'svelte';
  import ExploreLink from '$lib/components/ExploreLink.svelte';
  import MusicStreamingLinks from '$lib/components/MusicStreamingLinks.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import github from 'svelte-awesome/icons/github';
  import youtube from 'svelte-awesome/icons/youtube';
  import instagram from 'svelte-awesome/icons/instagram';
  import soundcloud from 'svelte-awesome/icons/soundcloud';
  import linkedin from 'svelte-awesome/icons/linkedin';
  import facebook from 'svelte-awesome/icons/facebook';
  import music from 'svelte-awesome/icons/music';
  import playCircleO from 'svelte-awesome/icons/playCircleO';
  import Icon from 'svelte-awesome';

  let musicData: any[] = [];
  let whirlingOnward: any = null;
  let carolyn: any = null;
  let orison: any = null;

  onMount(async () => {
    const res = await fetch('/data/music.json');
    musicData = await res.json();
    whirlingOnward = musicData.find(
      (item) => item.id === 'whirlingOnward'
    );

    carolyn = musicData.find(
      (item) => item.id === 'carolyn' || item.title?.toLowerCase().includes('carolyn')
    );

    orison = musicData.find(
      (item) => item.id === 'orisonForStringQuartet' || item.title?.toLowerCase().includes('orison')
    );
  });

  // Example modal content
  const whirlingOnwardRecordings = {
    preview: "https://open.spotify.com/embed/album/5kzwUV5Y6SU1jthWJ2Pdkq?utm",
    previewWidth: "100%",
    previewHeight: 380,
    theme: 0,
    appleMusic: "https://music.apple.com/us/album/whirling-onward-single/1565630022",
    spotify: "https://open.spotify.com/album/5kzwUV5Y6SU1jthWJ2Pdkq?si=piS_UfE0QaC0enFA6Qt_GA",
    youtubeMusic: "https://youtube.com/playlist?list=OLAK5uy_kWq544bu_-l0TjLE3dDSs7m3tu8KfwMcg&si=87Za6iQwDYq-W73L",
    amazonMusic: "https://amazon.com/music/player/albums/B093ZLG8ZD?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_5FVmKNH5FaSQOFCOoIbNulZNl",
    soundcloud: "https://soundcloud.com/sinakarachiani/sets/whirling-onward?si=f6c2383b255942a7ae2eecd613bd8740&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
  };
</script>

<svelte:head>
  <title>Explore - Sina Karachiani</title>
  <meta name="description" content="Explore and connect with Sina Karachiani on social media and more." />
</svelte:head>

<div class="min-h-screen flex flex-col">
  <!-- Main Content -->
  <div class="flex-1">
    <!-- Hero Section -->
    <div class="flex flex-col items-center justify-center mt-8 mb-10">
      <img
        src="/assets/SK_Brand.png"
        alt="Sina Karachiani Logo"
        class="w-15 h-auto rounded-full drop-shadow mb-3"
      />
      <h1 class="text-2xl font-bold text-gray-900 tracking-tight mb-1" style="font-family: 'Zen Kurenaido', spagans-serif;">
        S I N A &nbsp; &nbsp; K A R A C H I A N I
      </h1>
      <h2 class="text-base font-light text-gray-600 mb-3 text-center">
        Composer • Artist • Pianist • Software Engineer
      </h2>
      <div class="flex space-x-5 mb-0">
        <a href="https://www.youtube.com/@SinaKarachianiMusic/" target="_blank" class="text-gray-500 hover:text-gray-900 transition-colors">
          <Icon data={youtube} scale={1.3} />
        </a>
        <a href="https://instagram.com/sina.karachiani.music" target="_blank" class="text-gray-500 hover:text-gray-900 transition-colors">
          <Icon data={instagram} scale={1.3} />
        </a>
        <a href="https://github.com/karachia" target="_blank" class="text-gray-500 hover:text-gray-900 transition-colors">
          <Icon data={github} scale={1.3} />
        </a>
        <a href="https://www.linkedin.com/in/sina-karachiani-5b9b8593/" target="_blank" class="text-gray-500 hover:text-gray-900 transition-colors">
          <Icon data={linkedin} scale={1.3} />
        </a>
        <a href="https://www.facebook.com/sina.karachiani/" target="_blank" class="text-gray-500 hover:text-gray-900 transition-colors">
          <Icon data={facebook} scale={1.3} />
        </a>
        <a href="https://soundcloud.com/sinakarachiani" target="_blank" class="text-gray-500 hover:text-gray-900 transition-colors">
          <Icon data={soundcloud} scale={1.5} />
        </a>
      </div>
    </div>

    <div class="w-full max-w-lg space-y-4 relative z-[2] mt-0 mx-auto px-4 mb-36">
      <ExploreLink
        title='Dance Film for "Whirling Onward..."'
        href="https://youtu.be/zbDhZ-TRa4A?si=Sn_GGlWxl2Mrsm91"
        image="/assets/music/whirlingdancefilm.png"
      />
      <ExploreLink
        title='Stream "Whirling, Onward..." for Orchestra'
        modalContent={MusicStreamingLinks}
        modalProps={whirlingOnward ? { recordings: whirlingOnward.recordings, title: whirlingOnward.title } : { recordings: {}, title: 'Whirling, Onward...' }}
        icon={music}
        image="/assets/music/whirlingonward.png"
      />
      <ExploreLink
        title='Score Video for "Orison" for String Quartet'
        href="https://www.youtube.com/watch?v=OSNETvVimig"
        image="/assets/music/orison_small.png"
      />
      <ExploreLink
        title='Stream "Carolyn" for Piano Solo'
        modalContent={MusicStreamingLinks}
        modalProps={carolyn ? { recordings: carolyn.recordings, title: carolyn.title } : { recordings: {}, title: 'Carolyn' }}
        icon={music}
        image="/assets/music/carolyn.png"
      />

      <ExploreLink
      title="Website (SinaKarachiani.com)"
      href="/"
      image="/assets/web_icon_sq.png"
    />
      <ExploreLink
        title="Contact Me!"
        href="/contact"
      />
    </div>
  </div>

  <!-- Footer -->
  <Footer />
</div> 