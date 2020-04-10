#############################################################
# Dockerfile para configurar aplicacion en node.js - Express#
#############################################################

#Imagen base: nodejs - version: lts (12.16.2)
FROM node:lts

#Informacion de Metadata
LABEL "cl.apgca.appNode"="Hero for Pets"
LABEL maintainer="brianpericon.e92@gmail.com"
LABEL version="0.1"

#Crear un directorio de trabajo 
RUN mkdir -p /opt/app
#Se establece el directorio de trabajo
WORKDIR /opt/app

#Instala los paquetes existentes en el package.json
COPY package.json .
RUN npm install --quiet

#Instalacion de Nodemon en forma Global
#Al realizarse cambios reiniciar el servidor
#RUN npm install nodemon -g --quiet

#Copia la aplicacion
COPY app-backend .

#Expone la aplicacion en el puerto 8080
EXPOSE 8080

#Inicia la aplicacion al inciar al contenedor
CMD [ "npm", "start" ]