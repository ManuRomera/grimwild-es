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
	</div>
</template>

<script setup>
import { EntryList } from '@/components';
import { t } from '@/composables/ui.mjs';
defineProps(['context']);
</script>
