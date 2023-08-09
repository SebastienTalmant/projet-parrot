const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Remplacez par votre mot de passe si vous en avez défini un
    database: 'parrot',
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connecté à la base de données');
});
