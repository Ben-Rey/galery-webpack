# My Gallery
# CHEVALIER Anne claire, REYNES Benjamin, VELO Saïd

## Lien du projet sur Netlify : https://jolly-jones-e138ce.netlify.app/

## Commande pour lancer le serveur de notification :  
npm run start:server

## Stratégie  
Nous ne sommes pas parti de la correction  
Notre application requette l'API picsum afin d'ajouter des images random.

Nous stockons les images avec indexDB  

Lorsque l'utilisateur enregistre une image dans ses favoris et qu'il est hors ligne, une tache est stockée dans indexDB permettant la synchronisation du server une fois la connexion rétablie.
