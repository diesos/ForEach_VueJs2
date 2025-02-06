import { createRouter, createWebHistory } from "vue-router";
import { useRouter, useRoute } from 'vue-router'
import usersList from "../src/components/userList.vue";
import Register from "../src/components/Register.vue";
import Login from "../src/components/Login.vue";
import Profil from "../src/components/Profil.vue";
import Cocktail from "../src/components/Cocktail.vue";
import Home from "../src/components/Home.vue";
import api from "../service/axiosInterceptor"
import { useToast } from 'vue-toastification';

const toast = useToast();

const routes = [
    {path: "/home", component: Home},
    {path: "/users", component: usersList},
    {path: "/profil", component: Profil},
    {path: "/cocktail", component: Cocktail, meta: {requiresAuth: true}},
    {path: "/register", component: Register},
    {path: "/login", component: Login},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    useRoute,
});

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem("token");

    if (to.meta.requiresAuth) {
      if (!token) {
        console.log("🔴 Token manquant, redirection vers /login");
        toast.error("Vous devez être connecté pour accéder à cette page");
        return next("/login");
      }

      try {
        const response = await api.post("/user/check-token"); // Vérifie si l'utilisateur existe
        console.log("✅ Utilisateur valide :", response.data);
        return next();
      } catch (error) {
        console.log("🔴 Utilisateur introuvable, suppression du token");
        localStorage.removeItem("token");
        return next("/login");
      }
    }

    next();
    }
);

export default router;
