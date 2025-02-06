<script setup>
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import api from "../../../service/axiosInterceptor.js";
import { ref, defineProps, defineEmits, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

// Props
const props = defineProps({ cocktailInfo: Object });

// Définition des événements
const emit = defineEmits(['close', 'update']);

// Copie locale de l'objet cocktail pour modification
const cocktail = ref({ ...props.cocktailInfo });

// Variable pour contrôler l'affichage du modal
const visible = ref(true);

// Regarde si les props changent pour mettre à jour la copie locale
watch(() => props.cocktailInfo, (newValue) => {
	cocktail.value = { ...newValue };
}, { deep: true });

</script>

<template>
	<Dialog
</template>
