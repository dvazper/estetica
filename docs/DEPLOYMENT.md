# 🌐 Guía de Despliegue a Servidor de Producción

## Pasos para Subir tu Estética a Internet

### Opción 1: Hosting Compartido (Recomendado para principiantes)

#### Requisitos del Hosting
- PHP 7.4 o superior
- MySQL 5.7 o superior
- Acceso a phpMyAdmin
- FTP o File Manager

#### Proveedores Recomendados
```
✅ Bluehost         - Excelente soporte, $2.95/mes
✅ HostGator        - Confiable, $2.75/mes
✅ A2Hosting        - Rápido, $2.99/mes
✅ Namecheap        - Barato, $1.99/mes
✅ Siteground       - Premium, $2.99/mes (primeros meses)
```

#### Pasos de Instalación

**1. Comprar dominio y hosting**
```
- Ir a proveedor (ejemplo: Namecheap.com)
- Comprar nombre: estetica-miombre.com
- Contratar hosting compartido
- Recibirás: usuario, contraseña, servidor FTP
```

**2. Crear base de datos**
```
- Acceder a cPanel (generalmente: tusitio.com/cpanel)
- Ir a: MySQL Databases
- Crear nueva BD: estetica_db
- Crear usuario: user_estetica
- Asignar todos los permisos
```

**3. Subir archivos por FTP**
```
Descargar: FileZilla (gratuito)
- Servidor: ftp.tusitio.com (dato del host)
- Usuario: usuario FTP
- Contraseña: contraseña FTP
- Puerto: 21 (por defecto)

Conectar y:
- Subir carpeta 'estetica' a: public_html/
```

**4. Importar base de datos**
```
- Acceder a phpMyAdmin via cPanel
- Seleccionar BD: estetica_db
- Ir a: Import
- Cargar archivo: database.sql
- Click en: Go
```

**5. Actualizar database.php**
```php
// config/database.php
define('DB_USER', 'user_estetica');      // Tu usuario MySQL
define('DB_PASS', 'tu_contraseña_aqui'); // Tu contraseña
define('DB_NAME', 'estetica_db');        // Nombre de BD
```

**6. Actualizar referencias de dominio**
```
Si tu dominio es: estetica-miombre.com

En index.php, admin.php, etc:
- Las URLs relativas funcionan automáticamente
- Pero verifica que funcione correctamente
```

**7. Probar**
```
- Abrir: https://estetica-miombre.com/
- Debe verse la página
- Ir a: init_db.php para verificar BD
- Hacer una cita de prueba
```

---

### Opción 2: VPS (Para usuarios avanzados)

#### Requisitos
- Conocimiento básico de Linux
- Acceso SSH
- Conocer Git

#### Pasos Rápidos

**1. Conectar por SSH**
```bash
ssh root@tu_ip_vps
```

**2. Instalar paquetes**
```bash
apt update
apt install -y apache2 mysql-server php php-mysql php-fpm

# Habilitar módulos
a2enmod rewrite
a2enmod ssl
systemctl restart apache2
```

**3. Clonar proyecto**
```bash
cd /var/www
git clone tu_repositorio.git estetica
cd estetica
chmod -R 755 config api

# Crear .env
cat > .env.example << 'EOF'
DB_HOST=localhost
DB_USER=root_estetica
DB_PASS=tu_contraseña_segura
DB_NAME=estetica_db
EOF
```

**4. Configurar base de datos**
```bash
mysql -u root << 'EOF'
CREATE DATABASE estetica_db;
CREATE USER 'root_estetica'@'localhost' IDENTIFIED BY 'tu_contraseña_segura';
GRANT ALL PRIVILEGES ON estetica_db.* TO 'root_estetica'@'localhost';
FLUSH PRIVILEGES;
EOF

# Importar estructura
mysql -u root_estetica -p estetica_db < database.sql
```

**5. Configurar SSL (HTTPS)**
```bash
# Instalar Certbot
apt install -y certbot python3-certbot-apache

# Generar certificado Let's Encrypt (GRATIS)
certbot certonly --apache -d estetica-miombre.com

# Actualizar .htaccess para forzar HTTPS
```

---

### Opción 3: Contenedores Docker (Para expertos)

#### Dockerfile
```dockerfile
FROM php:7.4-apache

# Instalar extensiones
RUN docker-php-ext-install pdo_mysql

# Copiar código
COPY . /var/www/html/

# Habilitar rewrite
RUN a2enmod rewrite

# Permisos
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "80:80"
    environment:
      - DB_HOST=db
      - DB_USER=estetica
      - DB_PASS=password123
    links:
      - db

  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: estetica_db
      MYSQL_USER: estetica
      MYSQL_PASSWORD: password123
    ports:
      - "3306:3306"
```

