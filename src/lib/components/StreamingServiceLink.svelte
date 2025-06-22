<script lang="ts">
  export let serviceName: string;
  export let url: string;
  export let iconPath: string;
  export let iconSize: string = "w-12 h-12"; // Default size, can be overridden
  import Icon from 'svelte-awesome';

  /// *** Embedded Icons ***
  import externalLink from 'svelte-awesome/icons/externalLink';
</script>
<!-- <i class="fa-solid fa-arrow-up-right-from-square"></i> -->
<a 
  href={url} 
  target="_blank" 
  rel="noopener noreferrer" 
  class="flex flex-col items-center hover:opacity-80 transition-opacity"
>
  <img src={iconPath} alt={serviceName} class={iconSize} />
  <span class="text-xs text-zinc-700 mt-1">{serviceName}
    <Icon class="w-3 h-3 ml-1" data={externalLink}/>
</a> 