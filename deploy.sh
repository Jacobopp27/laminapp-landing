#!/bin/bash

# Script de Deploy para Hostinger VPS
# Configuración (edita estos valores)

VPS_USER="bahia"  # o el usuario que uses en el VPS
VPS_HOST="srv1164292"  # Reemplaza con tu IP del VPS o dominio
VPS_PATH="/home/bahia/apps/laminapp-landing"  # Ruta donde quieres el sitio
REPO_URL="https://github.com/Jacobopp27/laminapp-landing.git"
BRANCH="main"

echo "🚀 Iniciando deploy a Hostinger VPS..."

# Conectar al VPS y hacer deploy
ssh $VPS_USER@$VPS_HOST << 'ENDSSH'
    # Colores para output
    GREEN='\033[0;32m'
    BLUE='\033[0;34m'
    NC='\033[0m' # No Color

    echo -e "${BLUE}📦 Actualizando código...${NC}"
    
    # Si el repositorio no existe, clonarlo
    if [ ! -d "$VPS_PATH/.git" ]; then
        echo -e "${BLUE}📥 Clonando repositorio...${NC}"
        rm -rf $VPS_PATH/*
        git clone $REPO_URL $VPS_PATH
        cd $VPS_PATH
        git checkout $BRANCH
    else
        # Si ya existe, hacer pull
        echo -e "${BLUE}🔄 Actualizando repositorio existente...${NC}"
        cd $VPS_PATH
        git fetch origin
        git reset --hard origin/$BRANCH
        git pull origin $BRANCH
    fi
    
    # Ajustar permisos
    echo -e "${BLUE}🔐 Ajustando permisos...${NC}"
    chown -R www-data:www-data $VPS_PATH
    find $VPS_PATH -type d -exec chmod 755 {} \;
    find $VPS_PATH -type f -exec chmod 644 {} \;
    
    echo -e "${GREEN}✅ Deploy completado exitosamente!${NC}"
    echo -e "${GREEN}🌐 Tu sitio está en: http://$(curl -s ifconfig.me)${NC}"
ENDSSH

echo "✨ Deploy finalizado!"
