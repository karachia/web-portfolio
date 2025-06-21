<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let item: any;
  const dispatch = createEventDispatcher();

  const close = () => dispatch('close');

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      close();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
  on:click={close}
  on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && close()}
  role="button"
  tabindex="0"
>
  <div
    class="bg-white text-zinc-800 rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col p-8 border border-zinc-200"
    on:click|stopPropagation
  >
    <div class="flex-shrink-0 flex justify-between items-start mb-4">
      <div>
        <h2 class="text-3xl font-bold text-zinc-900">{item.title}</h2>
        <p class="text-xl font-light text-zinc-600">{item.for}</p>
        {#if item.dedication}
          <p class="text-sm italic text-zinc-500 mt-1">For {item.dedication}</p>
        {/if}
      </div>
      <button
        class="text-zinc-500 hover:text-zinc-900 transition-colors text-3xl leading-none"
        on:click={close}
        aria-label="Close modal"
      >&times;</button>
    </div>

    <div class="flex-grow overflow-y-auto pr-4 -mr-4">
      {#if item.description}
        <p class="mb-6 text-zinc-700">{item.description}</p>
      {/if}

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div>
          <h4 class="font-semibold text-zinc-600 mb-2">Details</h4>
          <p><strong>Category:</strong> {item.category} ({item.subcategory})</p>
          <p><strong>Composed:</strong> {new Date(item.date).toLocaleDateString()}</p>
          <p><strong>Duration:</strong> ~{item.length.default} minutes</p>
          {#if item.detailed_instrumentation}
            <p class="mt-2"><strong>Instrumentation:</strong> {item.detailed_instrumentation}</p>
          {/if}
        </div>
        <div>
          <h4 class="font-semibold text-zinc-600 mb-2">Links</h4>
          {#if item.soundcloud}<a href={item.soundcloud} class="text-orange-600 block hover:underline">Listen on SoundCloud</a>{/if}
          {#if item.videos}{#each item.videos as video}<a href={video} class="text-red-600 block hover:underline">Watch Video</a>{/each}{/if}
          {#if item.recordings}{#each item.recordings as recording}<a href={recording} class="text-blue-600 block hover:underline">Listen to Recording</a>{/each}{/if}
        </div>
      </div>
    </div>
  </div>
</div> 