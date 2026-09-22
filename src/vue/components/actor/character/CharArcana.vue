<template>
	<ItemRows :context="context" type="arcana" pack="grimwild.arcana"
		:title="t('GRIMWILD.Actor.Tabs.Arcana')" :empty="t('GRIMWILD.UI.noArcana')">
		<template #details="{ item }">
			<p class="gw-arcana__meta">
				<span class="gw-tag">{{ t(`GRIMWILD.UI.${item.system.tier || 'minor'}Arcana`) }}</span>
				<span v-if="item.system.touchstones" class="gw-arcana__touch">
					<strong>{{ t('GRIMWILD.Item.Arcana.FIELDS.touchstones.label') }}:</strong> <em>{{ item.system.touchstones }}</em>
				</span>
			</p>
			<div v-if="item.system.limitations" class="gw-arcana__limits">
				<strong>{{ t('GRIMWILD.Item.Arcana.FIELDS.limitations.label') }}:</strong>
				<div v-html="context.editors[`items.${item._id}.system.limitations`]?.enriched"></div>
			</div>
		</template>
	</ItemRows>
</template>

<script setup>
import { ItemRows } from '@/components';
import { t } from '@/composables/ui.mjs';
defineProps(['context']);
</script>
