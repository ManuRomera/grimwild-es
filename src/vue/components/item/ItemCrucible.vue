<template>
  <fieldset class="crucible">
    <legend>{{ t('GRIMWILD.UI.crucible') }}</legend>
    <div class="form-group stacked">
      <div class="form-group">
        <label>{{ t('Name') }}</label>
        <input type="text"
          name="system.crucible.name"
          v-model="context.system.crucible.name"
          :placeholder="t('Name')"
        />
      </div>
      <div class="form-group">
        <label>{{ t('GRIMWILD.UI.instructions') }}</label>
        <input type="text"
          name="system.crucible.instructions"
          v-model="context.system.crucible.instructions"
          :placeholder="t('GRIMWILD.UI.instructions')"
        />
      </div>
      <div class="form-group stacked">
        <div class="form-group">
          <button type="button"
            data-action="rollCrucible"
          ><i class="fas fa-dice-d6" inert></i> {{ t('GRIMWILD.UI.rollCrucible') }}</button>
          <button type="button"
            v-if="context.editable"
            @click="toggleEdit"
          ><i :class="`fas fa-${editMode ? 'eye' : 'pencil'}`"></i> {{ editMode ? t('GRIMWILD.UI.viewCrucible') : t('GRIMWILD.UI.editCrucible') }}</button>
        </div>
        <div class="responsive-table">
          <table>
            <tbody>
              <tr v-for="row in d66Array">
                <td v-for="column in d66Array">
                  <input type="text"
                    v-if="editMode"
                    :name="`system.crucible.table.${row}.${column}`"
                    v-model="context.system.crucible.table[row][column]"
                  />
                  <span v-else>{{ context.system.crucible.table[row][column] }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import { inject, ref } from 'vue';
import { t } from '@/composables/ui.mjs';
const props = defineProps(['context']);
const item = inject('rawDocument');
const d66Array = Array.fromRange(6, 1);

const editMode = ref(false);
function toggleEdit() {
  editMode.value = !editMode.value;
}
</script>