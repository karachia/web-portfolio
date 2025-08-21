<script lang="ts">
  import { onMount } from 'svelte';
  import HorizontalScrollItem from './HorizontalScrollItem.svelte';

  export let title: string = 'Items';
  export let dataSource: string = '/data/featured_items.json';
  export let showSpacerAlignment: boolean = true;

  let items: any[] = [];
  let mounted = false;
  let scrollContainer: HTMLElement;

  onMount(async () => {
    try {
      const response = await fetch(dataSource);
      items = await response.json();
      mounted = true;
      
      // Initial fade calculation after items are rendered
      setTimeout(() => {
        handleScroll();
      }, 100);
    } catch (error) {
      console.error('Error loading items:', error);
      mounted = true;
    }
  });

  function handleScroll() {
    if (!scrollContainer) return;
    
    const leftFade = document.getElementById('left-fade');
    const rightFade = document.getElementById('right-fade');
    
    if (!leftFade || !rightFade) return;
    
    const scrollLeft = scrollContainer.scrollLeft;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    
    // Show left fade when scrolled right
    if (scrollLeft > 10) {
      leftFade.style.opacity = '1';
    } else {
      leftFade.style.opacity = '0';
    }
    
    // Show right fade when there's more content to scroll
    if (scrollLeft < maxScroll - 10) {
      rightFade.style.opacity = '1';
    } else {
      rightFade.style.opacity = '0';
    }
  }
</script>

{#if mounted && items.length > 0}
  <section class="w-full">
    <!-- Header positioned to align with hero text -->
    <div class="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mb-6">
      <!-- Invisible spacer to match logo width -->
      <div class="h-0 w-44 hidden sm:block"></div>
      
      <!-- Header area matching the text area in hero -->
      <div class="flex flex-col items-center text-center sm:items-start sm:text-left w-full">
        <h2 class="text-lg {showSpacerAlignment ? 'ml-5' : ''} md:text-xl font-bold bg-gradient-to-r from-purple-900 via-blue-800 to-purple-700 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
    </div>

    <!-- Scrollable container with same structure as header for perfect alignment -->
    <div class="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <!-- Spacer matching the logo width -->
      <!-- <div class="h-0 w-44 hidden sm:block"></div> -->
      
      <!-- Scrollable area matching the text area width -->
      <div class="relative flex-1 overflow-hidden">
        <!-- Left fade overlay -->
        <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-300" id="left-fade"></div>
        
        <!-- Right fade overlay -->
        <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 via-gray to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-300" id="right-fade"></div>
        
        <!-- Scrollable row of items aligned with header -->
        <div 
          bind:this={scrollContainer}
          on:scroll={handleScroll}
          class="flex gap-7 overflow-x-auto scrollbar-hide pb-2 pt-4 scroll-smooth justify-center sm:justify-start ml-0 sm:ml-5"
        >
          {#each items as item}
            <div class="featured-item">
              <HorizontalScrollItem 
                title={item.title}
                description={item.description}
                image={item.image}
                link={item.link}
              />
            </div>
          {/each}
          
          <!-- Right padding to ensure last item isn't cut off -->
          <div class="flex-shrink-0 w-4"></div>
        </div>
      </div>
    </div>
  </section>
{/if}

<style>
  /* Hide scrollbar but keep functionality */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
</style>
