<script lang="ts">
  import { formatDuration, formatDate } from '$lib/utils/formatters';
  import SoundCloudEmbed from './SoundCloudEmbed.svelte';
  import StreamingEmbed from './StreamingEmbed.svelte';
  import YouTubeEmbed from './YouTubeEmbed.svelte';
  import CollapsibleText from './CollapsibleText.svelte';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  
  export let item: any;
  export let isClosing: boolean = false;
  
  let isVisible = false;
  const dispatch = createEventDispatcher<{
    close: void;
  }>();

  onMount(() => {
    // Trigger entrance animation
    setTimeout(() => {
      isVisible = true;
    }, 10);
  });

  const close = () => {
    dispatch('close');
  };

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      close();
    }
  }

  // Helper function to check if a value is truthy and not an empty string
  function isValidString(value: any): boolean {
    return value && typeof value === 'string' && value.trim() !== '';
  }

  // Helper function to check if an array has valid items
  function hasValidItems(array: any[]): boolean {
    return array && Array.isArray(array) && array.some(item => isValidString(item));
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300 ease-out {isVisible ? 'opacity-100 backdrop-blur-sm' : 'opacity-0 backdrop-blur-none'}"
  on:click={close}
  on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && close()}
  role="button"
  tabindex="0"
  aria-label="Close modal backdrop"
>
  <div
    class="bg-white text-zinc-800 rounded-4xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col p-8 border border-zinc-200 transition-transform duration-300 ease-out {(isVisible && !isClosing) ? 'translate-y-0' : '-translate-y-[100vh]'}"
    on:click|stopPropagation
  >
    <div class="flex-shrink-0 flex justify-between items-start mb-4">
      <div>
        <h2 class="text-3xl font-bold text-zinc-800">{item.title}</h2>
        <p class="text-xl font-light italic text-zinc-600 mt-0">for {item.for}</p>
        {#if isValidString(item.dedication)}
          <p class="text-sm italic text-zinc-500">{item.dedication}</p>
        {/if}
        <p class="text-md text-zinc-600 mt-2">{formatDuration(item.length)} &nbsp;//&nbsp; {formatDate(item.date)}</p>
        {#if isValidString(item.detailed_instrumentation)}
          <div>
            <div class="text-md text-bold text-zinc-800 mt-2">
              Instrumentation:
            </div>
            <div class="text-sm text-zinc-600">
              {item.detailed_instrumentation}
            </div>
          </div>
        {/if}
      </div>

      <!-- Close button -->
      <button
        class="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200 -mt-4 -mr-4"
        on:click={close}
        aria-label="Close modal"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Description -->
    <div class="flex-grow overflow-y-auto pr-4 -mr-4">
      {#if isValidString(item.description)}
        <div class="mb-6 mt-8">
          <h3 class="text-xl font-bold text-zinc-700 mb-2">Description</h3>
          <CollapsibleText text={item.description} maxLength={530} />
        </div>
      {/if}

      <!-- Listen Section -->
      {#if (item.recordings && item.recordings.preview) || (item.soundcloud && item.soundcloud.url)}
        <div class="mb-6 mt-8">
          <h3 class="text-xl font-bold text-zinc-700 mb-4">Listen</h3>
          
          {#if item.recordings && item.recordings.preview}
            <!-- Streaming Preview -->
            <StreamingEmbed {item}/>
          {:else if item.soundcloud && item.soundcloud.url}
            <!-- SoundCloud -->
            <SoundCloudEmbed 
              trackUrl={item.soundcloud.url}
              width={item.soundcloud.width || "70%"}
              height={item.soundcloud.height || 166}
              trackTitle={item.soundcloud.title || item.title}
            />
          {/if}
        </div>
      {/if}

      <!-- Video Section -->
      {#if item.videos && item.videos.length > 0}
        <div class="mb-6 mt-8">
          <h3 class="text-xl font-bold text-zinc-700 mb-4">Video</h3>
          {#each item.videos as video, index}
            <YouTubeEmbed videoUrl={video} />
          {/each}
        </div>
      {/if}
      
      <!-- Details -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div>
          <h4 class="font-semibold text-zinc-600 mb-2">Details</h4>
          <p><strong>Category:</strong> {item.category} ({item.subcategory})</p>
          {#if isValidString(item.detailed_instrumentation)}
            <p class="mt-2"><strong>Instrumentation:</strong> {item.detailed_instrumentation}</p>
          {/if}
        </div>
        {#if isValidString(item.soundcloud) || hasValidItems(item.videos) || hasValidItems(item.recordings)}
          <div>
            <h4 class="font-semibold text-zinc-600 mb-2">Links</h4>
            {#if isValidString(item.soundcloud)}<a href={item.soundcloud} class="text-orange-600 block hover:underline">Listen on SoundCloud</a>{/if}
            {#if hasValidItems(item.videos)}{#each item.videos as video}{#if isValidString(video)}<a href={video} class="text-red-600 block hover:underline">Watch Video</a>{/if}{/each}{/if}
            {#if hasValidItems(item.recordings)}{#each item.recordings as recording}{#if isValidString(recording)}<a href={recording} class="text-blue-600 block hover:underline">Listen to Recording</a>{/if}{/each}{/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div> 