# 🚀 GUÍA DE INICIO - ESTÉTICA PREMIUM

¡Tu sistema de reservas está listo! Aquí te mostramos qué hacer ahora.

---

## ⚡ INICIO RÁPIDO (1 minuto)

### 1. Abre XAMPP
- Desktop: Click en XAMPP Control Panel
- Inicia **Apache** y **MySQL** (click en Start)

### 2. Inicializa la BD
- Abre navegador: **http://localhost/estetica/config/init_db.php**
- Espera el mensaje: ✓ Base de datos inicializada

### 3. ¡Prueba!
- Sitio: **http://localhost/estetica/**
- Admin: **http://localhost/estetica/admin.php**

---

## 📚 DOCUMENTACIÓN

Lee los archivos en este orden:

### 1️⃣ Primer vistazo (5 min)
📄 **QUICKSTART.md** - Inicio rápido y pruebas
- ✓ Cómo hacer tu primera reserva
- ✓ Cómo acceder al admin
- ✓ Solución a problemas simples

### 2️⃣ Entender la estructura (10 min)
📄 **ESTRUCTURA.md** - Organización del proyecto
- ✓ Qué va en cada carpeta
- ✓ Flujo de la aplicación
- ✓ Cómo expandir

### 3️⃣ Guía completa (20 min)
📄 **README.md** - Documentación principal
- ✓ Instalación detallada
- ✓ Características y cómo usarlas
- ✓ Personalización

### 4️⃣ Technical (si quieres modificar)
📄 **TECHNICAL_DOCS.md** - Para desarrolladores
- ✓ Endpoints de API
- ✓ Esquema de base de datos
- ✓ Ejemplos de código

### 5️⃣ Poner online
📄 **DEPLOYMENT.md** - Subir a internet
- ✓ Hosting recomendado
- ✓ Paso a paso
- ✓ Checklist de seguridad

---

## 🎯 TUS PRIMERAS TAREAS

### ✅ Tarea 1: Explorar
```
⏱️ Tiempo: 5 minutos
1. Abre http://localhost/estetica/
2. Mira la página (se ve bien, ¿no?)
3. Lee la lista de servicios
4. Nota el formulario de reservas
```

### ✅ Tarea 2: Hacer una cita de prueba
```
⏱️ Tiempo: 5 minutos
1. Completa el formulario con datos ficticios
2. Elige una fecha (lunes a viernes)
3. Los horarios se cargan automáticamente
4. Click en "Reservar Cita"
5. ¡Listo! Recibirás confirmación
```

### ✅ Tarea 3: Ver cita en admin
```
⏱️ Tiempo: 3 minutos
1. Ve a http://localhost/estetica/admin.php
2. Mira "Citas del Día"
3. Verás tu cita de prueba
4. Click en "Editar" para cambiar estado
```

### ✅ Tarea 4: Personalizar
```
⏱️ Tiempo: 15 minutos
1. Abre index.php en editor (VS Code)
2. Busca "Estética Premium" en línea 25
3. Cámbialo por tu nombre
4. Busca "(555) 123-4567" en línea 105
5. Pon tu teléfono
6. Guarda (Ctrl+S) y recarga navegador
```

### ✅ Tarea 5: Cambiar colores
```
⏱️ Tiempo: 5 minutos
1. Abre css/style.css
2. Línea ~1: :root { --primary-color: #ff6b9d; }
3. Cámbialo a tu color favorito
4. Guarda y recarga
5. Verifica que todo se vea bien
```

---

## 📁 CARPETAS Y ARCHIVOS IMPORTANTES

```
¿Dónde está qué?

index.php                    ← PÁGINA PRINCIPAL (clientes)
admin.php                    ← PANEL ADMINISTRATIVO
config/init_db.php           ← CREAR BASE DE DATOS (ejecutar una vez)
config/database.php          ← CREDENCIALES (cambiar si es necesario)
api/citas.php                ← Guardar citas
api/horarios.php             ← Cargar horarios
api/admin.php                ← Datos para admin
css/style.css                ← ESTILOS (cambiar colores aquí)
js/funciones.js              ← Lógica del sitio
js/admin.js                  ← Lógica del admin
database.sql                 ← ESTRUCTURA DB (SQL puro)
```

---

## 🔧 CONFIGURACIONES IMPORTANTES

### Base de Datos (si XAMPP cambió la contraseña)
```
config/database.php
Línea 3: define('DB_USER', 'root');
Línea 4: define('DB_PASS', ''); ← Cambiar si existe contraseña
```

### Zona Horaria
```
config/database.php
Línea 12: date_default_timezone_set('America/Mexico_City');
Línea 12: ↑ Cambiar según tu zona
```

### Nombre de la Estética
```
index.php
Línea 25: ✨ Estética Premium  ← Cambiar aquí
Línea 105: (555) 123-4567     ← Cambiar teléfono
Línea 105: info@estetica...   ← Cambiar email
```

