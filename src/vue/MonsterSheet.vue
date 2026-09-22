<template>
	<div class="grimwild-vue gw-sheet gw-monster standard-form">
		<!-- Sensory colour band (monsters only) -->
		<div v-if="isMonster && colors.length" class="gw-colorband" role="list" :aria-label="t('GRIMWILD.UI.colors')">
			<div v-for="(color, i) in colors" :key="i" class="gw-colorband__item" role="listitem">
				<span class="gw-colorband__swatch" :style="{ backgroundColor: color.color }"></span>
				<span v-if="color.name" class="gw-colorband__name">{{ color.name }}</span>
			</div>
		</div>
		<div class="gw-monster__layout gw-scroll">
			<MonsterHeader :context="context" />
			<Tabs :tabs="tabs" />
			<div class="gw-panels">
				<Tab v-if="tabs.biography" :tab="tabs.biography" :tabs="tabs">
					<MonsterBiography :context="context" />
				</Tab>
				<Tab :tab="tabs.moves" :tabs="tabs">
					<MonsterTraitsMoves :context="context" />
					<MonsterDesires v-if="isMonster" :context="context" />
				</Tab>
				<Tab v-if="tabs.tables" :tab="tabs.tables" :tabs="tabs">
					<MonsterTables :context="context" />
				</Tab>
				<Tab :tab="tabs.challenges" :tabs="tabs">
					<MonsterChallenges :context="context" />
				</Tab>
				<Tab :tab="tabs.notes" :tabs="tabs">
					<section class="gw-prose">
						<h3 class="gw-heading">{{ context.systemFields.notes.label }}</h3>
						<Prosemirror :editable="context.editable" :field="context.editors['system.notes']" />
					</section>
				</Tab>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, toRaw } from 'vue';
import {
	Tabs, Tab, MonsterHeader, MonsterChallenges, MonsterBiography, MonsterTables, MonsterTraitsMoves, MonsterDesires,
	Prosemirror
} from '@/components';
import { t } from '@/composables/ui.mjs';

const props = defineProps(['context']);
const tabs = toRaw(props.context.tabs).primary;
const isMonster = computed(() => props.context.actor.type === 'monster');
const colors = computed(() => (props.context.system.sensories?.colors ?? []).filter((c) => c.color));
</script>
