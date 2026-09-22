<template>
	<div class="gw-stat" :class="[`gw-stat--${stat}`, { marked: data.marked }]">
		<!-- The whole card rolls (stretched button); value and mark sit above it. -->
		<button type="button" class="gw-stat__roll"
			data-action="roll" data-roll-type="stat" :data-stat="stat"
			:aria-label="t('GRIMWILD.UI.rollStat', { stat: label })"
			data-ayuda="stat"
		>
			<span class="gw-stat__name">{{ compact ? abbr : label }}</span>
			<i class="fa-solid fa-dice-d6 gw-stat__dice" inert></i>
		</button>
		<input type="number" class="gw-stat__value"
			:name="`system.stats.${stat}.value`"
			v-model="data.value"
			:min="field.fields.value.min"
			:max="field.fields.value.max"
			:aria-label="label"
			:disabled="!editable"
		/>
		<label class="gw-mark" :class="{ on: data.marked }" data-ayuda="mark"
			:data-tooltip="t('GRIMWILD.Damage.marked')"
		>
			<input type="checkbox" class="visually-hidden"
				:name="`system.stats.${stat}.marked`"
				v-model="data.marked"
				:disabled="!editable"
			/>
			<i :class="[data.marked ? 'fa-solid' : 'fa-regular', 'fa-bookmark']" inert></i>
			<span class="gw-mark__text">{{ data.marked ? t('GRIMWILD.Damage.marked') : t('GRIMWILD.UI.mark') }}</span>
		</label>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { t } from '@/composables/ui.mjs';

const props = defineProps(['context', 'stat', 'compact']);
const data = computed(() => props.context.system.stats[props.stat]);
const field = computed(() => props.context.systemFields.stats.fields[props.stat]);
const label = computed(() => t(`GRIMWILD.Stat.${props.stat}.long`));
const abbr = computed(() => t(`GRIMWILD.Stat.${props.stat}.abbr`));
const editable = computed(() => props.context.editable);
</script>
