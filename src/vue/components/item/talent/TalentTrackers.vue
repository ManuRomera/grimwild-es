<template>
	<section class="gw-trackers-edit">
		<header class="gw-section-head">
			<h3 class="gw-heading">{{ context.systemFields.trackers.label }}</h3>
			<button v-if="context.editable" type="button" class="gw-button" data-action="createTracker">
				<i class="fa-solid fa-plus" inert></i><span>{{ t('GRIMWILD.UI.addTracker') }}</span>
			</button>
		</header>
		<p v-if="!context.system.trackers.length" class="gw-empty">{{ t('GRIMWILD.UI.noTrackers') }}</p>
		<ul class="gw-cards">
			<li v-for="(tracker, key) in context.system.trackers" :key="key" class="gw-tracker-edit">
				<div class="gw-field">
					<label :for="`${uid}-tr-${key}-label`" class="gw-label">{{ t('GRIMWILD.UI.label') }}</label>
					<input type="text" :id="`${uid}-tr-${key}-label`" :name="`system.trackers.${key}.label`" v-model="tracker.label" />
				</div>
				<div class="gw-field">
					<label :for="`${uid}-tr-${key}-type`" class="gw-label">{{ t('GRIMWILD.UI.type') }}</label>
					<select :id="`${uid}-tr-${key}-type`" :name="`system.trackers.${key}.type`" v-model="tracker.type">
						<option value="pool">{{ t('GRIMWILD.UI.pool') }}</option>
						<option value="points">{{ t('GRIMWILD.Resources.points') }}</option>
					</select>
				</div>
				<label v-if="tracker.type === 'pool'" class="gw-field gw-field--check" data-ayuda="powerPool">
					<input type="checkbox" :name="`system.trackers.${key}.pool.powerPool`" v-model="tracker.pool.powerPool" />
					<span class="gw-label">{{ t('GRIMWILD.UI.powerPool') }}</span>
				</label>
				<div class="gw-field">
					<label :for="`${uid}-tr-${key}-value`" class="gw-label">{{ t('GRIMWILD.UI.value') }}</label>
					<input v-if="tracker.type === 'pool'" type="number" :id="`${uid}-tr-${key}-value`"
						:name="`system.trackers.${key}.pool.diceNum`" v-model="tracker.pool.diceNum"
						min="0" :max="tracker.pool.max > 0 ? tracker.pool.max : null" />
					<input v-else type="number" :id="`${uid}-tr-${key}-value`"
						:name="`system.trackers.${key}.points.value`" v-model="tracker.points.value"
						min="0" :max="tracker.points.max" />
				</div>
				<div class="gw-field">
					<label :for="`${uid}-tr-${key}-max`" class="gw-label">{{ t('GRIMWILD.UI.max') }}</label>
					<input type="number" :id="`${uid}-tr-${key}-max`" :name="`system.trackers.${key}.${tracker.type}.max`"
						min="1" v-model="tracker[tracker.type].max" />
				</div>
				<div v-if="tracker.type === 'points'" class="gw-field">
					<label :for="`${uid}-tr-${key}-steps`" class="gw-label">{{ t('GRIMWILD.UI.display') }}</label>
					<select :id="`${uid}-tr-${key}-steps`" :name="`system.trackers.${key}.points.showSteps`" v-model="tracker.points.showSteps">
						<option :value="false">{{ t('GRIMWILD.UI.number') }}</option>
						<option :value="true">{{ t('GRIMWILD.UI.checkboxes') }}</option>
					</select>
				</div>
				<button type="button" class="gw-icon-button gw-danger gw-tracker-edit__delete" data-action="deleteTracker" :data-key="key"
					:aria-label="t('GRIMWILD.UI.deletePool')" :data-tooltip="t('GRIMWILD.UI.deletePool')"
				><i class="fa-solid fa-trash" inert></i></button>
			</li>
		</ul>
	</section>
</template>

<script setup>
import { inject } from 'vue';
import { t } from '@/composables/ui.mjs';
defineProps(['context']);
const uid = inject('sheet')?.id ?? 'grimwild';
</script>
