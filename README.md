# Boutik Safe
Développé par GNANHOUI Etienne.

## Fichiers principaux
- index.html : page de présentation et point d'entrée
- application.html : l'application elle-même
- app-release.apk : APK Android signé (généré depuis Android Studio / Capacitor)
- manifest.json + service-worker.js : installation en tant qu'app (PWA) et cache hors ligne
- icon-192.png / icon-512.png / icon-512-maskable.png : icônes de l'application
- images/ : visuels locaux fixes des différentes catégories

## Installation
- **Android** : téléchargez et installez `app-release.apk` directement, ou installez la
  version PWA depuis le navigateur (menu ⋮ → « Installer l'application »).
- **PC** : ouvrez `application.html` dans le navigateur, ou installez-la comme application
  via l'icône d'installation de la barre d'adresse (Chrome/Edge).

## Déploiement
Pour que l'installation PWA et le mode hors ligne fonctionnent correctement, ce dossier
doit être servi via HTTPS (ex. Vercel, Netlify, GitHub Pages) — pas ouvert directement
depuis le disque (file://), sinon le service worker ne s'enregistre pas. Le téléchargement
de l'APK fonctionne quel que soit l'hébergement.

