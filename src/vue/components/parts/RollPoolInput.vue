<template>
	<div class="gw-pool" data-ayuda="pool">
		<button type="button" class="gw-pool__roll"
			:data-action="buttonAction ?? 'rollPool'"
			:data-roll-type="buttonRollType"
			:data-item-id="itemId"
			:data-field="field"
			:data-key="fieldKey"
			:aria-label="ariaLabel"
			:data-tooltip="buttonLabel ? null : ariaLabel"
			:disabled="!(pool?.diceNum > 0)"
		><i class="fa-solid fa-dice-d6" inert></i><span v-if="buttonLabel">{{ buttonLabel }}</span></button>
		<span v-if="noInput" class="gw-pool__value">{{ pool?.diceNum ?? 0 }}d</span>
		<template v-else>
			<input type="number" class="gw-pool__input"
				:data-action-change="inputAction"
				:data-item-id="itemId"
				:name="inputName"
				:value="pool?.diceNum ?? 0"
				:min="min ?? 0"
				:max="max || null"
				:aria-label="t('GRIMWILD.UI.poolDice')"
			/>
			<span class="gw-pool__suffix">{{ suffix ?? 'd' }}</span>
		</template>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { t } from '@/composables/ui.mjs';

const props = defineProps([
	'buttonAction', 'buttonRollType', 'buttonLabel', 'inputAction',
	'field', 'fieldKey', 'fieldName', 'noInput', 'itemId', 'pool', 'min', 'max', 'suffix', 'label'
]);

const inputName = computed(() => props.fieldName ?? (props.field ? `system.${props.field}.diceNum` : null));
const ariaLabel = computed(() => t('GRIMWILD.UI.rollPool', { name: props.label ?? props.buttonLabel ?? '', dice: props.pool?.diceNum ?? 0 }).trim());
</script>
