import { inject } from 'vue';

/**
 * Remembered open/closed state of expandable elements (talents, sections…).
 * @returns {{isOpen: Function, toggle: Function, setAll: Function}}
 */
export function useOpenState() {
	const ui = inject('ui');
	const isOpen = (key, fallback = false) => ui?.abiertos?.[key] ?? fallback;
	const toggle = (key, fallback = false) => {
		if (!ui) return;
		ui.abiertos = { ...ui.abiertos, [key]: !isOpen(key, fallback) };
	};
	const setAll = (keys, value) => {
		if (!ui) return;
		const next = { ...ui.abiertos };
		for (const key of keys) next[key] = value;
		ui.abiertos = next;
	};
	return { isOpen, toggle, setAll };
}

/** Localize shortcut usable inside <script setup>. */
export const t = (key, data) => (data ? game.i18n.format(key, data) : game.i18n.localize(key));
