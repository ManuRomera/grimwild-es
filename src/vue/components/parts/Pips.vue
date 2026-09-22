<template>
	<!-- Two-state resources stored as system.<field>.steps (spark, story, suspense). -->
	<div class="gw-pips" :class="`gw-pips--${kind}`" role="group" :aria-label="label" :data-ayuda="ayuda">
		<label v-for="(step, i) in steps" :key="i" class="gw-pip" :class="{ on: step }"
			:data-tooltip="`${label} ${i + 1}`"
		>
			<input type="checkbox" class="visually-hidden"
				:name="name ? `${name}.${i}` : null"
				:checked="step"
				:data-action-change="changeAction"
				:data-field="changeField"
				:data-key="i"
				:data-item-id="itemId"
			/>
			<i :class="icon" inert></i>
			<span class="visually-hidden">{{ label }} {{ i + 1 }}</span>
		</label>
	</div>
</template>

<script setup>
defineProps(['steps', 'name', 'label', 'icon', 'kind', 'ayuda', 'changeAction', 'changeField', 'itemId']);
</script>
