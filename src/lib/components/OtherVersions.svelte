<script lang="ts">
  import Icon from 'svelte-awesome';
  import externalLink from 'svelte-awesome/icons/externalLink';
  
  export let otherVersions: any[] = [];
</script>

{#if otherVersions.length > 0}
  <div>
    <div class="text-md text-bold mt-6 text-zinc-800">Other Arrangements:</div>
    <div class="mt-1 text-sm text-zinc-600">
      {#each otherVersions as version}
        <div class="mb-0 flex items-start">
          <span class="mr-2 text-zinc-400">•</span>
          <a
            href="/music/{version.id}"
            target="_blank"
            rel="noopener noreferrer"
            class="text-zinc-600 transition-colors hover:text-zinc-800 hover:underline"
          >
            {version.title}
            {#if version.for}for {version.for}{/if}
            <Icon class="ml-1 h-3 w-3" data={externalLink}/>
          </a>
        </div>
      {/each}
    </div>
  </div>
{/if} 