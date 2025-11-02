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

<div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 my-8">
	<audio
		bind:this={audio}
		src={recording.url}
		on:timeupdate={handleTimeUpdate}
		on:loadedmetadata={handleLoadedMetadata}
		on:ended={() => (playing = false)}
	></audio>

	<div class="flex gap-4 items-stretch sm:items-start flex-col sm:flex-row">
		{#if recording.image}
			<!-- Image on left side for sm+ screens -->
			<div class="hidden sm:block flex-shrink-0 self-start w-[120px] h-[120px] rounded-xl overflow-hidden shadow-md">
				<img src={recording.image} alt={recording.title} class="w-full h-full object-cover" />
			</div>
		{/if}

		<!-- Right side content -->
		<div class="flex-1 flex flex-col gap-3 sm:gap-4 min-w-0">
			<!-- Top row: Play button and Text content -->
			<div class="flex gap-3 sm:gap-4 items-start">
				<!-- Play button - visible on sm+ screens only -->
				<div class="hidden sm:block flex-shrink-0">
					<button class="play-button-large" on:click={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
						{#if playing}
							<span class="icon-wrapper">
								<Icon data={pause} scale={1.5} />
							</span>
						{:else}
							<span class="play-icon-adjust icon-wrapper">
								<Icon data={play} scale={1.5} />
							</span>
						{/if}
					</button>
				</div>

				<!-- Text content -->
				<div class="flex-1 flex justify-between items-start gap-3 sm:gap-4 min-w-0">
					<div class="flex-1 min-w-0 text-left">
						<!-- Small screen: play button + text -->
						<div class="sm:hidden flex items-start gap-2">
							<button class="play-button-small flex-shrink-0" on:click={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
								{#if playing}
									<span class="icon-wrapper-small">
										<Icon data={pause} scale={1.5} />
									</span>
								{:else}
									<span class="play-icon-adjust-small icon-wrapper-small">
										<Icon data={play} scale={1.5} />
									</span>
								{/if}
							</button>
							<div class="flex-1">
								<h3 class="m-0 text-base md:text-lg font-semibold text-zinc-800 leading-snug">
									{recording.title}
									{#if recording.link}
										<a
											href={recording.link}
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center justify-center w-5 h-5 text-zinc-600 hover:text-zinc-900 transition-colors duration-200 align-middle ml-1"
											title="Open link"
										>
											<Icon data={externalLink} scale={0.8} />
										</a>
									{/if}
								</h3>
								{#if recording.subtitle}
									<p class="mt-0 text-sm md:text-base text-zinc-600 italic">
										{recording.subtitle}
									</p>
								{/if}
							</div>
						</div>
						<!-- Large screen: text only -->
						<div class="hidden sm:block">
							<h3 class="m-0 text-base md:text-lg font-semibold text-zinc-800 leading-snug">
								{recording.title}
							</h3>
							{#if recording.subtitle}
								<p class="mt-0 text-sm md:text-base text-zinc-600 italic">{recording.subtitle}</p>
							{/if}
						</div>
						{#if recording.description}
							<p class="hidden sm:block text-xs md:text-sm text-zinc-500 pt-2 leading-relaxed">{recording.description}</p>
						{/if}
					</div>
					{#if recording.link}
						<a
							href={recording.link}
							target="_blank"
							rel="noopener noreferrer"
							class="hidden sm:flex flex-shrink-0 items-center justify-center w-7 h-7 rounded-lg bg-black/4 text-zinc-700 hover:bg-black/10 hover:text-black hover:-translate-y-0.5 transition-all duration-200"
							title="Open link"
						>
							<Icon data={externalLink} scale={1.0} />
						</a>
					{/if}
				</div>
			</div>

			<!-- Timeline controls - Small screens -->
			<div class="sm:hidden flex flex-col gap-2">
				<!-- Timestamps row -->
				<div class="flex items-center justify-between px-1">
					<span class="text-xs text-zinc-600 tabular-nums">{formatTime(currentTime)}</span>
					<span class="text-xs text-zinc-600 tabular-nums">{formatTime(duration)}</span>
				</div>
				<!-- Timeline -->
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
			</div>

			<!-- Timeline controls - Larger screens -->
			<div class="hidden sm:flex items-center gap-3">
				<span class="text-xs sm:text-[0.85rem] text-zinc-600 tabular-nums min-w-[35px] text-left">{formatTime(currentTime)}</span>
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
				<span class="text-xs sm:text-[0.85rem] text-zinc-600 tabular-nums min-w-[35px] text-right">{formatTime(duration)}</span>
			</div>
		</div>
	</div>
</div>

<style>
	.play-button-large {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
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

	@media (min-width: 640px) {
		.play-button-large {
			width: 56px;
			height: 56px;
		}
	}

	@media (min-width: 768px) {
		.play-button-large {
			width: 64px;
			height: 64px;
		}
	}

	.icon-wrapper {
		display: inline-flex;
	}

	@media (min-width: 640px) {
		.icon-wrapper {
			transform: scale(1.07);
		}
	}

	@media (min-width: 768px) {
		.icon-wrapper {
			transform: scale(1.2);
		}
	}

	.play-icon-adjust {
		margin-left: 2px;
	}

	@media (min-width: 640px) {
		.play-icon-adjust {
			margin-left: 2.5px;
		}
	}

	@media (min-width: 768px) {
		.play-icon-adjust {
			margin-left: 3px;
		}
	}

	.play-button-large:hover {
		transform: scale(1.05);
		background: rgba(0, 0, 0, 1.0);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
	}

	.play-button-large:active {
		transform: scale(0.98);
	}

	.play-button-small {
		flex-shrink: 0;
		width: 52px;
		height: 52px;
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

	.play-button-small:hover {
		transform: scale(1.05);
		background: rgba(0, 0, 0, 1.0);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
	}

	.play-button-small:active {
		transform: scale(0.98);
	}

	.icon-wrapper-small {
		display: inline-flex;
	}

	.play-icon-adjust-small {
		margin-left: 3px;
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

