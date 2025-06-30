<script lang="ts">
	import { onMount } from 'svelte';
	import MusicItem from '$lib/components/MusicItem.svelte';
	import SortToggle from '$lib/components/SortToggle.svelte';
	import CategorySection from '$lib/components/CategorySection.svelte';
	import ExpandableSearch from '$lib/components/ExpandableSearch.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FilterButton from '$lib/components/FilterButton.svelte';
	import RangeSlider from 'svelte-range-slider-pips';
	import { fade, scale } from 'svelte/transition';

	let music: any[] = [];
	let sortMode: 'chronological' | 'category' = 'chronological';
	let expandedCategories: { [key: string]: boolean } = {};
	let searchQuery = '';
	let prevExpandedCategories: { [key: string]: boolean } = {};
	let filterActive = false;
	let selectedCategory = "";
	let mounted = false;

	// Slider state for filter panel
	let sliderMin = 0;
	let sliderMax = 16;
	const sliderMinLimit = 0;
	const sliderMaxLimit = 16;

	onMount(async () => {
		const response = await fetch('/data/music.json');
		music = await response.json();
		// Initialize expanded state for all categories
		const categories = [...new Set(music.map(item => item.category))];
		categories.forEach(category => {
			expandedCategories[category] = true;
		});
	});

	// Set mounted to true after a brief delay to trigger fade-in
	setTimeout(() => {
		mounted = true;
	}, 100);

	function handleSortToggle(mode: 'chronological' | 'category') {
		sortMode = mode;
	}

	function handleCategoryToggle(event: CustomEvent<string>) {
		const category = event.detail;
		expandedCategories[category] = !expandedCategories[category];
		expandedCategories = { ...expandedCategories };
	}

	function handleSearch(e: CustomEvent<string>) {
		const newQuery = e.detail.trim().toLowerCase();
		if (sortMode === 'category') {
			if (newQuery && !searchQuery) {
				// Save previous state and expand all
				prevExpandedCategories = { ...expandedCategories };
				Object.keys(expandedCategories).forEach(cat => expandedCategories[cat] = true);
			} else if (!newQuery && searchQuery) {
				// Restore previous state
				expandedCategories = { ...prevExpandedCategories };
			}
		}
		searchQuery = newQuery;
	}

	function handleFilterButtonClick() {
		filterActive = !filterActive;
	}

	function expandAllCategories() {
		Object.keys(expandedCategories).forEach(cat => expandedCategories[cat] = true);
		expandedCategories = { ...expandedCategories };
	}

	function collapseAllCategories() {
		Object.keys(expandedCategories).forEach(cat => expandedCategories[cat] = false);
		expandedCategories = { ...expandedCategories };
	}

	function handleClearFilters() {
		selectedCategory = "";
		sliderMin = sliderMinLimit;
		sliderMax = sliderMaxLimit;
	}

	function handleCloseFilterPanel() {
		filterActive = false;
	}

	// Extract options from music data
	$: categories = Array.from(new Set(music.map(item => item.category)));
	$: subcategories = Object.fromEntries(categories.map(cat => [cat, Array.from(new Set(music.filter(item => item.category === cat).map(item => item.subcategory)))]));
	$: tags = Array.from(new Set(music.flatMap(item => item.tags || [])));

	// Helper to parse selectedCategory value
	function parseCategorySelection(value: string) {
		if (!value) return { category: '', subcategory: '' };
		const parts = value.split('::');
		return parts.length === 2
			? { category: parts[0], subcategory: parts[1] }
			: { category: value, subcategory: '' };
	}

	// Filtered music by search query, category/subcategory, and duration
	$: filteredMusic = music.filter(item => {
		// Search filter
		const words = searchQuery.split(/\s+/).filter(Boolean);
		const fields = [
			item.title?.toLowerCase() || '',
			(('for ' + item.for) || '').toLowerCase(),
			item.detailed_instrumentation?.toLowerCase() || ''
		];
		const matchesSearch = !searchQuery || words.every(word => fields.some(field => field.includes(word)));

		// Category/subcategory filter
		const { category, subcategory } = parseCategorySelection(selectedCategory);
		const matchesCategory = !category || (
			item.category === category && (!subcategory || item.subcategory === subcategory)
		);

		// Duration filter
		let matchesDuration = true;
		const min = sliderMin;
		const max = sliderMax;

		if (item.length && typeof item.length === 'object') {
			if ('min' in item.length && 'max' in item.length) {
				const itemMin = item.length.min;
				const itemMax = item.length.max;
				const minCheck = min === 16 ? itemMin > 15 : itemMin >= min;
				const maxCheck = max === 16 ? true : itemMax <= max;
				matchesDuration = minCheck && maxCheck;
			} else if ('default' in item.length) {
				const itemDefault = item.length.default;
				const minCheck = min === 16 ? itemDefault > 15 : itemDefault >= min;
				const maxCheck = max === 16 ? true : itemDefault <= max;
				matchesDuration = minCheck && maxCheck;
			}
		}

		return matchesSearch && matchesCategory && matchesDuration;
	});

	// Sort music chronologically (newest first)
	$: chronologicalMusic = [...filteredMusic].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	// Group music by category and subcategory with custom ordering
	const categoryOrder = [
		'Large Ensemble',
		'Chamber', 
		'Solo',
		'Vocal',
		'Open Instrumentation'
	];
	const subcategoryOrder = {
		'Large Ensemble': ['Orchestra', 'Chamber Orchestra', 'Mixed Ensemble', 'Wind Symphony', 'Brass Ensemble'],
		'Chamber': ['Duo', 'Trio', 'Quartet', 'Quintet', 'Sextet', 'Septet'],
		'Solo': ['Piano', 'String', 'Wind', 'Others'],
		'Vocal': ['Choir', 'Voice'],
		'Open Instrumentation': []
	};
	$: categoryMusic = filteredMusic.reduce((acc: { [key: string]: { [key: string]: any[] } }, item) => {
		if (!acc[item.category]) {
			acc[item.category] = {};
		}
		if (!acc[item.category][item.subcategory]) {
			acc[item.category][item.subcategory] = [];
		}
		acc[item.category][item.subcategory].push(item);
		return acc;
	}, {} as { [key: string]: { [key: string]: any[] } });
	$: sortedCategoryMusic = Object.fromEntries(
		categoryOrder
			.filter(category => categoryMusic[category])
			.map(category => [
				category,
				Object.fromEntries(
					subcategoryOrder[category as keyof typeof subcategoryOrder]
						.filter(subcategory => categoryMusic[category][subcategory])
						.map(subcategory => [
							subcategory,
							categoryMusic[category][subcategory]
						])
				)
			])
	);

	function fadeScale(node: Element, params: any) {
		const fadeTrans = fade(node, params);
		const scaleTrans = scale(node, params);
		return {
			css: (t: number) =>
				(fadeTrans.css ? fadeTrans.css(t, 1 - t) : '') + (scaleTrans.css ? scaleTrans.css(t, 1 - t) : '')
		};
	}
