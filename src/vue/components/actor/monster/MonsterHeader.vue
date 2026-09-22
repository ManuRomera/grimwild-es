<template>
	<header class="gw-mhead">
		<button type="button" class="gw-portrait gw-portrait--monster" data-action="onEditImage"
			:aria-label="t('GRIMWILD.UI.editPortrait')" :disabled="!context.editable"
		><img :src="context.actor.img" data-edit="img" :alt="context.actor.name" /></button>
		<div class="gw-mhead__main">
			<input type="text" class="gw-mhead__name" name="name" v-model="context.actor.name"
				:aria-label="t('Name')" :placeholder="t('Name')" :disabled="!context.editable" />
			<div class="gw-mhead__meta">
				<label v-if="isMonster" class="gw-select-chip">
					<span>{{ t('GRIMWILD.Actor.Monster.FIELDS.role.label') }}</span>
					<select name="system.role" v-model="context.system.role" :disabled="!context.editable">
						<option value="">—</option>
						<option v-for="(label, key) in roles" :key="key" :value="key">{{ label }}</option>
					</select>
				</label>
				<label v-if="isMonster" class="gw-select-chip">
					<span>{{ t('GRIMWILD.Item.Arcana.FIELDS.tier.label') }}</span>
					<select name="system.tier" v-model="context.system.tier" :disabled="!context.editable">
						<option v-for="(label, key) in tiers" :key="key" :value="key">{{ label }}</option>
					</select>
				</label>
				<div v-if="showPool" class="gw-mhead__pool" data-ayuda="challenge">
					<span class="gw-label">{{ t('GRIMWILD.UI.challengePool') }}</span>
					<RollPoolInput field="pool" :pool="context.system.pool" :label="context.actor.name" min="0" />
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
import { computed } from 'vue';
import { RollPoolInput } from '@/components';
import { t } from '@/composables/ui.mjs';

const props = defineProps(['context']);
const isMonster = computed(() => props.context.actor.type === 'monster');
const showPool = computed(() => props.context.actor.type === 'linkedChallenge'
	|| (isMonster.value && ['boss', 'elite'].includes(props.context.system.tier)));

const tiers = Object.fromEntries(['mook', 'tough', 'elite', 'boss']
	.map((k) => [k, t(`GRIMWILD.Actor.Monster.Tiers.${k}`)]));
const roles = Object.fromEntries(['blaster', 'brute', 'lurker', 'marauder', 'marksman', 'overseer', 'predator',
	'protector', 'skirmisher', 'swarmer', 'tactician', 'trickster'].map((k) => [k, t(`GRIMWILD.Actor.Monster.Roles.${k}`)]));
</script>
