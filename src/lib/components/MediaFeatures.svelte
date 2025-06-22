<script lang="ts">
  export let item: any;
  
  // Helper function to check if a value is truthy and not an empty string
  function isValidString(value: any): boolean {
    return value && typeof value === 'string' && value.trim() !== '';
  }

  // Helper function to check if an array has valid items
  function hasValidItems(array: any[]): boolean {
    return array && Array.isArray(array) && array.some(item => isValidString(item));
  }

  // Check what media features are available
  $: hasRecording = (item.recordings && item.recordings.preview) || hasValidItems(item.recordings);
  $: hasVideo = hasValidItems(item.videos);
  $: hasAudio = isValidString(item.soundcloud) || (item.soundcloud && item.soundcloud.url);
</script>

<div class="flex items-center space-x-3">
  {#if hasRecording}
    <div class="flex items-center" title="Recording available">
      <img src="/assets/media-features/recording.png" alt="Recording" class="w-4 h-4" />
    </div>
  {/if}
  
  {#if hasVideo}
    <div class="flex items-center" title="Video available">
      <img src="/assets/media-features/video.png" alt="Video" class="w-4 h-4" />
    </div>
  {/if}
  
  {#if hasAudio}
    <div class="flex items-center" title="Audio available">
      <img src="/assets/media-features/audio.png" alt="Audio" class="w-4 h-5" />
    </div>
  {/if}
  
  {#if item.score}
    <div class="flex items-center -ml-2" title="Score available">
      <img src="/assets/media-features/score.png" alt="Score" class="w-6 h-5" />
    </div>
  {/if}
</div> 