<template>
	<!-- Primary play controls: stats, harm and metacurrencies. -->
	<section class="gw-play" :aria-label="t('GRIMWILD.UI.play')">
		<div class="gw-play__stats">
			<div class="gw-statgroup gw-statgroup--physical">
				<StatBlock :context="context" stat="bra" />
				<StatBlock :context="context" stat="agi" />
			</div>
			<div class="gw-statgroup gw-statgroup--mental">
				<StatBlock :context="context" stat="wit" />
				<StatBlock :context="context" stat="pre" />
			</div>
		</div>
		<div class="gw-play__status">
			<HarmTrack :context="context" />
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
		</div>
	</section>
</template>

<script setup>
import { StatBlock, HarmTrack, Pips } from '@/components';
import { t } from '@/composables/ui.mjs';
defineProps(['context']);
</script>
