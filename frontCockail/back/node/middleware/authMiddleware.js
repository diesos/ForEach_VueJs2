import jwt from 'jsonwebtoken';

const isGranted = (req, res, next) => {


	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		res.status(401).send('Token manquant !');
	}
	let token;

	if (authHeader && authHeader.startsWith('Bearer ')) {
		token = authHeader.split(' ')[1];
	}
	else {
		token = authHeader;
	}
	jwt.verify(token, process.env.secret_key, (err, decoded) => {
		if (err) {
			res.status(401).send('Accès refusé');
		} else {
			const { email, nom } = decoded;
			next();
		}
	})
};

export default isGranted;

