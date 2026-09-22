<template>
	<section class="gw-items" :class="`gw-items--${type}`">
		<header class="gw-items__head">
			<h3 class="gw-heading">{{ title }}</h3>
			<div class="gw-items__tools">
				<button v-if="items.length" type="button" class="gw-icon-button"
					:aria-label="allOpen ? t('GRIMWILD.UI.collapseAll') : t('GRIMWILD.UI.expandAll')"
					:data-tooltip="allOpen ? t('GRIMWILD.UI.collapseAll') : t('GRIMWILD.UI.expandAll')"
					@click="setAll(items.map((i) => key(i)), !allOpen)"
				><i :class="['fa-solid', allOpen ? 'fa-angles-up' : 'fa-angles-down']" inert></i></button>
				<button v-if="context.editable" type="button" class="gw-button"
					data-action="createDoc" data-document-class="Item" :data-type="type"
				><i class="fa-solid fa-plus" inert></i><span>{{ t('GRIMWILD.UI.add') }}</span></button>
				<button type="button" class="gw-button" data-action="openPack" :data-pack="pack">
					<i class="fa-solid fa-book-atlas" inert></i><span>{{ t('GRIMWILD.UI.compendium') }}</span>
				</button>
			</div>
		</header>

		<p v-if="!items.length" class="gw-empty">{{ empty }}</p>

		<ol class="gw-items__list">
			<li v-for="item in items" :key="item._id" class="gw-item" :class="{ open: isOpen(key(item)) }"
				:data-item-id="item._id" data-drag="true" draggable="true" data-document-class="Item"
			>
				<div class="gw-item__head">
					<button type="button" class="gw-item__img" data-action="roll" data-roll-type="item"
						:aria-label="t('GRIMWILD.UI.sendToChat', { name: item.name })"
						:data-tooltip="t('GRIMWILD.UI.sendToChat', { name: item.name })"
					><img :src="item.img" alt="" width="32" height="32" /></button>
					<button type="button" class="gw-item__name"
						:aria-expanded="String(isOpen(key(item)))"
						:aria-controls="`${sheetId}-${item._id}-body`"
						@click="toggle(key(item))"
					>
						<span>{{ item.name }}</span>
						<i class="fa-solid fa-chevron-down gw-item__chev" inert></i>
					</button>
					<div v-if="item.system.trackers?.length" class="gw-item__trackers">
						<ItemTracker v-for="(tracker, i) in item.system.trackers.slice(0, PRIMARY)" :key="i"
							:tracker="tracker" :index="i" :item-id="item._id" :editable="context.editable" />
					</div>
					<div class="gw-item__controls">
						<button type="button" class="gw-icon-button" data-action="viewDoc"
							:aria-label="t('DOCUMENT.Edit', { type: typeLabel })" :data-tooltip="t('DOCUMENT.Edit', { type: typeLabel })"
						><i class="fa-solid fa-pen-to-square" inert></i></button>
						<button v-if="context.editable" type="button" class="gw-icon-button gw-danger" data-action="deleteDoc"
							:aria-label="t('DOCUMENT.Delete', { type: typeLabel })" :data-tooltip="t('DOCUMENT.Delete', { type: typeLabel })"
						><i class="fa-solid fa-trash" inert></i></button>
					</div>
				</div>
				<div class="gw-item__body" :id="`${sheetId}-${item._id}-body`" :inert="!isOpen(key(item))">
					<div class="gw-item__inner">
						<div v-if="item.system.trackers?.length > PRIMARY" class="gw-item__trackers gw-item__trackers--more">
							<ItemTracker v-for="(tracker, i) in item.system.trackers.slice(PRIMARY)" :key="i + PRIMARY"
								:tracker="tracker" :index="i + PRIMARY" :item-id="item._id" :editable="context.editable" />
						</div>
						<slot name="details" :item="item"></slot>
						<div v-if="item.system.description" class="gw-item__desc"
							v-html="context.editors[`items.${item._id}.system.description`]?.enriched"></div>
						<div v-if="item.system.notes?.description" class="gw-item__notes">
							<strong v-if="item.system.notes.label">{{ item.system.notes.label }}</strong>
							<div v-html="context.editors[`items.${item._id}.system.notes.description`]?.enriched"></div>
						</div>
					</div>
				</div>
			</li>
		</ol>
	</section>
</template>

<script setup>
import { computed, inject } from 'vue';
import ItemTracker from './ItemTracker.vue';
import { t, useOpenState } from '@/composables/ui.mjs';

// Trackers shown next to the name; the rest go inside the expanded body.
const PRIMARY = 2;
const props = defineProps(['context', 'type', 'pack', 'title', 'empty']);
const sheetId = inject('sheet')?.id ?? 'grimwild';
const { isOpen, toggle, setAll } = useOpenState();
const key = (item) => `item-${item._id}`;
const items = computed(() => props.context.itemTypes?.[props.type] ?? []);
const allOpen = computed(() => items.value.length > 0 && items.value.every((i) => isOpen(key(i))));
const typeLabel = computed(() => t(`TYPES.Item.${props.type}`));
</script>
