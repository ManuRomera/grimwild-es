<template>
	<!-- Bloodied / Rattled / Dropped. Optional homebrew harm pools under Bloodied and Rattled. -->
	<div class="gw-harms" :class="{ compact }">
		<div class="gw-harm-wrap">
			<Toggle kind="bloodied" icon="fa-droplet" ayuda="bloodied"
				name="system.bloodied.marked"
				:label="t('GRIMWILD.Damage.bloodied')"
				v-model="context.system.bloodied.marked"
			/>
			<RollPoolInput v-if="context.enableHarm && !compact"
				field="bloodied" field-name="system.bloodied.pool.diceNum"
				:label="t('GRIMWILD.Damage.bloodied')"
				:pool="context.system.bloodied.pool" min="0" :max="context.maxBloodied"
				:suffix="context.maxBloodied ? `/ ${context.maxBloodied}` : 'd'"
			/>
		</div>
		<div class="gw-harm-wrap">
			<Toggle kind="rattled" icon="fa-brain" ayuda="rattled"
				name="system.rattled.marked"
				:label="t('GRIMWILD.Damage.rattled')"
				v-model="context.system.rattled.marked"
			/>
			<RollPoolInput v-if="context.enableHarm && !compact"
				field="rattled" field-name="system.rattled.pool.diceNum"
				:label="t('GRIMWILD.Damage.rattled')"
				:pool="context.system.rattled.pool" min="0" :max="context.maxRattled"
				:suffix="context.maxRattled ? `/ ${context.maxRattled}` : 'd'"
			/>
		</div>
		<div class="gw-harm-wrap">
			<Toggle kind="dropped" icon="fa-skull" ayuda="dropped"
				name="system.dropped"
				:label="t('GRIMWILD.Damage.dropped')"
				v-model="context.system.dropped"
			/>
		</div>
	</div>
</template>

<script setup>
import Toggle from './Toggle.vue';
import RollPoolInput from './RollPoolInput.vue';
import { t } from '@/composables/ui.mjs';
defineProps(['context', 'compact']);
</script>
