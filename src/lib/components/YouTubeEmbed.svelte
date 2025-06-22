<script lang="ts">
  export let videoUrl: string;
  export let width: string = "w-full"; // Default to 80% width
  export let title: string = "YouTube video player";
</script>

<div class="flex mb-4">
  <div class="{width} aspect-video">
    <iframe
      src={videoUrl}
      {title}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      class="w-full h-full rounded-lg"
    ></iframe>
  </div>
</div> 