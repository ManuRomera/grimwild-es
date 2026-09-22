<template>
	<div class="grimwild-vue gw-sheet gw-itemsheet standard-form">
		<div class="gw-itemsheet__layout gw-scroll">
			<ItemHeader :context="context" />
			<Tabs :tabs="tabs" />
			<div class="gw-panels">
				<Tab :tab="tabs.description" :tabs="tabs">
					<ItemDescription :context="context" />
					<section v-if="context.system?.notes" class="gw-prose">
						<h3 class="gw-heading">{{ t('GRIMWILD.UI.notes') }}</h3>
						<div class="gw-field">
							<label :for="`${uid}-notes-label`" class="gw-label">{{ t('GRIMWILD.UI.label') }}</label>
							<input type="text" :id="`${uid}-notes-label`" name="system.notes.label" v-model="context.system.notes.label"
								:disabled="!context.editable" />
						</div>
						<Prosemirror :editable="context.editable" :field="context.editors['system.notes.description']" />
					</section>
				</Tab>
				<Tab :tab="tabs.attributes" :tabs="tabs">
					<ArcanaDetails v-if="context.item.type === 'arcana'" :context="context" />
					<ItemAttributes :context="context" />
				</Tab>
			</div>
		</div>
	</div>
</template>

<script setup>
import { inject, toRaw } from 'vue';
import { Tabs, Tab, ItemHeader, ItemDescription, ItemAttributes, Prosemirror, ArcanaDetails } from '@/components';
import { t } from '@/composables/ui.mjs';

const props = defineProps(['context']);
const uid = inject('sheet')?.id ?? 'grimwild';
const tabs = toRaw(props.context.tabs).primary;
</script>
