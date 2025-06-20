<script lang="ts">
import { onMount } from 'svelte';
let menuOpen = false;
let showMenu = false;
const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Music', href: '#music' },
  { name: 'Art', href: '#art' },
  { name: 'Contact', href: '#contact' }
];

function openMenu() {
  showMenu = true;
  menuOpen = true;
}
function closeMenu() {
  menuOpen = false;
  // Wait for animation to finish before unmounting
  setTimeout(() => { showMenu = false; }, 200);
}
function toggleMenu() {
  if (!menuOpen) openMenu();
  else closeMenu();
}
function handleNavClick() {
  closeMenu();
}

// Optional: Close menu on resize to md and up
onMount(() => {
  const handler = () => {
    if (window.innerWidth >= 768) {
      menuOpen = false;
      showMenu = false;
    }
  };
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
});
</script>

<nav class="w-full fixed top-0 left-0 z-50 flex justify-center pointer-events-none">
  <div class="pointer-events-auto bg-white/60 backdrop-blur-lg shadow-xl rounded-2xl mt-4 mx-2 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl flex items-center justify-between px-6 py-3 border border-white/30 relative">
    <div class="flex items-center space-x-3">
      <img src="/assets/SK_Brand.png" alt="Sina Karachiani Logo" class="h-8 w-auto rounded" />
      <a href="#" class="text-xl font-bold tracking-tight text-gray-900 select-none focus:outline-none focus:ring-2 focus:ring-gray-300 hover:text-gray-700 transition-colors duration-200" aria-label="Go to top">
        SINA
      </a>
    </div>
    <!-- Hamburger Icon (mobile) -->
    <button class="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300" aria-label="Open navigation menu" on:click={toggleMenu}>
      <svg class="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <!-- Nav Links (desktop) -->
    <ul class="hidden md:flex space-x-6">
      {#each navItems as item}
        <li>
          <a
            href={item.href}
            on:click={handleNavClick}
            class="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
            >{item.name}</a
          >
        </li>
      {/each}
    </ul>
    <!-- Mobile Dropdown -->
    {#if showMenu}
      <ul class="absolute top-full left-0 w-full bg-white/95 shadow-lg rounded-2xl mt-2 flex flex-col items-center py-4 space-y-2 md:hidden pointer-events-auto animate-fade-in-out" class:open={menuOpen} class:close={!menuOpen}>
        {#each navItems as item}
          <li>
            <a
              href={item.href}
              on:click={handleNavClick}
              class="block w-full text-center text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
              >{item.name}</a
            >
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</nav>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: none; }
}
@keyframes fade-out {
  from { opacity: 1; transform: none; }
  to { opacity: 0; transform: translateY(-12px); }
}
.animate-fade-in-out.open {
  animation: fade-in 0.2s cubic-bezier(0.4,0,0.2,1) both;
}
.animate-fade-in-out.close {
  animation: fade-out 0.2s cubic-bezier(0.4,0,0.2,1) both;
}
nav {
  /* Remove default box-shadow, handled by Tailwind */
}
</style> 