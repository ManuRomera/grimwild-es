<template>
	<div class="grimwild-vue gw-sheet gw-char standard-form" :class="{ 'is-compact': ui?.compacto }">
		<CharCompact v-if="ui?.compacto" :context="context" />
		<div v-else class="gw-char__layout gw-scroll">
			<CharIdentity :context="context" />
			<div class="gw-char__main">
				<CharPlay :context="context" />
				<Tabs :tabs="tabs" />
				<div class="gw-panels">
					<Tab :tab="tabs.details" :tabs="tabs">
						<CharDetails :context="context" />
					</Tab>
					<Tab :tab="tabs.talents" :tabs="tabs">
						<CharTalents :context="context" />
					</Tab>
					<Tab :tab="tabs.arcana" :tabs="tabs">
						<CharArcana :context="context" />
					</Tab>
					<Tab :tab="tabs.biography" :tabs="tabs">
						<section class="gw-prose">
							<h3 class="gw-heading">{{ context.systemFields.biography.label }}</h3>
							<Prosemirror :editable="context.editable" :field="context.editors['system.biography']" />
						</section>
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
	</div>
</template>

<script setup>
import { inject, toRaw } from 'vue';
import {
	Tabs, Tab, CharIdentity, CharPlay, CharDetails, CharTalents, CharArcana, CharCompact, Prosemirror
} from '@/components';

const props = defineProps(['context']);
const ui = inject('ui');
// Tabs are fixed for the life of the sheet.
const tabs = toRaw(props.context.tabs).primary;
</script>
