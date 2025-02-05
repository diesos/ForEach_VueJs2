// Importation du fichier CSS global
import './assets/main.css';

// Importation de Vue
import { createApp } from 'vue';

// Importation du composant principal de l'application
import App from './App.vue';

// Importation du router pour la gestion des routes
import router from '../service/router';

// Création de l'application Vue, ajout du router et montage sur l'élément HTML avec l'id 'app'
createApp(App).use(router).mount('#app');
