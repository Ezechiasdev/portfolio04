# Portfolio — Ezéchias

Site portfolio de développeur web & mobile freelance.
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · GSAP · Three.js · next-intl · next-themes · Resend.

---

## 1. Lancer le projet en local

Il faut **Node.js 20 ou plus récent**.

```bash
npm install        # la première fois seulement
npm run dev        # site de développement sur http://localhost:3000
```

Autres commandes :

| Commande        | Rôle                                                  |
| --------------- | ----------------------------------------------------- |
| `npm run build` | compile la version de production (à faire avant de publier) |
| `npm run start` | lance la version compilée                             |
| `npm run lint`  | vérifie la qualité du code                            |

Le français est à l'adresse `/`, l'anglais à `/en`.

---

## 2. Modifier tes informations

**Tout se trouve dans le dossier `content/`**, aucun texte personnel n'est écrit dans les composants.
Remplace toutes les valeurs entre crochets `[ ... ]`.

| Fichier                 | Contenu                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| `content/site.ts`       | nom, titre, accroche, WhatsApp, e-mail, réseaux sociaux, CV, photo, disponibilité, chiffres |
| `content/projects.ts`   | la liste des projets et leurs études de cas                             |
| `content/experience.ts` | ton parcours (expériences, formations, « prochaine étape »)             |
| `messages/fr.json`      | textes de l'interface en français (boutons, titres, formulaire…)       |
| `messages/en.json`      | les mêmes textes en anglais                                             |

Chaque texte de `content/` existe en deux versions : `{ fr: "...", en: "..." }`.

### Numéro WhatsApp

Dans `content/site.ts`, écris ton numéro au format international, par exemple `"+229 01 23 45 67 89"`.
Les boutons WhatsApp ouvrent une discussion avec le message pré-rempli `whatsappMessage`.

### Photo et CV

- **Photo** : place ta photo dans `public/images/` (ex. `photo.jpg`, format portrait), puis change `photo: "/images/photo.jpg"` dans `content/site.ts`.
- **CV** : place ton CV dans `public/cv.pdf` (ou change `cvUrl`).

### Disponibilité

`available: true` affiche le badge vert « Disponible » et le disque qui tourne. Mets `false` quand ton agenda est plein.

---

## 3. Ajouter un projet

1. Mets la capture dans `public/images/projets/` (format paysage, idéalement 1200 × 750 px, en `.jpg`, `.png` ou `.webp`).
2. Dans `content/projects.ts`, copie un bloc `{ ... }` existant et modifie-le :
   - `slug` : identifiant unique sans espace ni accent (ex. `"boutique-ama"`) ; la page sera `/projets/boutique-ama` ;
   - `category` : `"web"`, `"mobile"`, `"ecommerce"` ou `"demo"` ;
   - `featured: true` pour le mettre en avant (projet phare, un seul) ;
   - `link` : adresse du site ou de l'appli en ligne (laisser `""` s'il n'y en a pas) ;
   - `caseStudy` : problème, solution, résultat et captures supplémentaires (`gallery`).
3. C'est tout : la carte, le filtre, la page d'étude de cas et le sitemap se mettent à jour tout seuls.

---

## 4. Configurer le formulaire de contact (Resend)

Le formulaire envoie un e-mail grâce à [Resend](https://resend.com) (gratuit jusqu'à 3 000 e-mails par mois).

1. Crée un compte sur resend.com.
2. Va dans **API Keys** → **Create API Key** et copie la clé (`re_...`).
3. Copie le fichier `.env.example` en `.env.local` et remplis-le :

   ```env
   NEXT_PUBLIC_SITE_URL=https://www.ton-domaine.com
   RESEND_API_KEY=re_ta_cle
   CONTACT_TO_EMAIL=ton-email@exemple.com
   CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
   ```

4. Redémarre `npm run dev`.

> Sans domaine vérifié, Resend n'envoie qu'à l'adresse de ton compte Resend, depuis `onboarding@resend.dev`.
> Pour envoyer depuis ta propre adresse (ex. `contact@ton-domaine.com`), ajoute ton domaine dans **Domains** sur Resend, ajoute les enregistrements DNS demandés, puis change `CONTACT_FROM_EMAIL`.

Protection anti-spam : un champ caché (« honeypot ») et un délai minimal de 3 secondes avant l'envoi. Les messages des robots sont ignorés sans erreur.

---

## 5. Déployer sur Vercel avec ton nom de domaine

1. Mets le dossier `site/` sur GitHub :
   ```bash
   git add .
   git commit -m "Premier commit du portfolio"
   git branch -M main
   git remote add origin https://github.com/TON-PSEUDO/portfolio.git
   git push -u origin main
   ```
2. Sur [vercel.com](https://vercel.com), connecte-toi avec GitHub → **Add New… → Project** → choisis le dépôt → **Deploy**.
   Vercel détecte Next.js tout seul.
3. Dans **Settings → Environment Variables**, ajoute les 4 variables de `.env.example` avec tes vraies valeurs, puis **Redeploy**.
4. **Nom de domaine** : **Settings → Domains → Add**, entre ton domaine (ex. `ton-domaine.com`).
   Vercel affiche les enregistrements DNS à créer chez ton registraire (un enregistrement `A` vers `76.76.21.21` pour le domaine nu, un `CNAME` vers `cname.vercel-dns.com` pour `www`). Le certificat HTTPS est automatique.
5. Vérifie que `NEXT_PUBLIC_SITE_URL` correspond bien à ce domaine (sert au référencement et aux images de partage).

Ensuite, chaque `git push` met le site à jour automatiquement.

---

## 6. Organisation du code

```
content/            tes informations (à modifier)
messages/           textes de l'interface (fr / en)
public/images/      photo, captures de projets
src/
  app/
    [locale]/       pages (accueil, projets/[slug], 404, image de partage)
    api/contact/    envoi du formulaire
    sitemap.ts, robots.ts, icon.svg
    globals.css     couleurs (modes sombre et clair), grille, animations
  components/
    layout/         en-tête, pied de page, réseaux, halo, retour en haut
    sections/       accueil, à propos, expertise, projets, expérience, contact
    three/          décor 3D de l'accueil et sa version statique
    ui/             petits composants réutilisables
  i18n/             langues (français par défaut, anglais)
  lib/              lien WhatsApp, validation du formulaire
  proxy.ts          gestion des langues dans les adresses
```

### Couleurs

Les couleurs sont dans `src/app/globals.css` : bloc `.dark` (mode sombre, par défaut) et bloc `.light` (mode clair).

### Accessibilité et animations

- Le décor 3D n'est chargé qu'après le contenu, et remplacé par une version statique légère si l'appareil est peu puissant ou sans WebGL.
- Si le visiteur a demandé moins d'animations dans son système, elles sont coupées (3D, apparitions, ligne du parcours).
