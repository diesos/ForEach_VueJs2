import { createRouter, createWebHistory } from "vue-router";
import usersList from "../src/components/userList.vue";
import Register from "../src/components/Register.vue";
import Login from "../src/components/Login.vue";
import Profil from "../src/components/Profil.vue";
import Cocktail from "../src/components/Cocktail.vue";
import api from "../service/axiosInterceptor"


const routes = [
    {path: "/home", component: usersList},
    {path: "/register", component: Register},
    {path: "/login", component: Login},
    {path: "/profil", component: Profil},
    {path: "/cocktail", component: Cocktail, meta: {requiresAuth: true}},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem("token");

    if (to.meta.requiresAuth) {
      if (!token) {
        console.log("🔴 Token manquant, redirection vers /login");
        return next("/login");
      }

      try {
        const response = await api.post("/user/check-token"); // Vérifie si l'utilisateur existe
        console.log("✅ Utilisateur valide :", response.data);
        if(next === "/login")
             res.send.json({message: "Vous êtes déjà connecté"});
            setTimeout(() => {
                res.redirect("/profil");
            }, 3000);
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
