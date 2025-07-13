<script lang="ts">
  // Contact page content
  import { onMount } from 'svelte';
  import { pushState, replaceState } from '$app/navigation';
  import Footer from '$lib/components/Footer.svelte';
  import MusicPieceDropdown from '$lib/components/MusicPieceDropdown.svelte';
  import { fade } from 'svelte/transition';
  
  let submitted = false;
  let sending = false;
  let errorMsg = '';
  let messageType = '';
  let selectedPiece: any = null;
  let mounted = false;
  
  // Form data for different message types
  let musicCommissionData = {
    duration: '',
    estimatedDate: '',
    instrumentation: '',
    performer: '',
    performanceLocation: ''
  };
  
  let artCommissionData = {
    dateNeeded: '',
    size: '',
    delivery: ''
  };
  
  let performanceNoticeData = {
    date: '',
    location: '',
    performer: ''
  };
  
  let scorePurchaseData = {
    purchaseType: ''
  };
  
  // Browser history management
  let hasNavigatedToForm = false;
  
  onMount(() => {
    // Hide the fax honeypot field with JavaScript
    const faxField = document.querySelector('input[name="fax"]') as HTMLInputElement;
    if (faxField) {
      faxField.style.display = 'none';
    }

    // Handle browser back button
    const handlePopState = (event: PopStateEvent) => {
      if (messageType && hasNavigatedToForm) {
        // If we're on the form and back is pressed, go back to message type selection
        event.preventDefault();
        messageType = '';
        hasNavigatedToForm = false;
        // Update URL without adding to history using SvelteKit's replaceState
        replaceState(window.location.pathname, { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  });

  // Watch for message type changes to manage history
  $: if (messageType && !hasNavigatedToForm) {
    // When message type is selected, add to history
    pushState(window.location.pathname, { replace: false });
    hasNavigatedToForm = true;
    // Load reCAPTCHA when form is actually used
    loadRecaptcha();
  } else if (!messageType && hasNavigatedToForm) {
    // When message type is cleared, we're back to selection
    hasNavigatedToForm = false;
  }

  // Hide honeypot when form is rendered
  $: if (messageType) {
    setTimeout(() => {
      const faxField = document.querySelector('input[name="fax"]') as HTMLInputElement;
      if (faxField) {
        faxField.style.display = 'none';
      }
    }, 0);
  }

  // Set mounted to true after a brief delay to trigger fade-in
  setTimeout(() => {
    mounted = true;
  }, 100);

  // Load reCAPTCHA only when form is actually used
  function loadRecaptcha() {
    if (!document.querySelector('script[src*="recaptcha"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

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
    
    const url = "https://script.google.com/macros/s/AKfycbzAnaEDN39XCkW1oJ9rHbXHZ8Z01YMn73GmhdJ1AWno48M5KtcVhxHyoprkOfzFx8nr/exec";
    
    // Convert FormData to JSON string
    const formDataObj: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      formDataObj[key] = value.toString();
    }
    
    // Add message type and conditional data
    formDataObj.messageType = messageType;
    
    if (messageType === 'musicCommission') {
      Object.assign(formDataObj, musicCommissionData);
    } else if (messageType === 'artCommission') {
      Object.assign(formDataObj, artCommissionData);
    } else if (messageType === 'performanceNotice') {
      Object.assign(formDataObj, performanceNoticeData);
      formDataObj.selectedPiece = selectedPiece ? `${selectedPiece.title} for ${selectedPiece.for || ''}` : '';
    } else if (messageType === 'scorePurchase') {
      Object.assign(formDataObj, scorePurchaseData);
      formDataObj.selectedPiece = selectedPiece ? `${selectedPiece.title} for ${selectedPiece.for || ''}` : '';
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
        // Reset all data
        messageType = '';
        selectedPiece = null;
        musicCommissionData = { duration: '', estimatedDate: '', instrumentation: '', performer: '', performanceLocation: '' };
        artCommissionData = { dateNeeded: '', size: '', delivery: '' };
        performanceNoticeData = { date: '', location: '', performer: '' };
        scorePurchaseData = { purchaseType: '' };
      } else {
        errorMsg = result.error || "There was an error with the submitted form. Please try again.";
        console.log(result.status);
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
  <!-- <script src="https://www.google.com/recaptcha/api.js" async defer></script> -->
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
  {#if mounted}
    <div class="max-w-2xl w-full bg-white/80 rounded-3xl shadow-xl p-10 text-center border border-gray-100 relative z-[2]" in:fade={{ duration: 1200 }}>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact</h1>
      <p class="text-lg text-gray-700 mb-6">
        {#if hasNavigatedToForm}
        Submit the following form and I will contact you within 48 hours
        {#if messageType === 'scorePurchase'}
          to complete the order
        {/if}
        .
        {:else}
        Want to collaborate or get in touch? Shoot me a message below.
        {/if}
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
      
      {#if !messageType}
        <!-- Message Type Selection -->
        <div class="space-y-6">
          <h2 class="text-2xl font-semibold text-gray-800">What type of message would you like to send?</h2>
          <div class="grid gap-4">
            <button
              type="button"
              class="p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-gradient-to-r from-blue-50 to-blue-100"
              on:click={() => messageType = 'musicCommission'}
            >
              <h3 class="font-semibold text-lg">Music Commission & Collaboration</h3>
              <p class="text-gray-600">Request a new musical composition or collaboration</p>
            </button>
            <button
              type="button"
              class="p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-gradient-to-r from-green-50 to-green-100"
              on:click={() => messageType = 'artCommission'}
            >
              <h3 class="font-semibold text-lg">Art Commission, Design, & Collaboration</h3>
              <p class="text-gray-600">Request visual artwork or design</p>
            </button>
            <button
              type="button"
              class="p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-gradient-to-r from-purple-50 to-purple-100"
              on:click={() => messageType = 'performanceNotice'}
            >
              <h3 class="font-semibold text-lg">Performance Notice</h3>
              <p class="text-gray-600">Notify about a performance of my music</p>
            </button>
            <button
              type="button"
              class="p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-gradient-to-r from-orange-50 to-orange-100"
              on:click={() => messageType = 'scorePurchase'}
            >
              <h3 class="font-semibold text-lg">Score Purchase</h3>
              <p class="text-gray-600">Purchase sheet music or parts</p>
            </button>
            <button
              type="button"
              class="p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-gradient-to-r from-gray-50 to-gray-100"
              on:click={() => messageType = 'general'}
            >
              <h3 class="font-semibold text-lg">General</h3>
              <p class="text-gray-600">Other inquiries or messages</p>
            </button>
          </div>
        </div>
      {:else}
        <!-- Contact Form -->
        <form class="gform space-y-6 text-left" autocomplete="off" on:submit|preventDefault={handleSubmit}>
          <!-- Message Type Display -->
          <div class="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
            <span class="font-medium">Message Type: {messageType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
            <button
              type="button"
              class="text-gray-600 hover:text-gray-800"
              on:click={() => messageType = ''}
            >
              Change
            </button>
          </div>
          
          {#if messageType === 'scorePurchase'}
            <div class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p class="text-yellow-800 text-sm">
                Note: Not all pieces may have a score & parts readily available.
              </p>
            </div>

            <!-- <div class="p-3 "> -->
              <p class="text-zinc-700 text-sm font-bold">
                Scores & parts are only available in digital (PDF)format.<br/>Print and shipping is not available.
              </p>
            <!-- </div> -->
          {/if}

          
          <!-- Common Fields -->
          <div class="flex gap-4">
            <div class="flex-1">
              <label for="firstName" class="block text-gray-700 font-medium mb-1">First Name *</label>
              <input id="firstName" name="firstName" type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div class="flex-1">
              <label for="lastName" class="block text-gray-700 font-medium mb-1">Last Name *</label>
              <input id="lastName" name="lastName" type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex-1">
              <label for="email" class="block text-gray-700 font-medium mb-1">Email *</label>
              <input type="email" id="email" name="email" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
            </div>
            <div class="flex-1">
              <label for="phone" class="block text-gray-700 font-medium mb-1">Phone (Optional)</label>
              <input type="tel" id="phone" name="phone" class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="+1 (555) 123-4567">
            </div>
          </div>
          <div>
            <label for="subject" class="block text-gray-700 font-medium mb-1">Subject *</label>
            <input id="subject" name="subject" type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
          
          <!-- Conditional Fields -->
          {#if messageType === 'musicCommission'}
            <div class="space-y-4 p-4 bg-blue-50 rounded-lg">
              <h3 class="font-semibold text-blue-900">Music Commission Details</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 font-medium mb-1">Duration (minutes) *</label>
                  <input type="number" bind:value={musicCommissionData.duration} required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-1">Estimated Performance Date *</label>
                  <input type="text" bind:value={musicCommissionData.estimatedDate} required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-1">Instrumentation *</label>
                  <input type="text" bind:value={musicCommissionData.instrumentation} required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-1">Performer *</label>
                  <input type="text" bind:value={musicCommissionData.performer} required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-gray-700 font-medium mb-1">Performance Venue & Location (optional)</label>
                  <input type="text" bind:value={musicCommissionData.performanceLocation} class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
              </div>
            </div>
          {/if}
          
          {#if messageType === 'artCommission'}
            <div class="space-y-4 p-4 bg-green-50 rounded-lg">
              <h3 class="font-semibold text-green-900">Art Commission Details</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 font-medium mb-1">Date Needed *</label>
                  <input type="text" bind:value={artCommissionData.dateNeeded} required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-1">Size *</label>
                  <input type="text" bind:value={artCommissionData.size} required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-gray-700 font-medium mb-1">Delivery *</label>
                  <select bind:value={artCommissionData.delivery} required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <option value="">Select delivery type...</option>
                    <option value="digital">Digital</option>
                    <option value="physical">Physical</option>
                    <option value="both">Both Digital and Physical</option>
                  </select>
                </div>
              </div>
            </div>
          {/if}
          
          {#if messageType === 'performanceNotice'}
            <div class="space-y-4 p-4 bg-purple-50 rounded-lg">
              <h3 class="font-semibold text-purple-900">Performance Notice Details</h3>
              <div>
                <label class="block text-gray-700 font-medium mb-1">Piece *</label>
                <MusicPieceDropdown bind:selectedPiece placeholder="Select a piece..." />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 font-medium mb-1">Date *</label>
                  <input type="date" bind:value={performanceNoticeData.date} required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-1">Performer *</label>
                  <input type="text" bind:value={performanceNoticeData.performer} required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-gray-700 font-medium mb-1">Venue & Location *</label>
                  <input type="text" bind:value={performanceNoticeData.location} required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
              </div>
            </div>
          {/if}
          
          {#if messageType === 'scorePurchase'}
            <div class="space-y-4 p-4 bg-orange-50 rounded-lg">
              <h3 class="font-semibold text-orange-900">Score Purchase Details</h3>
              <div>
                <label class="block text-gray-700 font-medium mb-1">Piece *</label>
                <MusicPieceDropdown bind:selectedPiece placeholder="Select a piece..." />
              </div>
              <div>
                <label class="block text-gray-700 font-medium mb-1">Purchase Type *</label>
                <select bind:value={scorePurchaseData.purchaseType} required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
                  <option value="">Select purchase type...</option>
                  <option value="score">Score Only</option>
                  <option value="parts">Parts Only (If Applicable)</option>
                  <option value="both">Score & Parts (If Applicable)</option>
                </select>
              </div>
            </div>
          {/if}
          
          <div>
            <label for="message" class="block text-gray-700 font-medium mb-1">
              Message *
              {#if messageType === 'musicCommission' || messageType === 'artCommission'}
                <br/><span class="text-xs">Include any additional details and requirements.</span>
              {/if}
            </label>
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
            <div class="g-recaptcha" data-sitekey="6Ld9WnArAAAAAAaqcmJefDW76nhXRrok9rUOnlSZ" data-action="contact"></div>
          </div> -->
          <button type="submit" disabled={sending} class="w-full bg-gray-900 text-white font-semibold rounded-lg py-3 mt-2 shadow hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900">
            {#if sending}
              Submitting...
            {:else}
              Send Message
            {/if}
          </button>
        </form>
      {/if}
    </div>
  {:else}
    <!-- Placeholder to maintain layout -->
    <div class="max-w-2xl w-full p-10 text-center relative z-[2]">
      <div class="h-96"></div>
    </div>
  {/if}
</div>
<Footer /> 