import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import api from '../../service/axiosInterceptor'; // Assure-toi que l'import de ton instance Axios est correct

const toast = useToast();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    email: localStorage.getItem('email') || null,
    nom: localStorage.getItem('nom') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  }),

  actions: {
    async loginUser(email, password, router, toast) {
      try {
        const response = await api.post('/user/login', {
          email,
          mot_de_passe: password,
        });

        // Stocker les infos utilisateur
        this.token = response.data.token;
        this.email = email;
        this.nom = response.data.user.nom;
        this.isAuthenticated = true;

        // Stocker dans localStorage
        localStorage.setItem('token', this.token);
        localStorage.setItem('email', this.email);
        localStorage.setItem('nom', this.nom);

        // Afficher un message et rediriger
        toast.success('Connexion réussie', {
          timeout: 1000
        });
        router.push('/profil');
      } catch (error) {
        toast.error('Erreur lors de la connexion');
        console.error(error);
      }
    },

    logout(router, toast, succes) {
      // Supprimer les infos utilisateur
      this.token = null;
      this.email = null;
      this.nom = null;
      this.isAuthenticated = false;

      // Supprimer du localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('nom');

      // Message et redirection

      router.push('/login');
    }
  }
});
