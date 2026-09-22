<template>
	<aside class="gw-id">
		<div class="gw-id__top">
			<button type="button" class="gw-portrait" data-action="onEditImage"
				:aria-label="t('GRIMWILD.UI.editPortrait')" :disabled="!context.editable"
			><img :src="context.actor.img" data-edit="img" :alt="context.actor.name" /></button>
			<div class="gw-id__who">
				<input type="text" class="gw-id__name" name="name" v-model="context.actor.name"
					:aria-label="t('Name')" :placeholder="t('Name')" :disabled="!context.editable" />
				<div class="gw-id__path">
					<input type="text" name="system.path" v-model="context.system.path" :list="`${uid}-paths`"
						:aria-label="t('GRIMWILD.Actor.Character.FIELDS.path.label')"
						:placeholder="t('GRIMWILD.Actor.Character.FIELDS.path.label')" :disabled="!context.editable" />
					<datalist :id="`${uid}-paths`"><option v-for="p in paths" :key="p" :value="p"></option></datalist>
				</div>
				<div class="gw-id__level" data-ayuda="xp">
					<span class="gw-level">{{ t('GRIMWILD.Actor.Character.FIELDS.level.label') }} <strong>{{ context.system.level }}</strong></span>
					<span class="gw-xp-count">{{ context.system.xp.value }} {{ t('GRIMWILD.Actor.Character.FIELDS.xp.short') }}</span>
				</div>
			</div>
		</div>

		<!-- XP: one row of pips per level -->
		<div class="gw-xp" role="group" :aria-label="t('GRIMWILD.Actor.Character.FIELDS.xp.label')">
			<div v-for="(level, levelKey) in xpArray" :key="levelKey" class="gw-xp__row">
				<button v-for="xp in level" :key="xp" type="button" class="gw-xp__pip"
					:class="xpClass(xp)" role="checkbox" :aria-checked="String(xpClass(xp) !== 'empty')"
					:aria-label="`${t('GRIMWILD.Actor.Character.FIELDS.xp.short')} ${xp}`"
					data-action="changeXp" :data-level="levelKey + 1" :data-xp="xp"
					:disabled="!context.editable"
				></button>
			</div>
		</div>

		<div class="gw-id__lists">
			<TraitList :context="context" field="traits" ayuda="traits"
				:title="t('GRIMWILD.Actor.Character.FIELDS.traits.label')"
				:yes="t('GRIMWILD.UI.traitIs')" :no="t('GRIMWILD.UI.traitIsNot')"
				:options="CONFIG.GRIMWILD.traits" />
			<TraitList :context="context" field="desires" ayuda="desires"
				:title="t('GRIMWILD.Actor.Character.FIELDS.desires.label')"
				:yes="t('GRIMWILD.UI.wants')" :no="t('GRIMWILD.UI.doesNotWant')"
				:options="CONFIG.GRIMWILD.desires" />
		</div>
	</aside>
</template>

<script setup>
import { computed, inject } from 'vue';
import TraitList from './TraitList.vue';
import { t } from '@/composables/ui.mjs';

const props = defineProps(['context']);
const actor = inject('rawDocument');
const uid = inject('sheet')?.id ?? 'grimwild';

// Path suggestions: folder names of the talents compendium (in its installed language).
const paths = computed(() => (game.packs.get('grimwild.talents')?.folders.contents ?? []).map((f) => f.name).sort((a, b) => a.localeCompare(b)));

const slowXp = game.settings.get('grimwild', 'slowXp');
const xpArray = computed(() => actor.system.xp.steps.map((row) => (slowXp ? row.map((xp) => xp * 2) : row)));

function xpClass(xp) {
	const value = props.context.system.xp.value;
	if (value >= xp) return 'full';
	if (slowXp && value === xp - 1) return 'half';
	return 'empty';
}
</script>
