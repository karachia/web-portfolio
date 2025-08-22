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
  class="group cursor-pointer py-2 px-2 rounded-lg hover:bg-white/10 transition-all duration-300"
  on:click={handleClick}
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabindex="0"
>
  <div class="flex items-start gap-3 sm:gap-4">
    <!-- Thumbnail - smaller responsive sizing -->
    <div class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-gray-100">
      {#if image}
        <img 
          src={image} 
          alt={`Cover for ${title}`}
          class="w-full h-full object-cover group-hover:scale-110 transition-scale duration-300"
        />
      {:else}
        <!-- Placeholder -->
        <div class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
          </svg>
        </div>
      {/if}
    </div>

    <!-- Content - always left aligned -->
    <div class="flex-1 min-w-0 text-left">
      <!-- Title with inline link icon -->
      <h3 class="font-semibold text-gray-900 text-sm sm:text-sm leading-tight group-hover:text-purple-800 transition-colors duration-300">
        {title}
        <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Icon data={externalLink} scale={0.7} class="text-purple-600 ml-1 mr-1" />
        </span>
      </h3>
      <p class="text-gray-600 text-xs sm:text-xs leading-relaxed group-hover:text-violet-500 transition-colors duration-300">
        {description}
      </p>
    </div>
  </div>
</div>
