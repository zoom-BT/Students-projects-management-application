# 🚀 Gestionnaire de Projets

Application web complète de gestion de projets et de tâches, développée avec Node.js, Express, PostgreSQL, React et TailwindCSS.

## 📋 Fonctionnalités

### Authentification
- ✅ Inscription et connexion sécurisées (JWT)
- ✅ Gestion de profil utilisateur
- ✅ Système de rôles (Admin, Manager, Collaborateur)

### Gestion de Projets
- ✅ Création, édition et suppression de projets
- ✅ Statuts: Planification, Actif, En attente, Complété, Annulé
- ✅ Priorités: Urgent, Haute, Moyenne, Basse
- ✅ Suivi de progression automatique
- ✅ Gestion des membres du projet
- ✅ Codes couleur personnalisables

### Gestion de Tâches
- ✅ CRUD complet des tâches
- ✅ Attribution aux utilisateurs
- ✅ Statuts: À faire, En cours, En révision, Terminé
- ✅ Dates d'échéance
- ✅ Estimation et suivi du temps
- ✅ Tags personnalisables
- ✅ Filtres avancés

### Tableau de Bord
- ✅ Statistiques en temps réel
- ✅ Vue d'ensemble des projets actifs
- ✅ Tâches assignées et en cours
- ✅ Alertes pour les tâches en retard

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** v18+ - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Base de données relationnelle
- **Sequelize** - ORM pour PostgreSQL
- **JWT** - Authentification sécurisée
- **Bcrypt** - Hachage des mots de passe
- **Helmet** - Sécurité HTTP
- **Morgan** - Logging des requêtes
- **Express Validator** - Validation des données

### Frontend
- **React 18** - Bibliothèque UI
- **Vite** - Build tool moderne et rapide
- **React Router v6** - Navigation
- **TailwindCSS** - Framework CSS utility-first
- **Axios** - Client HTTP
- **React Icons** - Icônes
- **React Toastify** - Notifications
- **date-fns** - Manipulation de dates

### DevOps
- **Docker** & **Docker Compose** - Conteneurisation
- **PostgreSQL Alpine** - Base de données légère

## 📦 Installation

### Prérequis
- Node.js v18 ou supérieur
- PostgreSQL 12+ (ou Docker)
- npm ou yarn

### Option 1: Installation avec Docker (Recommandé)

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd project-manager
```

2. **Lancer avec Docker Compose**
```bash
docker-compose up -d
```

3. **Accéder à l'application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- PostgreSQL: localhost:5432

### Option 2: Installation manuelle

#### Backend

1. **Aller dans le dossier backend**
```bash
cd backend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
# Éditer le fichier .env avec vos paramètres
```

4. **Créer la base de données PostgreSQL**
```sql
CREATE DATABASE project_manager;
```

5. **Démarrer le serveur**
```bash
# Mode développement (avec hot reload)
npm run dev

# Mode production
npm start
```

Le serveur démarre sur http://localhost:5000

#### Frontend

1. **Aller dans le dossier frontend**
```bash
cd frontend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
# Vérifier que VITE_API_URL pointe vers le backend
```

4. **Démarrer l'application**
```bash
# Mode développement
npm run dev

# Build pour production
npm run build
npm run preview
```

L'application démarre sur http://localhost:3000

## 🔧 Configuration

### Variables d'environnement Backend (.env)

```env
# Serveur
PORT=5000
NODE_ENV=development

# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_NAME=project_manager
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=votre_secret_jwt_super_securise
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:3000
```

### Variables d'environnement Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## 📚 Structure du Projet

```
project-manager/
├── backend/                 # API Node.js/Express
│   ├── src/
│   │   ├── config/         # Configuration (DB, Auth)
│   │   ├── models/         # Modèles Sequelize
│   │   ├── controllers/    # Contrôleurs (logique métier)
│   │   ├── routes/         # Routes API
│   │   ├── middleware/     # Middlewares (auth, errors)
│   │   └── utils/          # Utilitaires (validation)
│   ├── server.js           # Point d'entrée
│   └── package.json
│
├── frontend/               # Application React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   │   ├── auth/      # Authentification
│   │   │   ├── dashboard/ # Tableau de bord
│   │   │   ├── projects/  # Gestion projets
│   │   │   ├── tasks/     # Gestion tâches
│   │   │   ├── common/    # Composants réutilisables
│   │   │   └── layout/    # Layout principal
│   │   ├── services/      # Services API
│   │   ├── context/       # React Context (Auth)
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Fonctions utilitaires
│   │   ├── App.jsx        # Composant racine
│   │   └── index.jsx      # Point d'entrée
│   └── package.json
│
├── docker-compose.yml     # Orchestration Docker
└── README.md             # Documentation
```

## 🔌 API Endpoints

### Authentification
```
POST   /api/auth/register      - Inscription
POST   /api/auth/login         - Connexion
GET    /api/auth/me            - Profil utilisateur (protégé)
PUT    /api/auth/profile       - Mise à jour profil (protégé)
PUT    /api/auth/change-password - Changer mot de passe (protégé)
```

### Projets
```
GET    /api/projects           - Liste des projets (protégé)
GET    /api/projects/:id       - Détails d'un projet (protégé)
POST   /api/projects           - Créer un projet (protégé)
PUT    /api/projects/:id       - Modifier un projet (protégé)
DELETE /api/projects/:id       - Supprimer un projet (protégé)
POST   /api/projects/:id/members     - Ajouter un membre (protégé)
DELETE /api/projects/:id/members/:userId - Retirer un membre (protégé)
```

### Tâches
```
GET    /api/tasks              - Liste des tâches (protégé)
GET    /api/tasks/:id          - Détails d'une tâche (protégé)
POST   /api/tasks              - Créer une tâche (protégé)
PUT    /api/tasks/:id          - Modifier une tâche (protégé)
DELETE /api/tasks/:id          - Supprimer une tâche (protégé)
GET    /api/tasks/stats/dashboard - Statistiques (protégé)
```

### Utilisateurs
```
GET    /api/users              - Liste des utilisateurs (protégé)
GET    /api/users/:id          - Détails utilisateur (protégé)
PUT    /api/users/:id          - Modifier utilisateur (admin)
DELETE /api/users/:id          - Désactiver utilisateur (admin)
GET    /api/users/:id/stats    - Statistiques utilisateur (protégé)
```

## 🧪 Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 🚀 Déploiement en Production

### Backend
1. Configurer les variables d'environnement de production
2. Utiliser un gestionnaire de processus (PM2)
```bash
npm install -g pm2
pm2 start server.js --name project-manager-api
```

### Frontend
```bash
npm run build
# Servir le dossier dist/ avec nginx ou autre serveur web
```

### Base de données
- Utiliser PostgreSQL managé (AWS RDS, Azure Database, etc.)
- Configurer les sauvegardes automatiques
- Activer SSL/TLS

## 🔒 Sécurité

- ✅ Authentification JWT avec tokens sécurisés
- ✅ Mots de passe hashés avec bcrypt
- ✅ Protection contre les injections SQL (Sequelize ORM)
- ✅ Validation des entrées utilisateur
- ✅ Headers de sécurité (Helmet)
- ✅ CORS configuré
- ✅ Rate limiting (à implémenter)

## 📈 Améliorations Futures

- [ ] Notifications en temps réel (WebSockets)
- [ ] Chat intégré par projet
- [ ] Upload de fichiers/documents
- [ ] Diagramme de Gantt
- [ ] Export PDF des rapports
- [ ] Intégration calendrier (Google Calendar, Outlook)
- [ ] Notifications par email
- [ ] Application mobile (React Native)
- [ ] Thème sombre
- [ ] Traductions multilingues

## 👥 Système de Rôles

### Admin
- Accès complet à toutes les fonctionnalités
- Gestion des utilisateurs
- Suppression de projets

### Manager
- Créer et gérer des projets
- Assigner des tâches
- Gérer les membres du projet

### Collaborateur
- Voir les projets assignés
- Créer et gérer ses tâches
- Mettre à jour le statut des tâches

## 📝 Licence

MIT License - Libre d'utilisation pour vos projets personnels et commerciaux.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📧 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

**Développé avec ❤️ pour faciliter la gestion de projets**