---

## ❓ PREGUNTAS FRECUENTES

### P: ¿Funciona sin internet?
**R:** Sí, completamente. Pero necesitas XAMPP corriendo localmente.

### P: ¿Cómo pongo mi teléfono?
**R:** En index.php, línea 105, reemplaza el teléfono.

### P: ¿Cómo agrego más servicios?
**R:** En phpmyadmin → servicios → Insert new row
(O ver database.sql para estructura)

### P: ¿Cuántas citas puedo tener?
**R:** Ilimitadas. La BD puede con millones.

### P: ¿Se puede integrar Stripe?
**R:** Sí, ver config/stripe.php y TECHNICAL_DOCS.md

### P: ¿Se puede enviar emails?
**R:** Sí, ver lib/email.php (descomentar código)

### P: ¿Qué pasa si borro una cita?
**R:** Se elimina del admin, pero puedes restaurar desde backup

### P: ¿Es seguro para usar en producción?
**R:** Casi. Antes de subir a internet, ver DEPLOYMENT.md

---

## 🚨 PROBLEMAS COMUNES Y SOLUCIONES

### ❌ "Conexión rechazada"
**Solución:**
1. Abre XAMPP Control Panel
2. Verifica que MySQL esté GREEN (iniciado)
3. Recarga la página

### ❌ "Tabla no existe"
**Solución:**
1. Abre http://localhost/estetica/config/init_db.php
2. Espera el mensaje ✓
3. Recarga

### ❌ "No cargan los horarios"
**Solución:**
1. Selecciona un día laborable (lunes-viernes)
2. La fecha debe ser en el futuro
3. Recarga el navegador

### ❌ "El formulario no envía"
**Solución:**
1. Verifica que tengas conexión MySQL
2. Abre consola (F12) y mira errores
3. Copia el error y busca en Google

---

## 🎨 PERSONALIZACIÓN FÁCIL

### Cambiar colores (sin saber código)
```
1. Abre: https://www.color-hex.com/
2. Elige un color bonito
3. Copia el código (ej: #FF6B9D)
4. Abre: css/style.css
5. Línea 3: --primary-color: #FF6B9D;
6. Pega el nuevo código
7. Guarda (Ctrl+S)
8. Recarga navegador (Ctrl+R)
```

### Cambiar servicios
```
1. Abre: http://localhost/phpmyadmin
2. Selecciona BD: estetica_db
3. Abre tabla: servicios
4. Edita o agrega servicios
5. Actualiza index.php línea ~106 con los nuevos
```

### Cambiar horarios
```
1. Abre: api/horarios.php
2. Línea 11-12:
   for ($h = 9;  $h < 13; $h++)   ← Cambiar 9 y 13
   for ($h = 16; $h < 20; $h++)   ← Cambiar 16 y 20
3. Guarda
4. Prueba
```

---

## 📈 PRÓXIMOS PASOS

### Semana 1
- [x] Instalar y probar localmente
- [ ] Personalizar colores y nombre
- [ ] Agregar tus servicios correcto
- [ ] Hacer pruebas de citas

### Semana 2
- [ ] Leer DEPLOYMENT.md
- [ ] Elegir hosting (Bluehost, Namecheap, etc)
- [ ] Comprar dominio

### Semana 3
- [ ] Subir a servidor (FTP)
- [ ] Importar BD (phpMyAdmin del hosting)
- [ ] Probar que funcione

### Semana 4+
- [ ] Anunciar tu sitio
- [ ] Monitorear citas
- [ ] Mejorar según feedback

---

## 💪 TIPS PRO

✅ **Backup de BD:**
```
Abre phpmyadmin → estetica_db → Export → Go
Guarda el .sql en lugar seguro
```

✅ **Ver citas en el mes:**
```
Admin → Todas las Citas → Filtra por fecha
```

✅ **Editar una cita:**
```
Admin → Todas las Citas → Botón "Editar" → Cambiar estado
```

✅ **Ver cuánto recaudaste:**
```
Admin → Estadísticas → "Total Recaudado"
```

---

## 📞 SOPORTE

Si necesitas ayuda:
1. Lee la documentación (README.md, TECHNICAL_DOCS.md)
2. Busca tu problema en: Troubleshooting section
3. Si persiste, Google es tu amigo
4. último recurso: Contacta al desarrollador

---

## 🏁 ¡LISTO!

Tu sistema está completamente instalado y funcionando.

**Checklist final:**
- [x] XAMPP corriendo
- [x] BD creada
- [x] Sitio principal funciona
- [x] Admin funciona
- [x] Puedo hacer citas
- [x] Veo citas en admin

**Próximo paso:** Personaliza y sube a internet

---

**¡Éxito con tu Estética! 🌸**

Si tienes dudas, recuerda:
- Documentación está en los .md
- Todo código está comentado
- Puedes modificar todo

**¡A brillar!** ✨
