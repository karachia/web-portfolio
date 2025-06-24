<script lang="ts">
	import { onMount } from 'svelte';
	import MusicItem from '$lib/components/MusicItem.svelte';
	import SortToggle from '$lib/components/SortToggle.svelte';
	import CategorySection from '$lib/components/CategorySection.svelte';
	import ExpandableSearch from '$lib/components/ExpandableSearch.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FilterButton from '$lib/components/FilterButton.svelte';

	let music: any[] = [];
	let sortMode: 'chronological' | 'category' = 'chronological';
	let expandedCategories: { [key: string]: boolean } = {};
	let searchQuery = '';
	let prevExpandedCategories: { [key: string]: boolean } = {};
	let filterActive = false;

	onMount(async () => {
		const response = await fetch('/data/music.json');
		music = await response.json();
		// Initialize expanded state for all categories
		const categories = [...new Set(music.map(item => item.category))];
		categories.forEach(category => {
			expandedCategories[category] = true;
		});
	});

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

	// Extract options from music data
	$: categories = Array.from(new Set(music.map(item => item.category)));
	$: subcategories = Object.fromEntries(categories.map(cat => [cat, Array.from(new Set(music.filter(item => item.category === cat).map(item => item.subcategory)))]));
	$: tags = Array.from(new Set(music.flatMap(item => item.tags || [])));

	// Filtered music by search query only
	$: filteredMusic = music.filter(item => {
		const matchesSearch =
			!searchQuery ||
			item.title.toLowerCase().includes(searchQuery) ||
			(item.for && item.for.toLowerCase().includes(searchQuery));
		return matchesSearch;
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
		'Large Ensemble': ['Orchestra', 'Chamber Orchestra', 'Mixed Ensemble', 'Wind Symphony'],
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
</script>

<svelte:head>
	<title>Music Catalog - Sina Karachiani</title>
	<meta name="description" content="Explore the complete music catalog of compositions by Sina Karachiani" />
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
	<div class="mx-auto max-w-4xl px-4 mt-12">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Music Catalog</h1>
		</div>

		<!-- Controls Row -->
		<div class="flex items-center justify-center gap-4 mb-8">
			<FilterButton active={filterActive} on:click={handleFilterButtonClick} />
			<SortToggle {sortMode} onToggle={handleSortToggle} />
			<ExpandableSearch on:search={handleSearch} />
		</div>

		<!-- Music Items -->
		{#if sortMode === 'chronological'}
			<div class="w-full flex flex-col items-center space-y-8 mt-12">
				{#each chronologicalMusic as item}
					<MusicItem {item} />
				{/each}
			</div>
		{:else}
			<div class="w-full mt-12">
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
</div>

<Footer /> 