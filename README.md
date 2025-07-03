# InfluMaroc - Plateforme de Collaboration Influenceurs-Marques

Une plateforme complète connectant les marques marocaines avec les influenceurs pour des collaborations marketing authentiques. Construite avec React, TypeScript, et Tailwind CSS.

## 🌟 Aperçu

InfluMaroc est une application web moderne qui facilite les connexions transparentes entre les marques et les influenceurs au Maroc. La plateforme fournit des tableaux de bord basés sur les rôles, la gestion de campagnes, des systèmes de messagerie, et des analyses complètes pour rationaliser les flux de travail du marketing d'influence.

## 🚀 Fonctionnalités

### Système d'Authentification Multi-Rôles
- **Inscription Marque**: Détails de l'entreprise, sélection d'industrie, intégration de site web
- **Inscription Influenceur**: Profils de réseaux sociaux, sélection de niche, métriques d'abonnés
- **Accès Admin**: Capacités de gestion et modération de plateforme
- **Connexion Démo**: Comptes pré-configurés pour les tests (marque@example.com, influenceur@example.com, admin@example.com)

### Tableau de Bord & Fonctionnalités Marque
- **Assistant de Création de Campagne**: Processus en 4 étapes pour créer des campagnes détaillées
  - Détails et objectifs de campagne
  - Configuration budget et calendrier
  - Exigences influenceurs (niches, abonnés, plateformes)
  - Directives de contenu et standards de marque
- **Gestion de Campagnes**: Voir, éditer, et suivre toutes les campagnes
- **Découverte d'Influenceurs**: Système de recherche et filtrage avancé
- **Tableau de Bord Analytics**: Suivi ROI, métriques d'engagement, analyse des dépenses
- **Outils de Collaboration**: Messagerie directe avec les influenceurs

### Tableau de Bord & Fonctionnalités Influenceur
- **Gestion de Profil**: Édition de profil complète avec intégration réseaux sociaux
- **Demandes de Campagne**: Examiner et répondre aux offres de collaboration de marques
- **Vitrine Portfolio**: Afficher le travail précédent avec métriques de performance
- **Suivi des Gains**: Surveiller les revenus et statistiques de croissance
- **Profil Public**: Page de profil professionnelle pour la découverte par les marques

### Panneau Admin
- **Gestion Utilisateurs**: Supervision et modération complètes des utilisateurs
- **Modération Campagnes**: Examiner et approuver/rejeter les campagnes
- **Analytics Système**: Statistiques et insights à l'échelle de la plateforme
- **Supervision Contenu**: Surveiller l'activité de la plateforme et assurer la qualité

### Système de Communication
- **Messagerie Temps Réel**: Communication directe entre marques et influenceurs
- **Gestion Conversations**: Fils de messages organisés avec fonctionnalité de recherche
- **Système de Notifications**: Alertes temps réel pour les mises à jour importantes
- **Partage de Fichiers**: Support pour images et pièces jointes dans les conversations

## 📱 Pages & Composants

### Pages d'Authentification
- **Page de Connexion** (`/login`): Authentification multi-rôles avec comptes démo
- **Page d'Inscription** (`/register`): Processus d'inscription en deux étapes avec champs spécifiques aux rôles

### Pages Marque
- **Tableau de Bord Marque** (`/brand/dashboard`): Aperçu des campagnes, stats, et influenceurs recommandés
- **Créer Campagne** (`/brand/create-campaign`): Assistant de création de campagne multi-étapes
- **Gérer Campagnes** (`/brand/campaigns`): Aperçu campagne avec outils de filtrage et gestion
- **Trouver Influenceurs** (`/brand/find-influencers`): Recherche et découverte d'influenceurs avancée

### Pages Influenceur
- **Tableau de Bord Influenceur** (`/influencer/dashboard`): Métriques de performance, demandes en attente, campagnes actives
- **Demandes de Campagne** (`/influencer/requests`): Examiner et gérer les offres de collaboration de marques
- **Vue Profil** (`/influencer/profile`): Profil public avec portfolio et statistiques
- **Éditer Profil** (`/influencer/edit-profile`): Interface de gestion de profil complète

### Pages Admin
- **Tableau de Bord Admin** (`/admin/dashboard`): Analytics système et activité récente
- **Gestion Utilisateurs** (`/admin/users`): Supervision utilisateurs avec recherche et filtrage
- **Modération Campagnes** (`/admin/campaigns`): Examiner et modérer les campagnes de la plateforme

### Pages Partagées
- **Messages** (`/messages`): Aperçu conversations avec fonctionnalité de recherche
- **Conversation** (`/messages/:id`): Interface de conversation individuelle avec messagerie temps réel
- **Page 404** (`/*`): Page personnalisée non trouvée avec navigation basée sur les rôles

## 🛠 Architecture Technique

### Stack Frontend
- **React 18**: React moderne avec hooks et composants fonctionnels
- **TypeScript**: Sécurité de type complète et expérience développeur améliorée
- **Tailwind CSS**: Framework CSS utility-first pour design responsive
- **React Router**: Routage côté client avec routes protégées
- **Lucide React**: Icônes belles et personnalisables

