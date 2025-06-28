<script lang="ts">
	import Icon from 'svelte-awesome';

	/// *** Embedded Icons ***
	import github from 'svelte-awesome/icons/github';
	import linkedin from 'svelte-awesome/icons/linkedin';
	import instagram from 'svelte-awesome/icons/instagram';
	import soundcloud from 'svelte-awesome/icons/soundcloud';
</script>

<footer class="bg-zinc-900 text-white py-8 relative z-[2]">
	<div class="mx-auto max-w-4xl px-4">
		<div class="flex flex-col items-center space-y-6 sm:relative sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
			<!-- Contact Me button - top on mobile, left on desktop -->
			<div class="flex items-center space-x-6">
				<a href="/#contact" class="text-sm text-zinc-400 hover:text-white transition-colors">
					Contact Me!
				</a>
			</div>
			
			<!-- Social media links - middle on mobile, right on desktop -->
			<div class="flex items-center space-x-4">
				<a href="https://github.com/karachia" target="_blank" class="text-zinc-400 hover:text-white transition-colors">
					<Icon data={github} scale={1.25}/>
				</a>
				<a href="https://www.linkedin.com/in/sina-karachiani-5b9b8593/" target="_blank" class="text-zinc-400 hover:text-white transition-colors">
					<Icon data={linkedin} scale={1.25}/>
				</a>
				<a href="https://www.instagram.com/sina.karachiani.music/" target="_blank" class="text-zinc-400 hover:text-white transition-colors">
					<Icon data={instagram} scale={1.25}/>
				</a>
				<a href="https://soundcloud.com/sinakarachiani/" target="_blank" class="text-zinc-400 hover:text-white transition-colors">
					<Icon data={soundcloud} scale={1.5}/>
				</a>
			</div>
			
			<!-- Copyright text - bottom on mobile, center on desktop -->
			<div class="text-sm text-zinc-400 text-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
				<div>© {new Date().getFullYear()} Sina Karachiani. All rights reserved.</div> 
				<div class="mt-1">Made with ❤️ by myself in San Francisco, CA</div>
			</div>
		</div>
	</div>
</footer> 