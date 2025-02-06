

<script setup>

import { ref, onMounted } from 'vue';
import { defineComponent } from 'vue';
import { useToast } from 'vue-toastification';
import Button from "primevue/button"

const toast = useToast();


</script>
<template>
	<div>
	<p>Hello to the home page</p>
	<Button @click="toast.success('Hello world!')">Click me</Button>
</div>
</template>
