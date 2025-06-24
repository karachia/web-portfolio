<script lang="ts">
	import Icon from 'svelte-awesome';

	/// *** Embedded Icons ***
	import github from 'svelte-awesome/icons/github';
	import linkedin from 'svelte-awesome/icons/linkedin';
	import instagram from 'svelte-awesome/icons/instagram';
	import soundcloud from 'svelte-awesome/icons/soundcloud';
</script>

<footer class="bg-zinc-900 text-white py-8">
	<div class="mx-auto max-w-4xl px-4">
		<div class="relative flex items-center justify-between">
			<div class="flex items-center space-x-6">
				<a href="/#contact" class="text-sm text-zinc-400 hover:text-white transition-colors">
					Contact Me!
				</a>
			</div>
			<div class="absolute left-1/2 transform -translate-x-1/2 text-sm text-zinc-400 text-center">
				<div>© {new Date().getFullYear()} Sina Karachiani. All rights reserved.</div> 
                <div class="mt-1">Made with ❤️ by myself in San Francisco, CA</div>
			</div>
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
		</div>
	</div>
</footer> 