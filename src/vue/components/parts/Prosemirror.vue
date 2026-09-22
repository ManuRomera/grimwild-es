<template>
	<div class="prose-mirror-wrapper" v-html="editable && field?.element ? field.element.outerHTML : (field?.enriched ?? '')"></div>
</template>

<script setup>
defineProps(['field', 'editable']);
</script>
