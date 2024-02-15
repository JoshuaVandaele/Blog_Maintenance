# **Blog**

Le site est une plateforme dédiée à regrouper des articles rédigés par les utilisateurs, offrant ainsi un espace où les utilisateurs peuvent créer, modifier et consulter des articles. Cette plateforme favorise l'échange et la diffusion de connaissances entre ses utilisateurs.

## Technologies utilisées

- **Vue.js** pour le frontend : Vue.js est un framework JavaScript progressif utilisé pour construire des interfaces utilisateur interactives. Grâce à sa facilité d'utilisation et sa flexibilité, Vue.js permet de créer une expérience utilisateur fluide et dynamique.
- **Express.js** pour le backend : Express.js est un framework web **Node.js** minimaliste et flexible utilisé pour construire des applications web côté serveur. Il simplifie le processus de création d'API RESTful et offre des fonctionnalités robustes pour gérer les requêtes et les réponses HTTP.
- **Postgresql** pour la base de donné : PostgreSQL est un système de gestion de base de données relationnelle open source.
- **Docker** pour la conteneurisation : Docker est une plateforme open source qui permet de développer, de déployer et d'exécuter des applications dans des conteneurs. Les conteneurs permettent d'isoler les applications de leur environnement, ce qui facilite leur déploiement et leur gestion.

## Fonctionnalités principales

- Création et modification d'articles : Les utilisateurs peuvent rédiger leurs propres articles sur la plateforme et ont également la possibilité de les modifier ultérieurement. Cela permet une contribution active à la communauté du blog.
- Consultation des articles : Les utilisateurs peuvent parcourir les articles rédigés par d'autres utilisateurs, ce qui favorise le partage de connaissances et d'expériences.
- Création de compte utilisateur : Les nouveaux utilisateurs ont la possibilité de créer un compte sur la plateforme, ce qui leur permet d'accéder à toutes les fonctionnalités de l'application et de gérer leurs articles de manière personnalisée.
- Connexion à l'application : Les utilisateurs enregistrés peuvent se connecter à leur compte à tout moment, ce qui leur donne un accès sécurisé à leurs articles et leur permet de profiter pleinement des fonctionnalités de la plateforme.

## Lancer l'application

### Front

Afin de lancer le front de l'application, rendez-vous dans le dossier de l'application et tapez les commandes suivantes :

`npm i`

Pour lancer l'application :

`npm run dev`

Rendez-vous ensuite sur :
[localhost:3000](http://localhost:3000)

### Back

allez dans le back

1. Créez une base de donné postgresql
2. Remplisez crée et rempliser le .env en vous basant sur le .en.exemple avec vos propre information
3. tape la commande : `npm run dev`

### Docker

Pour lancer l'application avec docker, vous pouvez modifier le docker-compose-example.yml en docker-compose.yml et lancer la commande suivante : `docker-compose up`

## Collaborateurs

- Laetitia **BERNARD**
- Lucie **LE FUR**
- Joshua **VANDAËLE**
- Jeremy **BODART**
- Enzo **VERNALDE**
