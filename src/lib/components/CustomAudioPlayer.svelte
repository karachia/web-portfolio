<script lang="ts">
	import Icon from 'svelte-awesome';
	import externalLink from 'svelte-awesome/icons/externalLink';
	import play from 'svelte-awesome/icons/play';
	import pause from 'svelte-awesome/icons/pause';

	export let recording;

	let audio: HTMLAudioElement;
	let playing = false;
	let currentTime = 0;
	let duration = 0;
	let seeking = false;

	function togglePlay() {
		if (playing) {
			audio.pause();
		} else {
			audio.play();
		}
		playing = !playing;
	}

	function handleTimeUpdate() {
		if (!seeking) {
			currentTime = audio.currentTime;
		}
	}

	function handleLoadedMetadata() {
		duration = audio.duration;
	}

	function handleSeek(e: MouseEvent) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const x = e.clientX - rect.left;
		const percentage = x / rect.width;
		audio.currentTime = percentage * duration;
		currentTime = audio.currentTime;
	}

	function handleSeekStart() {
		seeking = true;
	}

	function handleSeekEnd(e: MouseEvent) {
		seeking = false;
		handleSeek(e);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') {
			audio.currentTime = Math.max(0, audio.currentTime - 5);
		} else if (e.key === 'ArrowRight') {
			audio.currentTime = Math.min(duration, audio.currentTime + 5);
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			togglePlay();
		}
	}

	function formatTime(seconds: number) {
		if (isNaN(seconds)) return '0:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	$: progress = duration ? (currentTime / duration) * 100 : 0;
</script>

<div class="custom-audio-player">
	<audio
		bind:this={audio}
		src={recording.url}
		on:timeupdate={handleTimeUpdate}
		on:loadedmetadata={handleLoadedMetadata}
		on:ended={() => (playing = false)}
	></audio>

	<div class="player-content">
		{#if recording.image}
			<div class="album-art">
				<img src={recording.image} alt={recording.title} />
			</div>
		{/if}

		<div class="player-info">
			<div class="info-header">
				<div class="text-content">
					<h3 class="track-title">{recording.title}</h3>
					{#if recording.subtitle}
						<p class="track-subtitle">{recording.subtitle}</p>
					{/if}
					{#if recording.description}
						<p class="text-sm text-zinc-500 pt-4">{recording.description}</p>
					{/if}
				</div>
				{#if recording.link}
					<a
						href={recording.link}
						target="_blank"
						rel="noopener noreferrer"
						class="external-link"
						title="Open link"
					>
						<Icon data={externalLink} scale={1.2} />
					</a>
				{/if}
			</div>

			<div class="player-controls">
				<button class="play-button" on:click={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
					{#if playing}
						<Icon data={pause} scale={1.3} />
					{:else}
						<Icon data={play} scale={1.3} />
					{/if}
				</button>

				<div class="timeline-container">
					<span class="time-display">{formatTime(currentTime)}</span>
					<div
						class="timeline"
						on:click={handleSeek}
						on:keydown={handleKeydown}
						on:mousedown={handleSeekStart}
						on:mouseup={handleSeekEnd}
						role="slider"
						tabindex="0"
						aria-label="Seek"
						aria-valuemin="0"
						aria-valuemax={duration}
						aria-valuenow={currentTime}
					>
						<div class="timeline-progress" style="width: {progress}%"></div>
						<div class="timeline-handle" style="left: {progress}%"></div>
					</div>
					<span class="time-display">{formatTime(duration)}</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.custom-audio-player {
		background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		margin: 2rem 0;
		transition: box-shadow 0.3s ease;
	}

	.custom-audio-player:hover {
		box-shadow: 0 6px 28px rgba(0, 0, 0, 0.12);
	}

	.player-content {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
	}

	.album-art {
		flex-shrink: 0;
		width: 120px;
		height: 120px;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
	}

	.album-art img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.player-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.info-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.text-content {
		flex: 1;
	}

	.track-title {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: #1a1a1a;
		line-height: 1.3;
	}

	.track-subtitle {
		margin: 0.5rem 0 0 0;
		font-size: 0.95rem;
		color: #666;
		font-style: italic;
	}

	.external-link {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 8px;
		background: rgba(0, 0, 0, 0.05);
		color: #444;
		transition: all 0.2s ease;
		text-decoration: none;
	}

	.external-link:hover {
		background: rgba(0, 0, 0, 0.1);
		color: #000;
		transform: translateY(-2px);
	}

	.player-controls {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.play-button {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border: none;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
	}

	.play-button:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
	}

	.play-button:active {
		transform: scale(0.98);
	}

	.timeline-container {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.time-display {
		font-size: 0.85rem;
		color: #666;
		font-variant-numeric: tabular-nums;
		min-width: 40px;
		text-align: center;
	}

	.timeline {
		flex: 1;
		height: 6px;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 3px;
		position: relative;
		cursor: pointer;
		transition: height 0.2s ease;
	}

	.timeline:hover {
		height: 8px;
	}

	.timeline-progress {
		height: 100%;
		background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
		border-radius: 3px;
		transition: width 0.1s ease;
	}

	.timeline-handle {
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 14px;
		height: 14px;
		background: white;
		border: 2px solid #667eea;
		border-radius: 50%;
		opacity: 0;
		transition: opacity 0.2s ease;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.timeline:hover .timeline-handle {
		opacity: 1;
	}

	@media (max-width: 768px) {
		.custom-audio-player {
			padding: 1.5rem;
		}

		.player-content {
			flex-direction: column;
			gap: 1.5rem;
		}

		.album-art {
			width: 100%;
			height: auto;
			aspect-ratio: 1;
			max-width: 200px;
			margin: 0 auto;
		}

		.track-title {
			font-size: 1.1rem;
		}

		.track-subtitle {
			font-size: 0.85rem;
		}

		.player-controls {
			flex-direction: column;
			align-items: stretch;
			gap: 1rem;
		}

		.play-button {
			align-self: center;
		}

		.timeline-container {
			width: 100%;
		}
	}
</style>

