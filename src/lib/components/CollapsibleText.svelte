<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let text: string;
  export let maxLength: number = 200;
  export let showButton: boolean = true;
  
  let isExpanded = false;
  let isDragging = false;
  let mouseDownX = 0;
  let mouseDownY = 0;
  const dispatch = createEventDispatcher();
  
  $: shouldTruncate = text.length > maxLength;
  $: displayText = isExpanded ? text : text.slice(0, maxLength) + '...';
  
  function toggleExpanded() {
    if (!isDragging) {
      isExpanded = !isExpanded;
      dispatch('toggle', { isExpanded });
    }
  }

  function handleMouseDown(e: MouseEvent) {
    mouseDownX = e.clientX;
    mouseDownY = e.clientY;
    isDragging = false;
  }

  function handleMouseMove(e: MouseEvent) {
    if (Math.abs(e.clientX - mouseDownX) > 5 || Math.abs(e.clientY - mouseDownY) > 5) {
      isDragging = true;
    }
  }

  function handleMouseUp() {
    // Reset dragging state after a short delay to allow for text selection
    setTimeout(() => {
      isDragging = false;
    }, 100);
  }
</script>

<div 
  class="text-zinc-700 italic transition-all duration-200 {shouldTruncate && showButton ? 'cursor-pointer hover:bg-gray-50 hover:shadow-sm rounded px-2 py-1 -mx-2 -my-1' : ''}"
  on:click={shouldTruncate && showButton ? toggleExpanded : undefined}
  on:mousedown={shouldTruncate && showButton ? handleMouseDown : undefined}
  on:mousemove={shouldTruncate && showButton ? handleMouseMove : undefined}
  on:mouseup={shouldTruncate && showButton ? handleMouseUp : undefined}
  role={shouldTruncate && showButton ? 'button' : undefined}
  tabindex={shouldTruncate && showButton ? '0' : undefined}
  on:keydown={(e: KeyboardEvent) => {
    if (shouldTruncate && showButton && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      toggleExpanded();
    }
  }}
>
  {displayText}
  {#if shouldTruncate && showButton}
    <button 
      on:click|stopPropagation={toggleExpanded}
      class="ml-2 text-blue-600 hover:text-blue-800 underline text-sm font-medium transition-colors"
    >
      {isExpanded ? 'Click to show less' : 'Click to read more'}
    </button>
  {/if}
</div> 