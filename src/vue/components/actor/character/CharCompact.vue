<template>
	<!-- Compact play view: only what is used continuously during a scene. -->
	<div class="gw-compact">
		<header class="gw-compact__head">
			<img class="gw-compact__portrait" :src="context.actor.img" alt="" width="52" height="52" />
			<div class="gw-compact__who">
				<input type="text" class="gw-id__name" name="name" v-model="context.actor.name"
					:aria-label="t('Name')" :disabled="!context.editable" />
				<span class="gw-compact__sub">
					<span v-if="context.system.path">{{ context.system.path }} · </span>{{ t('GRIMWILD.Actor.Character.FIELDS.level.label') }} {{ context.system.level }}
				</span>
			</div>
		</header>

		<div class="gw-compact__stats">
			<StatBlock v-for="stat in ['bra', 'agi', 'wit', 'pre']" :key="stat" :context="context" :stat="stat" :compact="true" />
		</div>

		<HarmTrack :context="context" :compact="true" />

		<div class="gw-meta">
			<div class="gw-meta__item">
				<span class="gw-label"><i class="fa-solid fa-bolt" inert></i> {{ context.systemFields.spark.label }}</span>
				<Pips :steps="context.system.spark.steps" name="system.spark.steps" kind="spark" ayuda="spark"
					icon="fa-solid fa-bolt" :label="context.systemFields.spark.label" />
			</div>
			<div class="gw-meta__item">
				<span class="gw-label"><i class="fa-solid fa-feather" inert></i> {{ context.systemFields.story.label }}</span>
				<Pips :steps="context.system.story.steps" name="system.story.steps" kind="story" ayuda="story"
					icon="fa-solid fa-book-open" :label="context.systemFields.story.label" />
			</div>
		</div>

		<section v-if="activeConditions.length" class="gw-compact__section" data-ayuda="conditions">
			<h3 class="gw-label">{{ context.systemFields.conditions.label }}</h3>
			<ul class="gw-compact__conds">
				<li v-for="{ condition, key } in activeConditions" :key="key" class="gw-cond gw-cond--mini" :class="`gw-cond--${condition.severity || 'none'}`">
					<span class="gw-cond__label">{{ condition.name }}</span>
					<RollPoolInput v-if="condition.severity !== 'permanent'"
						field="conditions" :field-key="key" :field-name="`system.conditions.${key}.pool.diceNum`"
						:pool="condition.pool" :label="condition.name" min="0" />
				</li>
			</ul>
		</section>

		<!-- Minimal access to talents and arcana with trackers. -->
		<section v-if="withTrackers.length" class="gw-compact__section">
			<button type="button" class="gw-disclosure" :aria-expanded="String(isOpen('compact-items', true))"
				@click="toggle('compact-items', true)">
				<i class="fa-solid fa-chevron-down" inert></i>
				<span class="gw-label">{{ t('GRIMWILD.Actor.Tabs.Talents') }} · {{ t('GRIMWILD.Actor.Tabs.Arcana') }}</span>
			</button>
			<ul v-show="isOpen('compact-items', true)" class="gw-compact__items">
				<li v-for="item in withTrackers" :key="item._id" :data-item-id="item._id" data-document-class="Item">
					<span class="gw-compact__item-name">{{ item.name }}</span>
					<div class="gw-item__trackers">
						<ItemTracker v-for="(tracker, i) in item.system.trackers" :key="i"
							:tracker="tracker" :index="i" :item-id="item._id" :editable="context.editable" />
					</div>
				</li>
			</ul>
		</section>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { StatBlock, HarmTrack, Pips, RollPoolInput, ItemTracker } from '@/components';
import { t, useOpenState } from '@/composables/ui.mjs';

const props = defineProps(['context']);
const { isOpen, toggle } = useOpenState();
const activeConditions = computed(() => props.context.system.conditions
	.map((condition, key) => ({ condition, key }))
	.filter(({ condition }) => condition.name?.trim()));
const withTrackers = computed(() => [...(props.context.itemTypes?.talent ?? []), ...(props.context.itemTypes?.arcana ?? [])]
	.filter((i) => i.system.trackers?.length));
</script>
