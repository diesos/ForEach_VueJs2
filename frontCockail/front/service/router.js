import { createRouter, createWebHistory } from "vue-router";
import usersList from "../src/components/userList.vue";
import Register from "../src/components/Register.vue";
import Login from "../src/components/Login.vue";
import Profil from "../src/components/Profil.vue";
import Cocktail from "../src/components/Cocktail.vue";


const routes = [
    {path: "/home", component: usersList},
    {path: "/register", component: Register},
    {path: "/login", component: Login},
    {path: "/profil", component: Profil},
    {path: "/cocktail", component: Cocktail}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
