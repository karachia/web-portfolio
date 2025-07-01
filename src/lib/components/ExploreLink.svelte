<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from 'svelte-awesome';
  import chevronRight from 'svelte-awesome/icons/chevronRight';

  export let title: string;
  export let href: string = '';
  export let image: string = '';
  export let icon: any = null;
  export let modalContent: any = null;
  export let modalProps: Record<string, any> = {};
  export let alt: string = '';

  let showModal = false;
  const dispatch = createEventDispatcher();

  function handleClick(e: MouseEvent) {
    if (modalContent) {
      e.preventDefault();
      showModal = true;
      dispatch('openModal');
    }
    // else, let the link work normally
  }
  function closeModal() {
    showModal = false;
  }
</script>

<div>
  <a
    href={href || '#'}
    class="group flex items-center w-full min-h-[56px] px-4 py-2 rounded-2xl bg-white/90 shadow-md border border-zinc-100 hover:bg-zinc-100 transition cursor-pointer gap-3"
    on:click={handleClick}
    style="text-decoration: none;"
    target={modalContent ? undefined : '_blank'}
    rel={modalContent ? undefined : 'noopener noreferrer'}
  >
    {#if image}
      <img src={image} alt={alt || title} class="w-10 h-10 rounded-lg object-cover flex-shrink-0 -ml-2" />
    {/if}
    <span class="flex-1 flex items-center gap-2 text-md font-semibold text-zinc-800">
      {title}
      {#if icon}
        <Icon data={icon} class="text-zinc-500 w-5 h-5 flex-shrink-0" />
      {/if}
    </span>
    <Icon data={chevronRight} class="text-zinc-400 group-hover:text-zinc-700 w-6 h-6 ml-2 flex-shrink-0" />
  </a>

  {#if showModal && modalContent}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" on:click={closeModal}>
      <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative" on:click|stopPropagation>
        <button class="absolute top-3 right-3 text-zinc-400 hover:text-zinc-700" on:click={closeModal} aria-label="Close">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 28 28"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        {#if typeof modalContent === 'string'}
          <div class="text-zinc-800">{modalContent}</div>
        {:else}
          <svelte:component this={modalContent} {...modalProps} />
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  a {
    outline: none;
  }
</style> 