<template>
	<section class="gw-prose">
		<h3 class="gw-heading">{{ t('GRIMWILD.UI.details') }}</h3>
		<div class="gw-field">
			<label :for="`${uid}-tier`" class="gw-label">{{ context.systemFields.tier.label }}</label>
			<select :id="`${uid}-tier`" name="system.tier" v-model="context.system.tier" :disabled="!context.editable">
				<option v-for="tier in ['minor', 'major', 'mythic']" :key="tier" :value="tier">{{ t(`GRIMWILD.UI.${tier}Arcana`) }}</option>
			</select>
		</div>
		<div class="gw-field">
			<label :for="`${uid}-touchstones`" class="gw-label">{{ context.systemFields.touchstones.label }}</label>
			<input type="text" :id="`${uid}-touchstones`" name="system.touchstones" v-model="context.system.touchstones"
				:disabled="!context.editable" />
		</div>
		<div class="gw-field gw-field--stacked">
			<span class="gw-label">{{ context.systemFields.limitations.label }}</span>
			<Prosemirror :editable="context.editable" :field="context.editors['system.limitations']" />
		</div>
	</section>
</template>

<script setup>
import { inject } from 'vue';
import { Prosemirror } from '@/components';
import { t } from '@/composables/ui.mjs';
defineProps(['context']);
const uid = inject('sheet')?.id ?? 'grimwild';
</script>
