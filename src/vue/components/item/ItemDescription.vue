<template>
	<section class="gw-prose">
		<h3 class="gw-heading">{{ context.systemFields.description.label }}</h3>
		<Prosemirror :editable="context.editable" :field="context.editors['system.description']" />
	</section>
</template>

<script setup>
import { Prosemirror } from '@/components';
defineProps(['item', 'context']);
</script>
