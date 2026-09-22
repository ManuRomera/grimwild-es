<template>
	<section class="gw-desires">
		<h3 class="gw-heading">{{ t('GRIMWILD.Actor.Character.FIELDS.desires.label') }}</h3>
		<div class="gw-desire gw-desire--want">
			<span class="gw-desire__label"><i class="fa-solid fa-heart" inert></i> {{ t('GRIMWILD.UI.wants') }}</span>
			<input type="text" name="system.desires.0.value" v-model="context.system.desires[0].value"
				:aria-label="t('GRIMWILD.UI.wants')" :disabled="!context.editable" />
		</div>
		<div class="gw-desire gw-desire--avoid">
			<span class="gw-desire__label"><i class="fa-solid fa-heart-crack" inert></i> {{ t('GRIMWILD.UI.doesNotWant') }}</span>
			<input type="text" name="system.desires.1.value" v-model="context.system.desires[1].value"
				:aria-label="t('GRIMWILD.UI.doesNotWant')" :disabled="!context.editable" />
		</div>
	</section>
</template>

<script setup>
import { t } from '@/composables/ui.mjs';
defineProps(['context']);
</script>
