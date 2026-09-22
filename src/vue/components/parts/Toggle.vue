<template>
	<!-- On/off state shown with icon, text and shape; a real checkbox underneath for the form. -->
	<label class="gw-toggle" :class="[`gw-toggle--${kind}`, { on: modelValue }]" :data-ayuda="ayuda">
		<input type="checkbox" class="visually-hidden" :name="name" :checked="modelValue"
			@change="emit('update:modelValue', $event.target.checked)"
		/>
		<i :class="[modelValue ? 'fa-solid' : 'fa-regular', icon]" inert></i>
		<span class="gw-toggle__text">{{ label }}</span>
		<i v-if="modelValue" class="fa-solid fa-check gw-toggle__check" inert></i>
	</label>
</template>

<script setup>
defineProps(['modelValue', 'name', 'label', 'icon', 'kind', 'ayuda']);
const emit = defineEmits(['update:modelValue']);
</script>
