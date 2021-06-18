import { writable } from 'svelte/store';

export const alertStatus = writable(0);
export const alertText = writable("");
export const alertColor = writable(0);