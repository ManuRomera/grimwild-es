<template>
	<div v-show="active === tab.key" class="gw-panel" :class="`gw-panel--${tab.key}`"
		role="tabpanel" tabindex="-1"
		:id="`${uid}-panel-${tab.key}`"
		:aria-labelledby="`${uid}-tab-${tab.key}`"
	>
		<slot></slot>
	</div>
</template>

<script setup>
import { useTabs } from '@/composables/tabs.mjs';
const props = defineProps(['tab', 'tabs']);
const { uid, active } = useTabs(props.tabs);
</script>
