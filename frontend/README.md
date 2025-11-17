# Frontend Next.js - Gestionnaire de Projets

Application Next.js 14 moderne avec TypeScript, TailwindCSS, et App Router pour la gestion de projets et tâches.

## 🚀 Technologies

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **TailwindCSS** - Framework CSS utility-first
- **Zustand** - Gestion d'état moderne et légère
- **Axios** - Client HTTP
- **React Icons** - Bibliothèque d'icônes
- **React Toastify** - Notifications toast
- **date-fns** - Manipulation de dates
- **Recharts** - Graphiques React

## 📋 Fonctionnalités

### Améliorations par rapport à l'ancienne version (React + Vite)

1. **Performance**
   - Server-Side Rendering (SSR) pour un meilleur SEO
   - Optimisation automatique des images
   - Code splitting automatique
   - Prefetching des routes

2. **Developer Experience**
   - TypeScript pour la sécurité des types
   - App Router moderne de Next.js 14
   - Hot Module Replacement (HMR) ultra-rapide
   - Meilleure organisation du code

3. **Architecture**
   - Zustand au lieu de Context API (plus performant)
   - Structure de fichiers moderne avec App Router
   - API routes intégrées (optionnel)
   - Meilleure séparation des préoccupations

4. **Production Ready**
   - Build optimisé pour la production
   - Support Docker natif
   - Configuration standalone pour déploiement
   - Variables d'environnement sécurisées

## 📦 Installation

### Prérequis

- Node.js v18 ou supérieur
- npm ou yarn

### Installation locale

1. **Installer les dépendances**
```bash
cd frontend
npm install
```

2. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
```

Éditer `.env.local` :
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. **Démarrer en mode développement**
```bash
npm run dev
```

L'application sera disponible sur http://localhost:3000

### Build pour production

```bash
npm run build
npm start
```

## 🐳 Docker

### Développement avec Docker

```bash
docker-compose up frontend
```

### Production avec Docker

```bash
docker build -t pm-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:5000/api pm-frontend
```

## 📁 Structure du projet

```
frontend/
├── src/
│   ├── app/                    # App Router (pages)
│   │   ├── dashboard/         # Page Dashboard
│   │   ├── login/            # Page Login
│   │   ├── register/         # Page Register
│   │   ├── projects/         # Pages Projets
│   │   ├── tasks/            # Pages Tâches
│   │   ├── layout.tsx        # Layout racine
│   │   ├── page.tsx          # Page d'accueil
│   │   └── globals.css       # Styles globaux
│   │
│   ├── components/           # Composants React
│   │   ├── auth/            # Authentification
│   │   ├── common/          # Composants réutilisables
│   │   ├── dashboard/       # Composants Dashboard
│   │   ├── layout/          # Layouts
│   │   ├── projects/        # Composants Projets
│   │   └── tasks/           # Composants Tâches
│   │
│   └── lib/                 # Bibliothèques et utilitaires
│       ├── api/            # Services API
│       │   ├── auth.ts
│       │   ├── projects.ts
│       │   ├── tasks.ts
│       │   └── client.ts   # Configuration Axios
│       ├── store/          # Gestion d'état (Zustand)
│       │   └── auth-store.tsx
│       ├── types/          # Types TypeScript
│       │   └── index.ts
│       └── utils/          # Fonctions utilitaires
│           └── helpers.ts
│
├── public/                 # Fichiers statiques
├── .env.example           # Exemple de variables d'environnement
├── .env.local            # Variables d'environnement locales
├── next.config.mjs       # Configuration Next.js
├── tailwind.config.ts    # Configuration Tailwind
├── tsconfig.json         # Configuration TypeScript
├── package.json          # Dépendances
├── Dockerfile            # Dockerfile production
├── Dockerfile.dev        # Dockerfile développement
└── README.md            # Ce fichier
```

## 🔧 Scripts disponibles

- `npm run dev` - Démarrer en mode développement
- `npm run build` - Build pour la production
- `npm start` - Démarrer en mode production
- `npm run lint` - Linter le code
- `npm run type-check` - Vérifier les types TypeScript

## 🎨 Styling

Le projet utilise **TailwindCSS** avec une configuration personnalisée :

- Couleurs primaires définies
- Thème responsive
- Utility classes personnalisées
- Support du dark mode (à implémenter)

## 🔐 Authentification

L'authentification utilise :

- **JWT** stocké dans localStorage
- **Zustand** pour la gestion de l'état d'authentification
- **Axios interceptors** pour ajouter automatiquement le token
- **ProtectedRoute** composant pour protéger les routes

### Flux d'authentification

1. Utilisateur se connecte via `/login`
2. Token JWT reçu et stocké
3. Token ajouté automatiquement à chaque requête API
4. Si token invalide/expiré → redirection vers `/login`

## 📡 API Integration

Tous les appels API sont centralisés dans `src/lib/api/` :

- `auth.ts` - Authentification
- `projects.ts` - Gestion des projets
- `tasks.ts` - Gestion des tâches
- `client.ts` - Configuration Axios avec interceptors

### Exemple d'utilisation

```typescript
import { projectsApi } from '@/lib/api';

const fetchProjects = async () => {
  const response = await projectsApi.getProjects();
  if (response.success) {
    console.log(response.data.projects);
  }
};
```

## 🌐 Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL de l'API backend | `http://localhost:5000/api` |

**Important** : Les variables d'environnement accessibles côté client doivent commencer par `NEXT_PUBLIC_`

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connecter votre repo GitHub à Vercel
2. Configurer la variable `NEXT_PUBLIC_API_URL`
3. Déployer automatiquement

### Docker

Utiliser le `Dockerfile` fourni pour un déploiement en production :

```bash
docker build -t pm-frontend .
docker run -p 3000:3000 pm-frontend
```

### Autres plateformes

Next.js peut être déployé sur :
- Netlify
- AWS (Amplify, ECS, etc.)
- Google Cloud Platform
- Azure
- Serveur VPS avec Node.js

## 🔄 Migration depuis React + Vite

Cette version remplace complètement l'ancienne version React + Vite. Principales différences :

| Aspect | Ancien (Vite) | Nouveau (Next.js) |
|--------|---------------|-------------------|
| Routing | React Router | App Router |
| État | Context API | Zustand |
| Build | Vite | Next.js |
| Typage | JavaScript | TypeScript |
| SSR | Non | Oui |
| Images | `<img>` | `<Image>` optimisé |

## 📝 Bonnes pratiques

1. **Composants**
   - Utiliser "use client" pour les composants interactifs
   - Préférer les Server Components par défaut
   - Typer tous les props avec TypeScript

2. **API Calls**
   - Centraliser dans `lib/api/`
   - Gérer les erreurs avec try/catch
   - Afficher des toasts pour le feedback utilisateur

3. **État**
   - Utiliser Zustand pour l'état global
   - useState pour l'état local
   - Éviter les props drilling

4. **Performance**
   - Utiliser `<Image>` au lieu de `<img>`
   - Lazy loading des composants lourds
   - Optimiser les re-renders avec useMemo/useCallback

## 🐛 Debugging

### Logs côté serveur

```bash
# Voir les logs Docker
docker-compose logs -f frontend

# Logs Next.js
npm run dev -- --turbo
```

### DevTools

- React DevTools
- Network tab pour les API calls
- Console pour les erreurs

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## 🤝 Contribution

1. Créer une branche feature
2. Commit les changements
3. Push vers la branche
4. Créer une Pull Request

## 📄 Licence

MIT License - Libre d'utilisation

---

**Développé avec ❤️ et Next.js 14**
