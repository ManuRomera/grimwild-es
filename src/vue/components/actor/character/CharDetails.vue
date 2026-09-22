<template>
	<div class="gw-details">
		<!-- Backgrounds: editorial; name as a heading, wises listed below. -->
		<section class="gw-details__col gw-backgrounds" data-ayuda="backgrounds">
			<h3 class="gw-heading">{{ context.systemFields.backgrounds.label }}</h3>
			<article v-for="(background, key) in context.system.backgrounds" :key="key" class="gw-bg">
				<input type="text" class="gw-bg__name"
					:name="`system.backgrounds.${key}.name`" v-model="background.name"
					:placeholder="t('GRIMWILD.Actor.Character.FIELDS.backgrounds.placeholder')"
					:aria-label="`${context.systemFields.backgrounds.label} ${key + 1}`"
					:disabled="!context.editable" />
				<span class="gw-label">{{ t('GRIMWILD.Actor.Character.FIELDS.backgrounds.FIELDS.wises.label') }}</span>
				<ul class="gw-bg__wises">
					<li v-for="w in [0, 1, 2]" :key="w">
						<input type="text" :name="`system.backgrounds.${key}.wises.${w}`" v-model="background.wises[w]"
							:aria-label="`${t('GRIMWILD.Actor.Character.FIELDS.backgrounds.FIELDS.wises.label')} ${w + 1}`"
							:disabled="!context.editable" />
					</li>
				</ul>
			</article>
		</section>

		<div class="gw-details__col">
			<!-- Conditions: compact status cards. -->
			<section class="gw-conditions" data-ayuda="conditions">
				<header class="gw-section-head">
					<h3 class="gw-heading">{{ context.systemFields.conditions.label }}</h3>
					<button v-if="context.editable" type="button" class="gw-button"
						data-action="createArrayEntry" data-field="conditions"
					><i class="fa-solid fa-plus" inert></i><span>{{ t('GRIMWILD.UI.addCondition') }}</span></button>
				</header>
				<p v-if="!context.system.conditions.length" class="gw-empty">{{ t('GRIMWILD.UI.noConditions') }}</p>
				<ul class="gw-cards">
					<li v-for="(condition, key) in context.system.conditions" :key="key" class="gw-cond"
						:class="`gw-cond--${condition.severity || 'none'}`"
					>
						<div class="gw-cond__row">
							<input type="text" class="gw-cond__name" :name="`system.conditions.${key}.name`"
								v-model="condition.name" :placeholder="t('GRIMWILD.UI.conditionName')"
								:aria-label="t('GRIMWILD.UI.conditionName')" :disabled="!context.editable" />
							<button v-if="context.editable" type="button" class="gw-icon-button gw-danger"
								data-action="deleteArrayEntry" data-field="conditions" :data-key="key"
								:aria-label="t('GRIMWILD.UI.deleteCondition')" :data-tooltip="t('GRIMWILD.UI.deleteCondition')"
							><i class="fa-solid fa-trash" inert></i></button>
						</div>
						<div class="gw-cond__row">
							<select class="gw-cond__severity" :name="`system.conditions.${key}.severity`" v-model="condition.severity"
								:aria-label="t('GRIMWILD.UI.duration')" :disabled="!context.editable">
								<option v-for="(choice, choiceKey) in context.systemFields.conditions.element.fields.severity.choices"
									:key="choiceKey" :value="choiceKey">{{ t(choice) }}</option>
							</select>
							<RollPoolInput v-if="condition.severity !== 'permanent'"
								field="conditions" :field-key="key" :field-name="`system.conditions.${key}.pool.diceNum`"
								:pool="condition.pool" :label="condition.name" min="0" />
						</div>
					</li>
				</ul>
			</section>

			<!-- Bonds: people first. data-bond-actor is reserved for linking an Actor in the future. -->
			<section class="gw-bonds" data-ayuda="bonds">
				<header class="gw-section-head">
					<h3 class="gw-heading">{{ context.systemFields.bonds.label }}</h3>
					<button v-if="context.editable" type="button" class="gw-button"
						data-action="createArrayEntry" data-field="bonds"
					><i class="fa-solid fa-plus" inert></i><span>{{ t('GRIMWILD.UI.addBond') }}</span></button>
				</header>
				<p v-if="!context.system.bonds.length" class="gw-empty">{{ t('GRIMWILD.UI.noBonds') }}</p>
				<ul class="gw-cards">
					<li v-for="(bond, key) in context.system.bonds" :key="key" class="gw-bond" data-bond-actor="">
						<i class="fa-solid fa-user gw-bond__icon" inert></i>
						<div class="gw-bond__text">
							<input type="text" class="gw-bond__name" :name="`system.bonds.${key}.name`" v-model="bond.name"
								:placeholder="t('GRIMWILD.UI.bondCharacter')" :aria-label="t('GRIMWILD.UI.bondCharacter')"
								:disabled="!context.editable" />
							<input type="text" class="gw-bond__desc" :name="`system.bonds.${key}.description`" v-model="bond.description"
								:placeholder="t('GRIMWILD.UI.bondDescription')" :aria-label="t('GRIMWILD.UI.bondDescription')"
								:disabled="!context.editable" />
						</div>
						<button v-if="context.editable" type="button" class="gw-icon-button gw-danger"
							data-action="deleteArrayEntry" data-field="bonds" :data-key="key"
							:aria-label="t('GRIMWILD.UI.deleteBond')" :data-tooltip="t('GRIMWILD.UI.deleteBond')"
						><i class="fa-solid fa-trash" inert></i></button>
					</li>
				</ul>
			</section>
		</div>
	</div>
</template>

<script setup>
import { RollPoolInput } from '@/components';
import { t } from '@/composables/ui.mjs';
defineProps(['context']);
</script>
