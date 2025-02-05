import router from "./router";

const verifyAcces = () => {


	const token = localStorage.getItem('token');
	if (!token) {
		console.log("Token manquant !");
		router.push('/login');
	}
	else {
		console.log("Accès autorisé");
	}
	next();
};

export default verifyAcces;
