<script lang="ts">
  import StreamingServiceLink from './StreamingServiceLink.svelte';
  
  export let item: any;

  // Helper function to check if a value is truthy and not an empty string
  function isValidString(value: any): boolean {
    return value && typeof value === 'string' && value.trim() !== '';
  }
</script>

<iframe 
  style="border-radius:12px" 
  src="{item.recordings.preview}&_source=generator&theme={item.recordings.theme || 0}" 
  width={item.recordings.previewWidth || "100%"} 
  height={item.recordings.previewHeight || 352} 
  frameBorder="0" 
  allowfullscreen="" 
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
  loading="lazy"
></iframe>

{#if item.recordings && (item.recordings.spotify || item.recordings.appleMusic || item.recordings.youtubeMusic || item.recordings.amazonMusic || item.recordings.soundcloud)}
  <div class="mt-4 mb-2 md:mb-6 text-center sm:text-left">
    <h4 class="text-sm font-semibold text-zinc-600 mb-2">Also available on:</h4>
    <div class="flex flex-wrap gap-5 md:gap-6 items-center justify-center sm:justify-start">
      {#if item.recordings.spotify}
        <StreamingServiceLink 
          serviceName="Spotify"
          url={item.recordings.spotify}
          iconPath="/assets/spotify.svg"
          iconSize="w-10 h-10"
        />
      {/if}
      {#if item.recordings.appleMusic}
        <StreamingServiceLink 
          serviceName="Apple Music"
          url={item.recordings.appleMusic}
          iconPath="/assets/apple-music.svg"
        />
      {/if}
      {#if item.recordings.youtubeMusic}
        <StreamingServiceLink 
          serviceName="YouTube Music"
          url={item.recordings.youtubeMusic}
          iconPath="/assets/youtube-music.svg"
        />
      {/if}
      {#if item.recordings.amazonMusic}
        <StreamingServiceLink 
          serviceName="Amazon Music"
          url={item.recordings.amazonMusic}
          iconPath="/assets/amazon-music.svg"
        />
      {/if}
      {#if item.recordings.soundcloud}
        <StreamingServiceLink 
          serviceName="SoundCloud"
          url={item.recordings.soundcloud}
          iconPath="/assets/soundcloud.svg"
        />
      {/if}
    </div>
  </div>
{/if} 