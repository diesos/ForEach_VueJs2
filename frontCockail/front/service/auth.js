const verifyAcces = () => {


	const token = localStorage.getItem('token');
	if (token.length === 0 || !token) {
		return 0;
	}
	jwt.verify(token, process.env.secret_key, (err, decoded) => {
		if (err) {
			res.status(401).send('Accès refusé');
		} else {
			const { email, nom } = decoded;
			return 1;
		}
	});
};

export default verifyAcces;
