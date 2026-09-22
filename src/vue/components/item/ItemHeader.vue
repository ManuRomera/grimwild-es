<template>
	<header class="gw-mhead gw-ihead">
		<button type="button" class="gw-portrait gw-portrait--item" data-action="onEditImage"
			:aria-label="t('GRIMWILD.UI.editPortrait')" :disabled="!context.editable"
		><img :src="context.item.img" data-edit="img" :alt="context.item.name" /></button>
		<div class="gw-mhead__main">
			<input type="text" class="gw-mhead__name" name="name" v-model="context.item.name"
				:placeholder="t('Name')" :aria-label="t('Name')" :disabled="!context.editable" />
			<div class="gw-mhead__meta">
				<span class="gw-tag">{{ t(`TYPES.Item.${context.item.type}`) }}</span>
				<template v-if="context.item.type === 'challenge'">
					<div class="gw-mhead__pool" data-ayuda="challenge">
						<span class="gw-label">{{ context.systemFields.pool.label }}</span>
						<RollPoolInput field="pool" :pool="context.system.pool" :label="context.item.name" min="0" />
					</div>
					<div class="gw-mhead__pool">
						<span class="gw-label">{{ context.systemFields.suspense.label }}</span>
						<Pips :steps="context.system.suspense.steps" name="system.suspense.steps" kind="suspense" ayuda="suspense"
							icon="fa-solid fa-hourglass-half" :label="context.systemFields.suspense.label" />
					</div>
				</template>
			</div>
		</div>
	</header>
</template>

<script setup>
import { RollPoolInput, Pips } from '@/components';
import { t } from '@/composables/ui.mjs';
defineProps(['context']);
</script>
