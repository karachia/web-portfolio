<script lang="ts">
  import { onMount } from 'svelte';
  
  export let selectedPiece: any = null;
  export let placeholder: string = "Select a piece...";
  
  let pieces: any[] = [];
  let filteredPieces: any[] = [];
  let searchTerm = '';
  let isOpen = false;
  let dropdownElement: HTMLElement;
  
  onMount(async () => {
    try {
      const response = await fetch('/data/music.json');
      pieces = await response.json();
      filteredPieces = pieces;
    } catch (error) {
      console.error('Error loading music data:', error);
    }
  });
  
  function filterPieces() {
    if (!searchTerm.trim()) {
      filteredPieces = pieces;
    } else {
      const words = searchTerm.split(/\s+/).filter(Boolean);
      filteredPieces = pieces.filter(piece => {
        const fields = [
          piece.title?.toLowerCase() || '',
          (('for ' + piece.for) || '').toLowerCase(),
          piece.detailed_instrumentation?.toLowerCase() || ''
        ];
        return words.every(word => fields.some(field => field.includes(word.toLowerCase())));
      });
    }
  }
  
  function selectPiece(piece: any) {
    selectedPiece = piece;
    searchTerm = `${piece.title} - ${piece.for}`;
    isOpen = false;
  }
  
  function toggleDropdown() {
    isOpen = !isOpen;
    if (isOpen) {
      if (!selectedPiece) {
        searchTerm = '';
      }
      filterPieces();
    }
  }
  
  function handleClickOutside(event: MouseEvent) {
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      isOpen = false;
    }
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (isOpen) {
        // If dropdown is open, clear search and close dropdown
        searchTerm = '';
        isOpen = false;
        event.preventDefault();
      } else if (selectedPiece) {
        // If dropdown is closed but piece is selected, clear selection
        selectedPiece = null;
        searchTerm = '';
        event.preventDefault();
      }
    }
  }
  
  $: if (searchTerm !== undefined) {
    filterPieces();
  }
  
  $: if (selectedPiece && !searchTerm) {
    searchTerm = `${selectedPiece.title} - ${selectedPiece.for}`;
  }
  
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<div bind:this={dropdownElement} class="relative">
  <div class="relative">
    <button
      type="button"
      class="w-full rounded-lg border border-gray-300 px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
      on:click={toggleDropdown}
    >
      {#if selectedPiece}
        {selectedPiece.title} - {selectedPiece.for}
      {:else}
        {placeholder}
      {/if}
    </button>
    
    {#if selectedPiece}
      <button
        type="button"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
        on:click={(e) => {
          e.stopPropagation();
          selectedPiece = null;
          searchTerm = '';
          isOpen = false;
        }}
        aria-label="Clear selection"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    {/if}
  </div>
  
  {#if isOpen}
    <div class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      <input
        type="text"
        placeholder="Search pieces..."
        class="w-full px-4 py-2 border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
        bind:value={searchTerm}
        on:focus={() => {}}
      />
      {#each filteredPieces as piece}
        <button
          type="button"
          class="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          on:click={() => selectPiece(piece)}
        >
          <div class="font-medium">{piece.title}</div>
          <div class="text-sm text-gray-600">for {piece.for}</div>
        </button>
      {/each}
      {#if filteredPieces.length === 0}
        <div class="px-4 py-2 text-gray-500">No pieces found</div>
      {/if}
    </div>
  {/if}
</div> 