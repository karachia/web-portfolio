<script lang="ts">
  export let recordings: Record<string, string> = {};
  export let title: string;

  // Service definitions
  const services = [
    {
      key: 'spotify',
      name: 'Spotify',
      image: '/assets/spotify.svg',
    },
    {
      key: 'appleMusic',
      name: 'Apple Music',
      image: '/assets/apple-music.svg',
    },
    {
      key: 'youtubeMusic',
      name: 'YouTube Music',
      image: '/assets/youtube-music.svg',
    },
    {
      key: 'amazonMusic',
      name: 'Amazon Music',
      image: '/assets/amazon-music.svg',
    },
    {
      key: 'soundcloud',
      name: 'SoundCloud',
      image: '/assets/soundcloud.svg',
    },
  ];
</script>

<div class="flex flex-col gap-3">

  <h2 class="text-xl font-bold text-center text-zinc-800 mb-1">{title}</h2>

  <div class="text-center text-zinc-500 text-base mb-3">Stream On:</div>
  {#each services as service}
    {#if recordings[service.key]}
      <a
        href={recordings[service.key]}
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-4 px-4 py-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 shadow transition"
      >
        <img src={service.image} alt={service.name} class="w-9 h-9 object-contain" />
        <span class="text-lg font-medium text-zinc-800">{service.name}</span>
      </a>
    {/if}
  {/each}
  {#if services.every(service => !recordings[service.key])}
    <div class="text-zinc-500 text-center py-4">No streaming links available.</div>
  {/if}
</div> 