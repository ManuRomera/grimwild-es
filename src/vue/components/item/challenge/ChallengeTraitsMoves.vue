<template>
	<div class="gw-lists">
		<EntryList :context="context" field="traits" kind="trait" icon="fa-diamond"
			:title="context.systemFields.traits.label"
			:add="t('GRIMWILD.UI.addTrait')" :remove="t('GRIMWILD.UI.deleteTrait')"
			:placeholder="t('GRIMWILD.UI.traitDescription')" />
		<EntryList :context="context" field="moves" kind="move" icon="fa-caret-right"
			:title="context.systemFields.moves.label"
			:add="t('GRIMWILD.UI.addMove')" :remove="t('GRIMWILD.UI.deleteMove')"
			:placeholder="t('GRIMWILD.UI.moveDescription')" />

		<section class="gw-entries gw-entries--fail">
			<header class="gw-section-head">
				<h3 class="gw-heading">{{ context.systemFields.failure.label }}</h3>
				<button v-if="context.editable" type="button" class="gw-icon-button"
					data-action="createArrayEntry" data-field="failure"
					:aria-label="t('GRIMWILD.UI.addFailureState')" :data-tooltip="t('GRIMWILD.UI.addFailureState')"
				><i class="fa-solid fa-plus" inert></i></button>
			</header>
			<ul class="gw-entries__list">
				<li v-for="(fail, key) in context.system.failure" :key="key" class="gw-entry gw-entry--fail">
					<RollPoolInput field="failure" :field-key="key" :field-name="`system.failure.${key}.pool.diceNum`"
						:pool="fail.pool" :label="fail.value" min="0" />
					<input type="text" :name="`system.failure.${key}.value`" v-model="context.system.failure[key].value"
						:placeholder="t('GRIMWILD.UI.failureDescription')" :aria-label="`${context.systemFields.failure.label} ${key + 1}`"
						:disabled="!context.editable" />
					<button v-if="context.editable" type="button" class="gw-icon-button gw-danger"
						data-action="deleteArrayEntry" data-field="failure" :data-key="key"
						:aria-label="t('GRIMWILD.UI.deleteFail')" :data-tooltip="t('GRIMWILD.UI.deleteFail')"
					><i class="fa-solid fa-xmark" inert></i></button>
				</li>
			</ul>
		</section>
	</div>
</template>

<script setup>
import { RollPoolInput, EntryList } from '@/components';
import { t } from '@/composables/ui.mjs';
defineProps(['context']);
</script>
