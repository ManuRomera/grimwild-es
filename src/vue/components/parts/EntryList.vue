<template>
	<!-- Editable list of short strings (traits, moves) with add/remove. -->
	<section class="gw-entries" :class="`gw-entries--${kind}`">
		<header class="gw-section-head">
			<h3 class="gw-heading">{{ title }}</h3>
			<button v-if="context.editable" type="button" class="gw-icon-button"
				data-action="createArrayEntry" :data-field="field" :aria-label="add" :data-tooltip="add"
			><i class="fa-solid fa-plus" inert></i></button>
		</header>
		<ul class="gw-entries__list">
			<li v-for="(entry, key) in context.system[field]" :key="key" class="gw-entry">
				<i :class="['fa-solid', icon, 'gw-entry__bullet']" inert></i>
				<input type="text" :name="`system.${field}.${key}`" v-model="context.system[field][key]"
					:placeholder="placeholder" :aria-label="`${title} ${key + 1}`" :disabled="!context.editable" />
				<button v-if="context.editable" type="button" class="gw-icon-button gw-danger"
					data-action="deleteArrayEntry" :data-field="field" :data-key="key" :aria-label="remove" :data-tooltip="remove"
				><i class="fa-solid fa-xmark" inert></i></button>
			</li>
		</ul>
	</section>
</template>

<script setup>
defineProps(['context', 'field', 'kind', 'icon', 'title', 'add', 'remove', 'placeholder']);
</script>
