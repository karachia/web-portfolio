<script lang="ts">
  import Icon from 'svelte-awesome';
  import externalLink from 'svelte-awesome/icons/externalLink';
  
  export let title: string;
  export let description: string;
  export let image: string;
  export let link: string;

  function handleClick() {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      window.location.href = `/${link}`;
    }
  }
</script>

<div 
  class="group cursor-pointer flex-shrink-0 w-48 sm:w-56" 
  on:click={handleClick}
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabindex="0"
>
  <!-- Album Cover with Vinyl Sleeve Effect - Medium sized version -->
  <div class="relative aspect-square bg-gradient-to-b from-gray-100 via-stone-50 via-stone-50 to-stone-100 rounded-lg shadow-lg overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105 p-2 flex items-center justify-center">
    {#if image}
      <img 
        src={image} 
        alt={`Cover art for ${title}`}
        class="w-full h-full object-contain"
      />
    {:else}
      <!-- Placeholder when no image -->
      <div class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-md">
        <div class="flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
          </svg>
        </div>
      </div>
    {/if}
    
    <!-- Dark overlay on hover -->
    <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <!-- Link icon in top right corner -->
    <div class="absolute top-4 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
      <Icon data={externalLink} scale={1.2} class="text-zinc-400" />
    </div>
  </div>
  
  <!-- Caption -->
  <div class="text-center px-1">
    <h3 class="font-semibold text-gray-900 text-sm mb-1 leading-tight">{@html title}</h3>
    <p class="text-gray-600 text-sm leading-tight">{@html description}</p>
  </div>
</div>
