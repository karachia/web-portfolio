<script lang="ts">
  // Contact page content
  import Footer from '$lib/components/Footer.svelte';
  import { onMount } from 'svelte';
  let submitted = false;
  let sending = false;
  let errorMsg = '';

  onMount(() => {
    // Hide the fax honeypot field with JavaScript
    const faxField = document.querySelector('input[name="fax"]') as HTMLInputElement;
    if (faxField) {
      faxField.style.display = 'none';
    }
  });

  async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Get reCAPTCHA token
    //TODO: Uncomment this when before production
    // const recaptchaToken = (window as any).grecaptcha?.getResponse();
    // if (!recaptchaToken) {
    //   errorMsg = "Please complete the reCAPTCHA verification.";
    //   return;
    // }
    
    const url = "https://script.google.com/macros/s/AKfycbxHQUrjb282efmdZHksYQ25GlyamUlVLc6RL96mePCP1n_n5HgO9q89PhSY_ACMpfc7/exec";
    
    // Convert FormData to JSON string
    const formDataObj: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      formDataObj[key] = value.toString();
    }
    
    // Add reCAPTCHA token
    //TODO: Uncomment this when before production
    // formDataObj.recaptchaToken = recaptchaToken;
    
    const jsonData = JSON.stringify(formDataObj);
    console.log("Form Data:");
    console.log(jsonData);
    try {
      sending = true;
      errorMsg = '';
      const response = await fetch(url, {
        redirect: "follow",
        method: "POST",
        body: jsonData,
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });
      const result = await response.json();
      if (result.status === "success") {
        submitted = true;
        form.reset();
      } else {
        errorMsg = result.error || "There was an error submitting the form. Please try again.";
        console.log(result.error);
      }
      sending = false;
    } catch (error) {
      sending = false;
      errorMsg = "There was an error submitting the form. Please try again.";
      console.error(error);
    }
  }
</script>

<svelte:head>
  <title>Contact - Sina Karachiani</title>
  <meta name="description" content="Contact Sina Karachiani for collaborations, performances, or questions." />
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
  <div class="max-w-2xl w-full bg-white/80 rounded-3xl shadow-xl p-10 text-center border border-gray-100 relative z-[2]">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact</h1>
    <p class="text-lg text-gray-700 mb-6">
      Want to connect? Reach out via email or social media.<br/>
    </p>
    {#if errorMsg}
      <div class="p-6 bg-red-100 text-red-800 rounded-xl text-center mb-6">
        {errorMsg}
      </div>
    {/if}
    {#if submitted && !errorMsg}
      <div class="p-6 bg-green-100 text-green-800 rounded-xl text-center mb-6">
        Thank you for your message! I will get back to you soon.
      </div>
    {/if}
    <form class="gform space-y-6 text-left" autocomplete="off" on:submit|preventDefault={handleSubmit}>
      <div class="flex gap-4">
        <div class="flex-1">
          <label for="firstName" class="block text-gray-700 font-medium mb-1">First Name</label>
          <input id="firstName" name="firstName" type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        <div class="flex-1">
          <label for="lastName" class="block text-gray-700 font-medium mb-1">Last Name</label>
          <input id="lastName" name="lastName" type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
      </div>
      <div>
        <label for="email" class="block text-gray-700 font-medium mb-1">Email Address</label>
        <input id="email" name="email" type="email" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
      </div>
      <div>
        <label for="subject" class="block text-gray-700 font-medium mb-1">Subject</label>
        <input id="subject" name="subject" type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
      </div>
      <div>
        <label for="message" class="block text-gray-700 font-medium mb-1">Message</label>
        <textarea id="message" name="message" rows="5" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
      </div>
      <!-- field to catch to find naughty guys -->
      <div style="position: absolute; left: -9999px;">
        <input type="text" name="website" tabindex="-1" autocomplete="off" />
      </div>
      <!-- Second field to find naughty guys hidden with Skript of Gava -->
      <div>
        <input type="text" name="fax" tabindex="-1" autocomplete="off" />
      </div>
      <!-- reCAPTCHA -->
      <!-- <div class="flex justify-center">
        <div class="g-recaptcha" data-sitekey="6Ld9WnArAAAAAAaqcmJefDW76nhXRrok9rUOnlSZ"></div>
      </div> -->
      <button type="submit" disabled={sending} class="w-full bg-gray-900 text-white font-semibold rounded-lg py-3 mt-2 shadow hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900">
        {#if sending}
          Submitting...
        {:else}
          Send Message
        {/if}
      </button>
    </form>
  </div>
</div>
<Footer /> 