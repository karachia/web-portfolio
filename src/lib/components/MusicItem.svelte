<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let item: any;
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('viewDetails', item);
  }
</script>

<button
  on:click={handleClick}
  class="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-4xl text-white border border-white/20 text-left transform hover:scale-[1.02] hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
>
  <div class="flex justify-between items-start">
    <div>
      <h3 class="text-2xl font-bold mb-1">{item.title}</h3>
      <p class="text-lg font-light text-zinc-300">{item.for}</p>
    </div>
    <span class="bg-teal-400/20 text-teal-300 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">{item.category}</span>
  </div>

  {#if item.summary}
    <p class="text-zinc-200 mt-4">{item.summary}</p>
  {/if}

  <p class="text-sm text-zinc-400 mt-4">
    <strong>Duration:</strong> {item.length.default} min
  </p>
</button> 