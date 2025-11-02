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

<div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 my-8">
	<audio
		bind:this={audio}
		src={recording.url}
		on:timeupdate={handleTimeUpdate}
		on:loadedmetadata={handleLoadedMetadata}
		on:ended={() => (playing = false)}
	></audio>

	<div class="flex gap-4 md:gap-6 items-start flex-col md:flex-row">
		{#if recording.image}
			<div class="flex-shrink-0 w-full md:w-[120px] h-auto md:h-[120px] max-w-[200px] md:max-w-none mx-auto md:mx-0 rounded-xl overflow-hidden shadow-md">
				<img src={recording.image} alt={recording.title} class="w-full h-full object-cover" />
			</div>
		{/if}

		<!-- Right side content -->
		<div class="flex-1 flex flex-col gap-4">
			<!-- Top row: Play button and Text content -->
			<div class="flex gap-4 items-start">
				<!-- Play button -->
				<div class="flex justify-center md:justify-start">
					<button class="play-button-large" on:click={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
						{#if playing}
							<Icon data={pause} scale={1.8} />
						{:else}
							<span class="play-icon-adjust">
								<Icon data={play} scale={1.8} />
							</span>
						{/if}
					</button>
				</div>

				<!-- Text content -->
				<div class="flex-1 flex justify-between items-start gap-4">
					<div class="flex-1">
						<h3 class="m-0 text-lg font-semibold text-zinc-800 leading-snug">{recording.title}</h3>
						{#if recording.subtitle}
							<p class="mt-0 text-base text-zinc-600 italic">{recording.subtitle}</p>
						{/if}
						{#if recording.description}
							<p class="text-sm text-zinc-500 pt-2 leading-relaxed">{recording.description}</p>
						{/if}
					</div>
					{#if recording.link}
						<a
							href={recording.link}
							target="_blank"
							rel="noopener noreferrer"
							class="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-black/4 text-zinc-700 hover:bg-black/10 hover:text-black hover:-translate-y-0.5 transition-all duration-200"
							title="Open link"
						>
							<Icon data={externalLink} scale={1.0} />
						</a>
					{/if}
				</div>
			</div>

			<!-- Timeline controls -->
			<div class="flex items-center gap-4">
				<span class="text-[0.85rem] text-zinc-600 tabular-nums min-w-[40px] text-center">{formatTime(currentTime)}</span>
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
				<span class="text-[0.85rem] text-zinc-600 tabular-nums min-w-[40px] text-center">{formatTime(duration)}</span>
			</div>
		</div>
	</div>
</div>

<style>
	.play-button-large {
		flex-shrink: 0;
		width: 64px;
		height: 64px;
		border-radius: 50%;
		border: none;
		background: rgba(0, 0, 0, 0.9);
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.play-icon-adjust {
		display: inline-flex;
		margin-left: 3px;
	}

	.play-button-large:hover {
		transform: scale(1.05);
		background: rgba(0, 0, 0, 1.0);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
	}

	.play-button-large:active {
		transform: scale(0.98);
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
		background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 100%);
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
		border: 2px solid rgba(0, 0, 0, 0.7);
		border-radius: 50%;
		opacity: 0;
		transition: opacity 0.2s ease;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.timeline:hover .timeline-handle {
		opacity: 1;
	}
</style>

