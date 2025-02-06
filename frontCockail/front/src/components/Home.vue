

<script setup>

import { ref, onMounted } from 'vue';
import { defineComponent } from 'vue';
import { useToast } from 'vue-toastification';
import Button from "primevue/button"
import hero from '@/assets/hero.png';

const toast = useToast();


</script>
<template>
	<div class="flex flex-col bg-slate-300 w-1/3 m-auto mt-12 p-12 rounded-lg shadow-sm hover:shadow-lg">
		<h1 class="text-4xl text-center m-12 text-black">Welcome to Cocktail App</h1>
		<div class="flex justify-center items-center m-auto p-12">
			<Button label="Login" class="m-4" @click="$router.push('/login')" />
			<Button label="Register" class="m-4" @click="$router.push('/register')" />
		</div>
	<div class="w-full flex justify-center items-center m-auto p-12">
		<img :src="hero" alt="Hero Image" />	</div>
	</div>
</template>