### Gestion d'État
- **Context API**: Gestion authentification utilisateur et notifications
- **Local Storage**: Sessions utilisateur persistantes et historique notifications
- **React Hooks**: Gestion d'état au niveau composant

### Composants Clés
- **Système de Layout**: Layouts basés sur les rôles avec barres latérales responsives
- **Routes Protégées**: Gardes de route basés sur les rôles utilisateur et authentification
- **Système de Notifications**: Notifications temps réel avec persistance
- **États de Chargement**: Indicateurs de chargement cohérents dans toute l'app
- **Validation de Formulaires**: Validation côté client avec retour utilisateur

## 🎨 Système de Design

### Palette de Couleurs
- **Primaire**: Violet (#7C3AED) - Identité de marque et actions primaires
- **Secondaire**: Sarcelle (#14B8A6) - Actions secondaires et surlignages
- **Succès**: Vert (#10B981) - États de succès et actions positives
- **Avertissement**: Jaune (#F59E0B) - États d'avertissement et éléments en attente
- **Erreur**: Rouge (#EF4444) - États d'erreur et actions destructives
- **Neutre**: Échelle de gris pour texte et arrière-plans

### Typographie
- **Titres**: Hiérarchie audacieuse et claire avec espacement cohérent
- **Texte Corps**: Tailles de police lisibles avec hauteur de ligne appropriée
- **Éléments Interactifs**: Retour visuel clair pour toutes les interactions

### Principes de Layout
- **Design Responsive**: Approche mobile-first avec points de rupture
- **Espacement Cohérent**: Système de grille 8px pour layouts uniformes
- **Hiérarchie Visuelle**: Architecture d'information claire
- **Accessibilité**: Contrastes de couleurs et navigation conformes WCAG

## 📊 Modèles de Données

### Types d'Utilisateurs
- **Marque**: Profils d'entreprise avec données industrie et campagne
- **Influenceur**: Profils créateurs avec métriques réseaux sociaux
- **Admin**: Administrateurs plateforme avec capacités de modération

### Système de Campagne
- **Création Campagne**: Assistant multi-étapes avec exigences complètes
- **Processus de Candidature**: Propositions influenceurs et réponses marques
- **Suivi Collaboration**: Surveillance progrès et gestion livrables

### Système de Messagerie
- **Conversations**: Messagerie basée sur fils entre utilisateurs
- **Mises à Jour Temps Réel**: Livraison de messages en direct et accusés de lecture
- **Support Fichiers**: Partage d'images et documents

## 🔐 Fonctionnalités de Sécurité

### Authentification
- **Contrôle d'Accès Basé sur les Rôles**: Protection de route stricte basée sur les rôles utilisateur
- **Gestion de Session**: Gestion de tokens sécurisée et déconnexion automatique
- **Validation d'Entrée**: Validation côté client avec vérification côté serveur

### Protection des Données
- **Sécurité de Type**: TypeScript assure l'intégrité des données
- **Assainissement**: Assainissement d'entrée pour prévenir les attaques XSS
- **Contrôles de Confidentialité**: Protection des données utilisateur et gestion du consentement

## 🚀 Démarrage

### Prérequis
- Node.js 18+ 
- Gestionnaire de paquets npm ou yarn

### Installation
```bash
# Cloner le dépôt
git clone <repository-url>

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

### Comptes Démo
- **Marque**: marque@example.com / password
- **Influenceur**: influenceur@example.com / password  
- **Admin**: admin@example.com / password

## 📈 Améliorations Futures

### Fonctionnalités Planifiées
- **Intégration Paiement**: Traitement de paiement sécurisé pour campagnes
- **Analytics Avancées**: Métriques de performance détaillées et rapports
- **Calendrier de Contenu**: Planification de campagnes et planification de contenu
- **Intégration API**: Intégrations plateformes réseaux sociaux
- **App Mobile**: Applications mobiles natives pour iOS et Android

### Améliorations Techniques
- **Intégration Base de Données**: Remplacer données fictives par vraie base de données
- **Fonctionnalités Temps Réel**: Intégration WebSocket pour mises à jour en direct
- **Optimisation Performance**: Division de code et chargement paresseux
- **Suite de Tests**: Tests unitaires et d'intégration complets
- **Pipeline de Déploiement**: CI/CD automatisé avec environnements de staging

## 🤝 Contribution

Ce projet suit les pratiques modernes de développement React avec TypeScript pour la sécurité de type et Tailwind CSS pour le style. La base de code est organisée avec une séparation claire des préoccupations et des composants réutilisables.

### Directives de Développement
- **Structure de Composants**: Composants fonctionnels avec hooks
- **Sécurité de Type**: Couverture TypeScript complète
- **Design Responsive**: Approche mobile-first
- **Organisation de Code**: Structure de fichiers basée sur les fonctionnalités
- **Performance**: Rendu optimisé et gestion d'état

## 📄 Licence

Ce projet est construit comme une démonstration des pratiques modernes de développement web et de l'architecture d'application full-stack.

---

**InfluMaroc** - Connecter les Marques avec les Voix Authentiques du Maroc