---

## 📋 Checklist Pre-Producción

### Seguridad
- [ ] Cambiar credenciales de BD
- [ ] Habilitar HTTPS (SSL/TLS)
- [ ] Actualizar .htaccess con reglas de seguridad
- [ ] Crear carpeta de admin privada
- [ ] Agregar autenticación al panel admin
- [ ] Validar todas las entradas (ya hecho)
- [ ] Usar variables de entorno para secretos

### Performance
- [ ] Habilitar compresión gzip
- [ ] Optimizar imágenes
- [ ] Minimizar CSS y JS
- [ ] Agregar caché de navegador
- [ ] Usar CDN para librerías (Bootstrap, etc)

### Backups
- [ ] Hacer backup diario de BD
- [ ] Hacer backup de archivos
- [ ] Guardar backups en lugar seguro
- [ ] Probar restaurar backups

### Emails
- [ ] Configurar SPF, DKIM, DMARC
- [ ] Usar librería PHPMailer
- [ ] Enviar confirmaciones automáticas

### Monitoreo
- [ ] Configurar alertas de errores
- [ ] Registrar actividad en logs
- [ ] Monitorear tiempo de respuesta
- [ ] Monitorear uso de BD

---

## 🛠️ Herramientas Útiles

### Para Administración Remota
```
✅ FileZilla     - Cliente FTP gratuito
✅ Putty         - Cliente SSH Windows
✅ Terminal      - SSH nativo Linux/Mac
✅ VS Code       - SSH Remote extension
```

### Para Performance
```
✅ GTmetrix      - Analizar velocidad (gratuito)
✅ Cloudflare    - CDN (parte gratis muy buena)
✅ Nginx         - Servidor alternativo rápido
```

### Para Seguridad
```
✅ SSL Labs      - Verificar certificado
✅ Nmap          - Escanear puertos
✅ ModSecurity   - WAF para Apache
```

---

## 💰 Presupuesto Estimado

### Mensual
```
Nombre de dominio:     $1-3     (anual)
Hosting compartido:    $2-10    (depende del proveedor)
CDN (Cloudflare):      GRATIS   (hay plan pago)
Email profesional:     GRATIS   (con dominio)
─────────────────────────────
TOTAL:                 $2-10/mes
```

### Una sola vez
```
Setup inicial:         $0-50    (si lo hace alguien)
Certificado SSL:       GRATIS   (Let's Encrypt)
```

---

## 📧 Configurar Email Profesional

### Con tu dominio

**Opción 1: Mailgun (Recomendado)**
```
- Ir a: mailgun.com
- Registrarse con dominio
- Agregar en PHP:

require 'vendor/autoload.php';
use Mailgun\Mailgun;

$mg = Mailgun::create('tu_api_key');
$mg->messages()->send('sandboxxxx.mailgun.org', [
  'from' => 'info@estetica-tuombre.com',
  'to' => 'cliente@example.com',
  'subject' => 'Confirmación de Cita',
  'text' => 'Tu cita está confirmada'
]);
```

**Opción 2: SendGrid**
```
- Registrarse en sendgrid.com
- Obtener API key
- Usar PHPMailer para enviar
```

---

## 🚨 Problemas Comunes en Producción

### "Base de datos no conecta"
```php
// Verificar credenciales
// Usar herramienta: MySQL Workbench
// Probar con phpMyAdmin
```

### "Permisos denegados"
```bash
# Solución
chmod 755 config/
chmod 755 api/
chmod 755 js/
chmod 755 css/
```

### "Emails no se envían"
```php
// Usar mail() no es confiable
// Usar librería como PHPMailer con SMTP
// O usar Mailgun/SendGrid
```

### "Sitio lento"
```
- Habilitar compresión gzip
- Usar CDN (Cloudflare)
- Agregar caché
- Optimizar BD con índices
```

---

## 🎯 Flujo Recomendado

```
1. Desarrollo local (XAMPP)        ← Aquí estás ahora
           ↓
2. Probar en staging (servidor test)
           ↓
3. Backup de todo
           ↓
4. Deploy a producción
           ↓
5. Probar que funcione
           ↓
6. Hacer publicidad
           ↓
7. Monitorear y mejorar
```

---

## 📞 Soporte

Si tienes problemas al desplegar:
1. Revisar logs (cPanel > Errors o SSH)
2. Contactar soporte del hosting
3. Buscar en Stack Overflow
4. Contactar al desarrollador

---

**¡Tu estética en internet en menos de 1 hora!** 🚀