</script>

<svelte:head>
	<title>Music Catalog - Sina Karachiani</title>
	<meta name="description" content="Explore the complete music catalog of compositions by Sina Karachiani" />
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
	{#if mounted}
		<div class="mx-auto max-w-4xl px-4 mt-12" in:fade={{ duration: 1200 }}>
			<!-- Header -->
			<div class="mb-12 text-center relative z-[2]">
				<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Music Catalog</h1>
			</div>

			<!-- Controls Row -->
			<div class="flex flex-col md:flex-row md:items-center md:justify-center gap-2 md:gap-4 mb-4">
				<!-- Search bar: always on top on mobile, right on desktop -->
				<div class="w-full md:w-auto md:order-2 mb-2 md:mb-0">
					<!-- Mobile: always expanded -->
					<div class="block md:hidden">
						<ExpandableSearch on:search={handleSearch} alwaysExpanded={true} />
					</div>
					<!-- Desktop: expandable -->
					<div class="hidden md:block">
						<ExpandableSearch on:search={handleSearch} alwaysExpanded={false} />
					</div>
				</div>
				<!-- Filter and Sort controls -->
				<div class="flex flex-row gap-2 md:order-1 justify-center">
					<FilterButton active={filterActive} on:click={handleFilterButtonClick} />
					<SortToggle {sortMode} onToggle={handleSortToggle} />
				</div>
			</div>

			<!-- Filter Panel -->
			{#if filterActive}
				<div in:fade={{ duration: 180 }} out:fade={{ duration: 120 }} class="w-full max-w-2xl mx-auto mb-8 flex flex-col items-center">
					<div in:scale={{ duration: 180, start: 0.96 }} out:scale={{ duration: 120, start: 0.96 }} class="w-full bg-white border border-gray-100 rounded-2xl shadow-lg p-6 pt-2 pb-1 pr-2 grid grid-cols-1 md:grid-cols-2 gap-6">
						<!-- Top Row: Clear and Close -->
						<div class="col-span-2 flex justify-between items-center mt-2 relative">
							<button
								on:click={handleClearFilters}
								class="text-xs font-semibold text-zinc-500 hover:text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-full px-4 py-1 transition-colors"
							>
								Clear All
							</button>
							<button
								on:click={handleCloseFilterPanel}
								class="text-lg text-zinc-400 hover:text-zinc-700 rounded-full px-2 py-1 transition-colors flex items-center justify-center absolute right-0 "
								aria-label="Close filter panel"
							>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1" class="w-8 h-8">
									<line x1="5" y1="5" x2="15" y2="15" stroke-linecap="round" />
									<line x1="15" y1="5" x2="5" y2="15" stroke-linecap="round" />
								</svg>
							</button>
						</div>
						<!-- Category Selector -->
						<div class="flex flex-col gap-2">
							<label class="block text-sm font-semibold text-zinc-600" for="category-dropdown">Category</label>
							<select id="category-dropdown" bind:value={selectedCategory} class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300">
								<option value="">All Categories</option>
								{#each categoryOrder as category}
									<option value={category}>{category}</option>
									{#each subcategoryOrder[category as keyof typeof subcategoryOrder] as subcategory}
										<option value={`${category}::${subcategory}`}> &nbsp; &nbsp; {subcategory}</option>
									{/each}
								{/each}
							</select>
						</div>
						<!-- Range Slider -->
						<div class="flex flex-col ">
							<label class="block text-sm font-semibold text-zinc-600 mb-1">Duration (min)</label>
							<div class="flex justify-between w-full px-1 -mb-1.5">
								<span class="text-xs text-zinc-500 font-semibold ml-1.5">0</span>
								<span class="text-xs text-zinc-500 font-semibold mr-1">15+</span>
							</div>
							<div class="flex items-center justify-center h-full">
								<RangeSlider
									min={sliderMinLimit}
									max={sliderMaxLimit}
									values={[sliderMin, sliderMax]}
									range={true}
									on:input={(e) => {
										let [min, max] = e.detail.values;
										sliderMin = min;
										sliderMax = max;
									}}
									on:change={(e) => { [sliderMin, sliderMax] = e.detail.values; }}
									step={1}
									class="w-full"
									style="--range: #a855f7;"
								/>
							</div>
							<div class="flex justify-center w-full mb-4">
								<span class="text-sm text-semibold text-zinc-600 -mt-1">
									{sliderMin === 16 ? "15+'" : `${sliderMin}'`} - {sliderMax === 16 ? "15+'" : `${sliderMax}'`}
								</span>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<div class="mb-22"></div>

			<!-- Music Items -->
			{#if sortMode === 'chronological'}
				<div class="w-full flex flex-col items-center space-y-8 mt-12">
					{#each chronologicalMusic as item}
						<MusicItem {item} />
					{/each}
				</div>
			{:else}
				<div class="w-full mt-12 relative">
					<!-- Expand/Collapse All Buttons above first category -->
					<div class="absolute right-0 -top-10 z-10">
						<div class="inline-flex rounded-full bg-gray-100 shadow-sm overflow-hidden">
							<button
								on:click={expandAllCategories}
								class="px-4 py-1 text-xs font-medium text-zinc-500 hover:bg-gray-200 focus:outline-none"
								aria-label="Expand all categories"
								style="border-top-left-radius:9999px; border-bottom-left-radius:9999px;"
							>
								Expand All
							</button>
							<div class="w-px bg-gray-200 my-1"></div>
							<button
								on:click={collapseAllCategories}
								class="px-4 py-1 text-xs font-medium text-zinc-500 hover:bg-gray-200 focus:outline-none"
								aria-label="Collapse all categories"
								style="border-top-right-radius:9999px; border-bottom-right-radius:9999px;"
							>
								Collapse All
							</button>
						</div>
					</div>
					{#each Object.entries(sortedCategoryMusic) as [category, subcategories]}
						<CategorySection
							{category}
							{subcategories}
							isExpanded={expandedCategories[category]}
							on:toggle={handleCategoryToggle}
						/>
					{/each}
				</div>
			{/if}
		</div>
	{:else}
		<!-- Placeholder to maintain layout -->
		<div class="mx-auto max-w-4xl px-4 mt-12">
			<div class="h-96"></div>
		</div>
	{/if}
</div>

<Footer /> 