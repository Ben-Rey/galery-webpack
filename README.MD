# My Gallery
# CHEVALIER Anne claire, REYNES Benjamin, VELO Saïd

## Lien du projet sur Netlify : https://jolly-jones-e138ce.netlify.app/

## Commande pour lancer le serveur de notification :  
npm run start:server

## Stratégie  
Nous ne sommes pas parti de la correction  
Notre application requette l'API picsum afin d'ajouter des images random.

Nous stockons les images avec indexDB  

La partie Background Sync n'est pas terminée. Nous envoyons une requette lorsqu'on passse du mode Online à Offligne, la prochaine étape est de stocker plusieurs requettes dans indexDB et les lancer une fois Online.
