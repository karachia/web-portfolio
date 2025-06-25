<script lang="ts">
  // Contact page content
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Contact - Sina Karachiani</title>
  <meta name="description" content="Contact Sina Karachiani for collaborations, performances, or questions." />
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
  <div class="max-w-2xl w-full bg-white/80 rounded-3xl shadow-xl p-10 text-center border border-gray-100">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact</h1>
    <p class="text-lg text-gray-700 mb-6">
      Want to connect? Reach out via email or social media.<br/>
      (A contact form will be added soon!)
    </p>
    <a href="mailto:youremail@example.com" class="inline-block px-6 py-2 bg-gray-900 text-white rounded shadow hover:bg-gray-700 transition-colors duration-200">Email Me</a>
  </div>
</div>
<Footer /> 