# Analyse du profil GitHub — DCAlexandre

> Analyse de [github.com/DCAlexandre](https://github.com/DCAlexandre) selon trois regards : recruteur, client, expert dev.
> Date : 2026-09-28

## Ce qui est réellement là

| Élément | Constat |
|---|---|
| Bio / README | Très soigné : Tech Lead 10 ans, IA appliquée (Claude/MCP/RAG), stack full-stack, 8 projets présentés avec badges |
| Repos publics | **4** seulement : `DCAlexandre` (le README, HTML, 1⭐), `dc_design_system` (JS, 2021), `rdp_connect` (JS, 2021), `factur-x` (fork Python, 2020) |
| Social proof | 4 followers · 6 following · 4 stars |
| Points clés | Tous les projets vitrine (Dokart, Kared Flip, Comète Link…) pointent vers des **sites externes / stores**, jamais vers du code GitHub |

**Point central** que les trois audiences perçoivent : le discours est celui d'un senior confirmé, mais le GitHub lui-même ne contient presque aucun code à regarder. Tout ce qui impressionne est privé ou externe.

---

## 👔 Vue recruteur

**Ce qui accroche :** le README est excellent — clair, structuré, vend une histoire (Tech Lead, +100k utilisateurs, IA en prod, certifs Anthropic 2025 très actuelles). Un recruteur non-technique ou un sourcer y voit immédiatement un profil premium et lisible. La carte de stats + snake donne une impression d'activité.

**Ce qui refroidit :** un recruteur tech attentif voit 4 repos, 4 followers, 4 stars, dernière activité publique « réelle » en 2020-2021. L'écart entre « 10 ans, Tech Lead » et l'empreinte publique crée un doute — pas sur les compétences, mais sur la **vérifiabilité**. Il ne peut rien confirmer par lui-même.

**Verdict :** bon pour passer le premier filtre, insuffisant si l'étape suivante est « montre-moi ton code ».

## 🤝 Vue client (freelance)

**Ce qui accroche :** c'est là que le profil marche le mieux. Un client se fiche du code — il veut de la réassurance et des preuves de livraison. Les projets nommés avec liens vers des apps live (stores, sites en prod), « publié en 6 semaines », « +100k utilisateurs », le focus IA : tout ça rassure et différencie. Ça ressemble à une **landing page commerciale**, et pour vendre du freelance c'est plutôt réussi.

**Ce qui refroidit :** un client n'atterrit presque jamais sur GitHub — il vient de Malt, LinkedIn ou du portfolio. Cette page bien construite est donc probablement **vue par les mauvaises personnes** au regard de son ton. Risque : un client averti (CTO de PME) clique, voit 4 repos vides, et l'effet est contre-productif par rapport au discours.

## 🧑‍💻 Vue expert dev / futur pair technique

Le regard le plus sévère, et le plus important à entendre.

- **Rien à auditer.** Aucun des projets sérieux n'est public. Un dev senior juge sur le code : archi, tests, commits, gestion des edge cases. Ici il ne peut rien juger.
- **Les seuls repos publics jouent contre vous** : `dc_design_system` et `rdp_connect` datent de 2021 et sont modestes ; `factur-x` est un fork sans modif visible. Ça ne reflète pas un Tech Lead 2026.
- **Signaux d'hygiène manquants** : pas de licence, pas de README sur les repos, pas de contribution OSS visible, pas de code d'exemple sur l'IA/MCP alors que c'est l'argument différenciant n°1.
- **Le côté « automatisé » peut se retourner** : carte stats maison + snake, c'est sympa, mais un pair peut lire ça comme « beaucoup de mise en scène, peu de substance publique ». Les badges d'achievements (YOLO, Pull Shark) pèsent zéro pour un senior.

**En résumé,** un pair pense : *« Le README dit senior, le GitHub dit débutant/inactif. »* L'incohérence est le vrai problème, pas le niveau.

---

## Le verdict en une phrase

Un **excellent support marketing déguisé en profil GitHub** : parfait pour un client, correct pour un premier filtre RH, **faible dès qu'un technicien veut vérifier**. Le README sur-promet ce que le contenu public sous-livre.

## Plan d'action, par priorité

1. **Décider de l'intention du profil.** Si GitHub = vitrine client → l'assumer et rediriger le trafic technique ailleurs. Si GitHub doit crédibiliser techniquement → il faut du code public. On ne peut pas gagner les deux avec l'état actuel.
2. **Rendre publics 1 à 2 vrais projets** (ou en extraire des morceaux propres) : le serveur MCP/RAG « AskAlex », un starter React 19 + Vite (ce portfolio lui-même !), ou une lib. Un seul repo soigné, testé, documenté vaut tout le README.
3. **Épingler de vrais repos** au lieu de projets qui ne pointent que vers l'externe. Un lecteur veut « voir », pas « croire ».
4. **Nettoyer / moderniser ou archiver** `dc_design_system` et `rdp_connect`, ou les remplacer comme vitrine. Ajouter licence + README partout.
5. **Un peu d'OSS ciblé** (issues/PR sur des libs utilisées : MUI, Vite, une lib MCP) : construit followers/stars *vérifiables* et donne du contexte à un pair.
6. **Aligner le discours sur la preuve** : chaque affirmation forte du README gagnerait un lien cliquable vers du concret (repo, démo, étude de cas).

Le socle narratif est excellent — il ne lui manque que des **preuves publiques** pour que les trois audiences racontent la même histoire.
