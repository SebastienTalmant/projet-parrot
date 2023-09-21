Projet Parrot
Ce projet est une application web développée en React pour la partie frontend et en Node.js avec Express pour la partie backend. Il utilise également une base de données MySQL.

Prérequis
Node.js
MySQL
XAMPP (ou tout autre serveur local de votre choix pour MySQL)


Configuration


Base de données:

Lancez votre serveur MySQL (par exemple avec XAMPP).
Créez une nouvelle base de données appelée parrot.
Exécutez le script SQL pour créer les tables nécessaires (ce script doit être fourni séparément).
Variables d'environnement:

Assurez-vous d'avoir les clés AWS configurées comme variables d'environnement (AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, et AWS_REGION).



Installation des dépendances:

Backend:

cd path_to_your_backend_folder
npm install @aws-sdk/client-s3 aws-sdk bcrypt cors dotenv express express-session multer mysql


Frontend:

cd path_to_your_frontend_folder
npm install @testing-library/jest-dom @testing-library/react @testing-library/user-event aws-sdk axios babel-plugin-macros moment mysql react react-dom react-icons react-js-pagination react-multi-carousel react-responsive-carousel react-router-dom react-scripts react-slider react-transition-group styled-components uuid web-vitals
Création d'un administrateur:

Dans le dossier du backend, exécutez le script de création d'admin pour créer un utilisateur admin dans la base de données :

node createAdmin.js


Exécution en local
Backend:

Naviguez vers le dossier du backend et lancez le serveur avec :

node server.js

Le serveur démarrera et écoutera sur le port 3000.


Frontend:

Naviguez vers le dossier du frontend et lancez l'application React avec :

npm start
L'application démarrera et s'ouvrira dans votre navigateur par défaut sur http://localhost:3001.


Utilisation:

Vous pouvez maintenant naviguer dans l'application, vous connecter avec le compte admin créé précédemment (v.parrot@test.fr / 123), ou créer et gérer d'autres utilisateurs et fonctionnalités.


Notes
Assurez-vous que les ports 3000 et 3001 sont disponibles avant de démarrer les serveurs.
Si vous rencontrez des problèmes de CORS lors de l'exécution en local, assurez-vous que la configuration CORS du backend autorise le frontend.
