<template>
	<ItemRows :context="context" type="talent" pack="grimwild.talents"
		:title="t('GRIMWILD.Actor.Tabs.Talents')" :empty="t('GRIMWILD.UI.noTalents')" />
</template>

<script setup>
import { ItemRows } from '@/components';
import { t } from '@/composables/ui.mjs';
defineProps(['context']);
</script>
