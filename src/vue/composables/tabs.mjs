import { computed, inject } from 'vue';

/**
 * Shared state of the primary tabs of a sheet. The active tab lives in the sheet's remembered
 * interface state (`ui.pestana`); if it is not valid for this sheet, the tab flagged `active`
 * in the prepared context (or the first one) is used.
 * @param {object} tabs  Tabs prepared by the sheet class ({key: {key, label, icon, active}}).
 * @returns {{uid: string, active: import('vue').ComputedRef<string>, select: Function}}
 */
export function useTabs(tabs) {
	const ui = inject('ui');
	const sheet = inject('sheet');
	const uid = sheet?.id ?? 'grimwild-sheet';
	const fallback = () => Object.values(tabs ?? {}).find((t) => t.active)?.key ?? Object.keys(tabs ?? {})[0];
	const active = computed(() => (tabs?.[ui?.pestana] && !tabs[ui.pestana].hidden) ? ui.pestana : fallback());
	const select = (key) => {
		if (ui) ui.pestana = key;
	};
	return { uid, active, select };
}
