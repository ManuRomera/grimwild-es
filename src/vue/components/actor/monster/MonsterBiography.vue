<template>
	<!-- Sensory details first: they are read aloud at the table. -->
	<section class="gw-senses">
		<h3 class="gw-heading">{{ t('GRIMWILD.UI.sensories') }}</h3>
		<div v-for="sense in senses" :key="sense.key" class="gw-sense">
			<i :class="['fa-solid', sense.icon]" inert></i>
			<label :for="`${uid}-${sense.key}`" class="gw-label">{{ sense.label }}</label>
			<input type="text" :id="`${uid}-${sense.key}`" :name="`system.sensories.${sense.key}`"
				v-model="context.system.sensories[sense.key]" :disabled="!context.editable" />
		</div>
	</section>

	<section class="gw-colors">
		<h3 class="gw-heading">{{ t('GRIMWILD.UI.colors') }}</h3>
		<div class="gw-colors__grid">
			<div v-for="(color, colorKey) in context.system.sensories.colors" :key="colorKey" class="gw-color-edit">
				<div class="gw-color-edit__picker"
					v-html="context.customElements[`system.sensories.colors.${colorKey}.color`].outerHTML"></div>
				<input type="text" :name="`system.sensories.colors.${colorKey}.name`" v-model="color.name"
					:placeholder="t('GRIMWILD.UI.colorName')" :aria-label="t('GRIMWILD.UI.colorName')"
					:disabled="!context.editable" />
			</div>
		</div>
	</section>

	<section class="gw-prose">
		<h3 class="gw-heading">{{ context.systemFields.biography.label }}</h3>
		<Prosemirror :editable="context.editable" :field="context.editors['system.biography']" />
	</section>
</template>

<script setup>
import { inject } from 'vue';
import { Prosemirror } from '@/components';
import { t } from '@/composables/ui.mjs';
defineProps(['context']);
const uid = inject('sheet')?.id ?? 'grimwild';
const senses = [
	{ key: 'sights', icon: 'fa-eye', label: t('GRIMWILD.UI.sights') },
	{ key: 'sounds', icon: 'fa-ear-listen', label: t('GRIMWILD.UI.sounds') },
	{ key: 'smells', icon: 'fa-wind', label: t('GRIMWILD.UI.smells') }
];
</script>
