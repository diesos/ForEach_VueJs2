const verifyAcces = (req, res, next) => {


	const token = localStorage.getItem('token');
	if (token.length === 0 || !token) {
		res.status(401).send('Veuillez vous connecter');
	}
	jwt.verify(token, process.env.secret_key, (err, decoded) => {
		if (err) {
			res.status(401).send('Accès refusé');
		} else {
			const { email, nom } = decoded;
			next();
		}
	});
};
