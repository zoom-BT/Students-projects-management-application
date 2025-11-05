# 🚀 Guide de Démarrage Rapide

## Option 1: Démarrage avec Docker (Le plus simple)

### Étape 1: Installer Docker
Si vous n'avez pas Docker, installez-le depuis https://www.docker.com/get-started

### Étape 2: Lancer l'application
```bash
docker-compose up -d
```

### Étape 3: Accéder à l'application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/health

### Étape 4: Créer un compte
1. Ouvrez http://localhost:3000
2. Cliquez sur "S'inscrire"
3. Remplissez le formulaire
4. Connectez-vous et commencez à utiliser l'application !

---

## Option 2: Installation Manuelle

### Prérequis
- Node.js v18+: https://nodejs.org/
- PostgreSQL 12+: https://www.postgresql.org/download/

### Étape 1: Installer PostgreSQL

#### Sur Ubuntu/Debian:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Sur macOS (avec Homebrew):
```bash
brew install postgresql@15
brew services start postgresql@15
```

#### Sur Windows:
Téléchargez et installez depuis https://www.postgresql.org/download/windows/

### Étape 2: Créer la base de données
```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base de données et l'utilisateur
CREATE DATABASE project_manager;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE project_manager TO postgres;
\q
```

### Étape 3: Configurer le Backend
```bash
cd backend

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Éditer .env si nécessaire (DB_PASSWORD, JWT_SECRET, etc.)
nano .env

# Démarrer le serveur
npm run dev
```

Le backend démarre sur http://localhost:5000

### Étape 4: Configurer le Frontend
Ouvrez un nouveau terminal:

```bash
cd frontend

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Démarrer l'application
npm run dev
```

Le frontend démarre sur http://localhost:3000

### Étape 5: Utiliser l'application
1. Ouvrez http://localhost:3000
2. Créez un compte
3. Commencez à gérer vos projets !

---

## 🔧 Commandes Utiles

### Backend
```bash
# Mode développement (avec hot reload)
npm run dev

# Mode production
npm start

# Tests
npm test
```

### Frontend
```bash
# Mode développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview

# Lint
npm run lint
```

### Docker
```bash
# Démarrer tous les conteneurs
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter tous les conteneurs
docker-compose down

# Redémarrer après modification du code
docker-compose restart

# Reconstruire les images
docker-compose up -d --build
```

---

## 🎯 Premier Pas dans l'Application

### 1. Créer votre premier projet
- Cliquez sur "Nouveau projet" dans le dashboard
- Remplissez le nom et la description
- Choisissez une priorité et un statut
- Sauvegardez

### 2. Ajouter des tâches
- Ouvrez votre projet
- Cliquez sur "Nouvelle tâche"
- Définissez le titre, la description, la priorité
- Assignez la tâche (à vous-même ou un autre membre)
- Définissez une date d'échéance

### 3. Suivre la progression
- Retournez au Dashboard
- Voyez vos statistiques en temps réel
- Mettez à jour le statut de vos tâches
- Suivez la progression de vos projets

---

## ❓ Résolution de Problèmes

### Erreur de connexion à PostgreSQL
```bash
# Vérifier que PostgreSQL est démarré
sudo systemctl status postgresql

# Démarrer PostgreSQL
sudo systemctl start postgresql
```

### Port déjà utilisé
Si les ports 3000 ou 5000 sont déjà utilisés:
1. Modifiez le port dans `.env`
2. Redémarrez l'application

### Problèmes de dépendances
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Réinitialiser la base de données
```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Supprimer et recréer la base
DROP DATABASE project_manager;
CREATE DATABASE project_manager;
\q

# Redémarrer le backend (les tables seront recréées automatiquement)
cd backend && npm run dev
```

---

## 📚 Documentation Complète

Pour plus de détails, consultez le [README.md](./README.md)

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes, vérifiez:
1. Que PostgreSQL est démarré
2. Que les ports 3000, 5000 et 5432 sont disponibles
3. Que Node.js v18+ est installé
4. Les logs d'erreur dans la console

Bonne gestion de projets ! 🎉
