<template>
	<div class="gw-tracker" :class="`gw-tracker--${tracker.type}`">
		<!-- Pool: roll button + dice count -->
		<template v-if="tracker.type === 'pool'">
			<button type="button" class="gw-tracker__roll"
				data-action="rollPool" :data-item-id="itemId" :data-key="index"
				:aria-label="t('GRIMWILD.UI.rollPool', { name: tracker.label ?? '', dice: tracker.pool.diceNum })"
				:disabled="!(tracker.pool.diceNum > 0)"
				:data-ayuda="tracker.pool.powerPool ? 'powerPool' : 'pool'"
			><i class="fa-solid fa-dice-d6" inert></i><span v-if="tracker.label">{{ tracker.label }}</span></button>
			<span class="gw-tracker__num">
				<input type="number"
					data-action-change="updateItemTracker"
					:data-item-id="itemId" :data-tracker-key="index"
					:value="tracker.pool.diceNum" min="0"
					:max="tracker.pool.max > 0 ? tracker.pool.max : null"
					:aria-label="`${tracker.label ?? ''} (${t('GRIMWILD.UI.poolDice')})`"
					:disabled="!editable"
				/><span aria-hidden="true">d</span>
			</span>
		</template>
		<!-- Points: pips or number -->
		<template v-else>
			<span v-if="tracker.label" class="gw-tracker__label">{{ tracker.label }}</span>
			<span v-if="tracker.points.showSteps" class="gw-tracker__pips" role="group" :aria-label="tracker.label">
				<button v-for="num in Number(tracker.points.max)" :key="num" type="button"
					class="gw-point" :class="{ on: tracker.points.value >= num }"
					role="checkbox" :aria-checked="String(tracker.points.value >= num)"
					:aria-label="`${tracker.label ?? ''} ${num}`"
					data-action="updateItemTracker"
					:data-item-id="itemId" :data-tracker-key="index"
					:data-value="num" :data-tracker-value="tracker.points.value"
					:disabled="!editable"
				></button>
			</span>
			<span v-else class="gw-tracker__num">
				<input type="number"
					data-action-change="updateItemTracker"
					:data-item-id="itemId" :data-tracker-key="index"
					:value="tracker.points.value" min="0" :max="tracker.points.max"
					:aria-label="tracker.label"
					:disabled="!editable"
				/><span aria-hidden="true">/ {{ tracker.points.max }}</span>
			</span>
		</template>
	</div>
</template>

<script setup>
import { t } from '@/composables/ui.mjs';
defineProps(['tracker', 'index', 'itemId', 'editable']);
</script>
