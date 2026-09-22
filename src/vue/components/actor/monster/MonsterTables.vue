<template>
	<section class="monster-tables-wrapper form-group stacked ">
		<!-- Use the _arrayEntryKey prop to refresh when the array fields are modified. -->
		<div class="monster-tables form-group stacked" :key="context._arrayEntryKey">
			<!-- Wrapper for ables. -->
			<fieldset class="add-another-entries" v-for="(table, tableKey) in context.system.tables" :key="tableKey">
				<legend>{{ t('GRIMWILD.UI.table') }}</legend>
				<!-- Delete this table. -->
				<button class="legend-control entry-delete"
					:aria-label="t('GRIMWILD.UI.deleteTable')" :data-tooltip="t('GRIMWILD.UI.deleteTable')" type="button"
					data-action="deleteArrayEntry"
					data-field="tables"
					:data-key="tableKey"
				><i class="fas fa-trash" inert></i></button>
				<!-- Table Name. -->
				<div class="form-group">
					<label>{{ t('GRIMWILD.UI.tableName') }}</label>
					<input type="text" 
						:name="`system.tables.${tableKey}.name`" 
						:placeholder="t('GRIMWILD.UI.tableNamePlaceholder')"
						v-model="table.name"
					/>
				</div>
				<!-- Table Instructions. -->
				<div class="form-group">
					<label>{{ t('GRIMWILD.UI.tableInstructions') }}</label>
					<input type="text" 
						:name="`system.tables.${tableKey}.instructions`" 
						:placeholder="t('GRIMWILD.UI.tableInstructionsPlaceholder')"
						v-model="table.instructions"
					/>
				</div>
				<!-- Table d6 groups. -->
				<div class="tables-wrapper form-group stacked">
					<div class="form-group stacked">
						<!-- d6 Table group. -->
						<fieldset class="tables-wrapper add-another-entries" v-for="(col, colKey) in table.table" :key="colKey">
							<legend>{{ t('GRIMWILD.UI.d6') }}</legend>
							<!-- Delete this group. -->
							<button class="legend-control entry-delete"
								:aria-label="t('GRIMWILD.UI.deleteD6Group')" :data-tooltip="t('GRIMWILD.UI.deleteD6Group')" type="button"
								data-action="deleteArrayEntry"
								:data-field="`system.tables.${tableKey}.table`"
								:data-key="colKey"
							><i class="fas fa-trash" inert></i></button>
							<!-- Table rows for 1-6. -->
							<div v-for="(row, rowKey) in col" :key="rowKey" class="form-group">
								<label>{{ Number(rowKey) + 1 }}</label>
								<input type="text"
									:name="`system.tables.${tableKey}.table.${colKey}.${rowKey}`"
									v-model="context.system.tables[tableKey]['table'][colKey][rowKey]"
								/>
							</div>
						</fieldset>
					</div>
					<!-- Control to add table group. -->
					<button class="table-control entry-create"
						type="button"
						data-action="createArrayEntry"
						:data-field="`system.tables.${tableKey}.table`"
						data-field-type="StringField"
						data-count="6"
					><i class="fas fa-plus" inert></i> {{ t('GRIMWILD.UI.addD6TableGroup') }}</button>
				</div>
			</fieldset>
			<!-- Add table -->
			<button class="monster-table-create entry-create"
				type="button"
				data-action="createArrayEntry"
				data-field="tables"
			><i class="fas fa-plus" inert></i> {{ t('GRIMWILD.UI.addTable') }}</button>
		</div>
	</section>
</template>

<script setup>
import { t } from '@/composables/ui.mjs';
defineProps(['context']);
</script>