# Étape de build
FROM node:18-alpine as build

#/app
WORKDIR  /Users/Guidon/cv-creator-app/client/

# Copier les fichiers package*.json d'abord pour optimiser le cache
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Modifier cette ligne dans le Dockerfile du client
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Construire l'application pour la production
RUN npm run build

# Étape de production avec Nginx
FROM nginx:alpine

# Copier les fichiers de build dans le dossier de Nginx
COPY --from=build /Users/Guidon/cv-creator-app/build /usr/share/nginx/html

# Copier la configuration Nginx personnalisée si nécessaire
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]