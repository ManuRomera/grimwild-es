<template>
	<section class="gw-traits" :data-ayuda="ayuda">
		<h3 class="gw-label">{{ title }}</h3>
		<ul class="gw-traits__list">
			<li v-for="(entry, i) in context.system[field]" :key="i" class="gw-trait" :class="entry.are ? 'is' : 'isnt'">
				<label class="gw-trait__state" :data-tooltip="`${yes} / ${no}`">
					<input type="checkbox" class="visually-hidden" :name="`system.${field}.${i}.are`" v-model="entry.are"
						:disabled="!context.editable" />
					<i :class="['fa-solid', entry.are ? 'fa-check' : 'fa-xmark']" inert></i>
					<span>{{ entry.are ? yes : no }}</span>
				</label>
				<input type="text" class="gw-trait__value" :name="`system.${field}.${i}.value`" v-model="entry.value"
					:list="`${uid}-${field}`" :aria-label="`${title} ${i + 1} (${entry.are ? yes : no})`"
					:disabled="!context.editable" />
			</li>
		</ul>
		<datalist :id="`${uid}-${field}`">
			<option v-for="(label, key) in options" :key="key" :value="t(label)"></option>
		</datalist>
	</section>
</template>

<script setup>
import { inject } from 'vue';
import { t } from '@/composables/ui.mjs';
defineProps(['context', 'field', 'title', 'yes', 'no', 'options', 'ayuda']);
const uid = inject('sheet')?.id ?? 'grimwild';
</script>
