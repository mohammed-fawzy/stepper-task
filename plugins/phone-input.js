import { defineNuxtPlugin } from "#app";
import { VueTelInput } from "vue3-tel-input";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("VueTelInput", VueTelInput);
});