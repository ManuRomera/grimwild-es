<template>
	<nav class="gw-tabs" :class="{ 'is-open': menuOpen }">
		<!-- Narrow widths: the tab list collapses into a menu. -->
		<button type="button" class="gw-tabs__menu"
			:aria-expanded="String(menuOpen)"
			:aria-controls="`${uid}-tablist`"
			@click="menuOpen = !menuOpen"
		>
			<i class="fa-solid fa-bars" inert></i>
			<span>{{ tabs[active]?.label }}</span>
			<i class="fa-solid fa-chevron-down gw-tabs__chev" inert></i>
		</button>
		<div class="gw-tabs__list" role="tablist" :id="`${uid}-tablist`" @keydown="onKey">
			<button v-for="tab in visibleTabs" :key="tab.key"
				type="button" role="tab" class="gw-tab"
				:class="{ active: tab.key === active }"
				:id="`${uid}-tab-${tab.key}`"
				:aria-selected="String(tab.key === active)"
				:aria-controls="`${uid}-panel-${tab.key}`"
				:tabindex="tab.key === active ? 0 : -1"
				:data-tab="tab.key"
				@click="select(tab.key)"
			>
				<i v-if="tab.icon" :class="tab.icon" inert></i>
				<span class="gw-tab__label">{{ tab.label }}</span>
			</button>
		</div>
	</nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useTabs } from '@/composables/tabs.mjs';

const props = defineProps(['tabs']);
const { uid, active, select: setActive } = useTabs(props.tabs);
const menuOpen = ref(false);
const visibleTabs = computed(() => Object.values(props.tabs).filter((t) => !t.hidden));

function select(key) {
	setActive(key);
	menuOpen.value = false;
}

// Arrow keys / Home / End move between tabs (WAI-ARIA tabs pattern, automatic activation).
function onKey(event) {
	const keys = visibleTabs.value.map((t) => t.key);
	let i = keys.indexOf(active.value);
	switch (event.key) {
		case 'ArrowRight': case 'ArrowDown': i = (i + 1) % keys.length; break;
		case 'ArrowLeft': case 'ArrowUp': i = (i - 1 + keys.length) % keys.length; break;
		case 'Home': i = 0; break;
		case 'End': i = keys.length - 1; break;
		default: return;
	}
	event.preventDefault();
	select(keys[i]);
	event.currentTarget.querySelector(`[data-tab="${keys[i]}"]`)?.focus();
}
</script>
