# Boutik Safe — structure de déploiement

## Fichiers de ce dossier
- `index.html` — page d'accueil publique, avec les 3 boutons (Essayer sur le web / Télécharger l'APK / Installer sur PC)
- `app.html` — l'application elle-même (c'est ton ancien fichier corrigé)
- `manifest.webmanifest` — rend `app.html` installable (Android, PC, Mac)
- `sw.js` — service worker : permet à l'app de fonctionner hors-ligne une fois ouverte une première fois
- `icon-192.png`, `icon-512.png`, `icon-maskable-192.png`, `icon-maskable-512.png` — icônes générées automatiquement (vert + sac de courses). **À remplacer par ton vrai logo si tu en as un.**
- `downloads/boutik-safe.apk` — **dossier à créer toi-même** : dépose ton APK signé ici avec exactement ce nom, pour que le bouton "Télécharger l'APK" fonctionne. (Sinon change le lien dans `index.html`.)

## À faire sur GitHub / Vercel
1. Mets ces fichiers à la racine de ton repo (ou dans `/public` selon ta config Vercel).
2. Crée un dossier `downloads/` et mets ton `boutik-safe.apk` dedans.
3. `git add . && git commit -m "PWA + page de téléchargement" && git push`
4. Vercel redéploie automatiquement. Ton lien principal (`boutik-safe-m1n9.vercel.app`) affichera désormais la page d'accueil avec les 3 options, au lieu d'ouvrir directement l'app.

## ⚠️ Important concernant ton APK Capacitor/Cordova

Ton APK signé a été construit en LOCAL avec Capacitor : au moment du build, Capacitor a **copié une fois** le HTML/JS/CSS à l'intérieur du projet Android, puis Gradle a compilé et signé l'APK.

**Conséquence : les modifications faites ici (photos produits, emojis, corrections de bugs JS, etc.) ne sont PAS dans ton APK déjà signé.** L'APK est une photo figée du code au moment du build. Le déployer sur Vercel ne le met pas à jour tout seul — contrairement à une TWA (Trusted Web Activity) qui, elle, charge le site en direct.

### Pour mettre à jour l'APK avec les nouvelles corrections
1. Remplace le fichier HTML dans ton projet Capacitor (probablement `www/index.html` ou équivalent) par la nouvelle version d'`app.html`.
2. `npx cap sync android`
3. Ouvre le projet dans Android Studio (`npx cap open android`).
4. Génère un nouvel APK signé : **avec le même keystore** que la première fois (sinon Android considérera que c'est une appli différente, incompatible pour une mise à jour "par-dessus" l'ancienne).
5. `Build > Generate Signed Bundle / APK`, choisis le keystore existant.
6. Dépose le nouvel APK dans `downloads/boutik-safe.apk`.

### Alternative plus "pro" à terme
Une fois que `app.html` + `manifest.webmanifest` + `sw.js` sont en ligne sur Vercel avec HTTPS (ce qui sera le cas), tu peux générer un APK **TWA** via [pwabuilder.com](https://www.pwabuilder.com) en collant l'URL de `app.html`. Avantage : cette version-là se met à jour automatiquement à chaque déploiement Vercel, plus besoin de rebuild Android à chaque correction. Tu devras la signer avec un nouveau keystore la première fois (ou migrer), donc ce sera une nouvelle app du point de vue Android — à évaluer si tu veux remplacer complètement l'ancienne ou garder les deux en parallèle un temps.
