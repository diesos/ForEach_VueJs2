import router from "./router";

const verifyAcces = () => {


	const token = localStorage.getItem('token');
	if (!token) {
		console.log("Token manquant !");
		router.push('/login');
		return false;
	}
	else {
		console.log("Accès autorisé");
		return true;
	}
};

export default verifyAcces;
