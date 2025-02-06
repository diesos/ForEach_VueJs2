
import './assets/main.css';


import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';


import App from './App.vue';
import router from '../service/router';

// Importation du router pour la gestion des routes
import { createPinia } from 'pinia';
const pinia = createPinia();


// Importation de Vue Toastification
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Création de l'application Vue
const app = createApp(App);

app.use(pinia)
app.use(PrimeVue, {
	theme: {
		preset: Aura,
	}
});
// Configuration de Vue Toastification
app.use(Toast, {
  position: POSITION.TOP_RIGHT, // Position des notifications
  timeout: 3000, // Durée avant disparition
  closeOnClick: true, // Fermer en cliquant
  pauseOnHover: true, // Pause au survol
  draggable: true, // Déplacement possible
  transition: 'Vue-Toastification__fade', // Animation de transition
});

// Ajout du router et montage de l'application
app.use(router).mount('#app');
