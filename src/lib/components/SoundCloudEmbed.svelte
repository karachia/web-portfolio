<script lang="ts">
  export let trackUrl: string;
  export let width: string = "70%";
  export let height: number = 166;
  export let trackTitle: string;
  export let artistName: string = "Sina Karachiani";
  export let artistUrl: string = "https://soundcloud.com/sinakarachiani";
</script>

<iframe 
  {width}
  height={height} 
  scrolling="no" 
  frameborder="no" 
  allow="autoplay" 
  src="{trackUrl}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
></iframe>

<div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;">
  <a href={artistUrl} title={artistName} target="_blank" style="color: #cccccc; text-decoration: none;">{artistName}</a> · 
  <a href={trackUrl} title={trackTitle} target="_blank" style="color: #cccccc; text-decoration: none;">{trackTitle}</a>
</div> 