# Laminapp Landing Page

Landing page para Laminapp - Tu álbum de stickers del Mundial 2026

## 🚀 Deploy en Hostinger VPS

### Requisitos previos
- VPS de Hostinger con Ubuntu/Debian
- Servidor web (Apache o Nginx) instalado
- Git instalado en el VPS
- Acceso SSH al VPS

### Configuración inicial del VPS

#### 1. Conectarse al VPS
```bash
ssh root@TU_IP_VPS
```

#### 2. Instalar dependencias (si no están instaladas)
```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Git
apt install git -y

# Instalar Nginx (o Apache)
apt install nginx -y

# Iniciar Nginx
systemctl start nginx
systemctl enable nginx
```

#### 3. Configurar Nginx (Opcional - para dominio personalizado)
```bash
# Crear configuración del sitio
nano /etc/nginx/sites-available/laminapp
```

Añade esta configuración:
```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Compresión gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
}
```

```bash
# Activar el sitio
ln -s /etc/nginx/sites-available/laminapp /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Deploy automático

#### 1. Editar el script de deploy
```bash
nano deploy.sh
```

Actualiza estas variables:
- `VPS_USER`: Tu usuario SSH (generalmente `root`)
- `VPS_HOST`: La IP de tu VPS
- `VPS_PATH`: Ruta donde quieres el sitio (ej: `/var/www/html`)

#### 2. Dar permisos de ejecución
```bash
chmod +x deploy.sh
```

#### 3. Ejecutar deploy
```bash
./deploy.sh
```

### Deploy manual (alternativa)

Si prefieres hacerlo manualmente:

```bash
# 1. Conectarse al VPS
ssh root@TU_IP_VPS

# 2. Ir al directorio web
cd /var/www/html

# 3. Clonar el repositorio (primera vez)
git clone https://github.com/Jacobopp27/laminapp-landing.git .

# 4. Para actualizaciones futuras
git pull origin main
```

### 🔒 Configurar HTTPS con Let's Encrypt (Recomendado)

```bash
# Instalar Certbot
apt install certbot python3-certbot-nginx -y

# Obtener certificado SSL
certbot --nginx -d tudominio.com -d www.tudominio.com

# Renovación automática (ya viene configurado)
systemctl status certbot.timer
```

## 📝 Estructura del proyecto

```
laminapp-landing/
├── index.html          # Página principal
├── privacy.html        # Política de privacidad
├── terms.html          # Términos y condiciones
├── style.css           # Estilos
├── script.js           # JavaScript
├── images/             # Recursos gráficos
├── deploy.sh           # Script de deploy
└── README.md           # Este archivo
```

## 🔄 Workflow de desarrollo

1. Hacer cambios localmente
2. Commit y push a GitHub:
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push origin main
   ```
3. Ejecutar deploy:
   ```bash
   ./deploy.sh
   ```

## 🆘 Solución de problemas

### Error de permisos SSH
```bash
# En tu máquina local, generar clave SSH si no existe
ssh-keygen -t rsa -b 4096

# Copiar clave al VPS
ssh-copy-id root@TU_IP_VPS
```

### Nginx no se inicia
```bash
# Ver logs de error
tail -f /var/log/nginx/error.log

# Verificar configuración
nginx -t
```

### Git no actualiza
```bash
# Conectarse al VPS
ssh root@TU_IP_VPS
cd /var/www/html

# Forzar actualización
git fetch origin
git reset --hard origin/main
```

## 📞 Soporte

Para problemas específicos de Hostinger, contacta su soporte técnico.
