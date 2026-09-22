<template>
	<section class="gw-challenges-wrap">
		<header class="gw-section-head">
			<h3 class="gw-heading">{{ t('GRIMWILD.Actor.Tabs.Challenges') }}</h3>
			<button v-if="context.editable" type="button" class="gw-button"
				data-action="createDoc" data-document-class="Item" data-type="challenge"
			><i class="fa-solid fa-plus" inert></i><span>{{ t('GRIMWILD.UI.add') }}</span></button>
		</header>
		<p v-if="!challenges.length" class="gw-empty">{{ t('GRIMWILD.UI.noChallenges') }}</p>
		<ol class="gw-challenges">
			<li v-for="item in challenges" :key="item._id" class="gw-challenge"
				:data-item-id="item._id" data-drag="true" draggable="true" data-document-class="Item"
			>
				<header class="gw-challenge__head">
					<div class="gw-pool gw-pool--challenge" data-ayuda="challenge">
						<button type="button" class="gw-pool__roll" data-action="roll" data-roll-type="item"
							:aria-label="t('GRIMWILD.UI.rollPool', { name: item.name, dice: item.system.pool.diceNum })"
							:disabled="!(item.system.pool.diceNum > 0)"
						><i class="fa-solid fa-dice-d6" inert></i></button>
						<span class="gw-pool__value">{{ item.system.pool.diceNum }}d</span>
					</div>
					<h4 class="gw-challenge__name">{{ item.name }}</h4>
				</header>
				<div class="gw-challenge__bar">
					<div class="gw-challenge__suspense">
						<span class="gw-label">{{ t('GRIMWILD.Resources.suspense') }}</span>
						<Pips :steps="item.system.suspense.steps" kind="suspense" ayuda="suspense"
							icon="fa-solid fa-hourglass-half" :label="t('GRIMWILD.Resources.suspense')"
							change-action="updateItemField" change-field="system.suspense.steps" :item-id="item._id" />
					</div>
					<div class="gw-challenge__controls">
						<button type="button" class="gw-icon-button" data-action="viewDoc"
							:aria-label="t('DOCUMENT.Edit', { type: typeLabel })" :data-tooltip="t('DOCUMENT.Edit', { type: typeLabel })"
						><i class="fa-solid fa-pen-to-square" inert></i></button>
						<button v-if="context.editable" type="button" class="gw-icon-button gw-danger" data-action="deleteDoc"
							:aria-label="t('DOCUMENT.Delete', { type: typeLabel })" :data-tooltip="t('DOCUMENT.Delete', { type: typeLabel })"
						><i class="fa-solid fa-trash" inert></i></button>
					</div>
				</div>
				<div class="gw-challenge__body">
					<div v-if="item.system.description?.length" class="gw-challenge__desc"
						v-html="context.editors[`items.${item._id}.system.description`]?.enriched"></div>
					<ul v-if="item.system.traits.length" class="gw-challenge__traits">
						<li v-for="(trait, i) in item.system.traits" :key="i">{{ trait }}</li>
					</ul>
					<ul v-if="item.system.moves.length" class="gw-challenge__moves">
						<li v-for="(move, i) in item.system.moves" :key="i">{{ move }}</li>
					</ul>
					<ul v-if="item.system.failure.length" class="gw-challenge__fails">
						<li v-for="(fail, i) in item.system.failure" :key="i">
							<RollPoolInput v-if="fail.pool.diceNum > 0"
								field="failure" :field-key="i" :no-input="true" :item-id="item._id"
								:pool="fail.pool" :label="fail.value" />
							<i v-else class="fa-solid fa-xmark gw-challenge__fail-mark" inert></i>
							<span>{{ fail.value }}</span>
						</li>
					</ul>
				</div>
			</li>
		</ol>
	</section>
</template>

<script setup>
import { computed } from 'vue';
import { RollPoolInput, Pips } from '@/components';
import { t } from '@/composables/ui.mjs';
const props = defineProps(['context']);
const challenges = computed(() => props.context.itemTypes?.challenge ?? []);
const typeLabel = t('TYPES.Item.challenge');
</script>
