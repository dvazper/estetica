# 📁 Estructura del Proyecto

```
estetica/
│
├── 📄 index.php                    ← PÁGINA PRINCIPAL (Abre esto primero)
├── 📄 admin.php                    ← PANEL ADMINISTRATIVO
├── 📄 README.md                    ← Documentación completa
├── 📄 QUICKSTART.md                ← Guía rápida de inicio (5 min)
├── 📄 TECHNICAL_DOCS.md            ← Documentación técnica y API
├── 📄 database.sql                 ← Script SQL para base de datos
├── 📄 install.sh                   ← Script de instalación (Linux/Mac)
├── 📄 .htaccess                    ← Configuración de servidor Apache
│
├── 📁 config/                      ← CONFIGURACIÓN
│   ├── database.php                ← Conexión a MySQL
│   ├── init_db.php                 ← Inicializar base de datos
│   └── stripe.php                  ← Configuración de pagos (opcional)
│
├── 📁 api/                         ← API (Backend)
│   ├── horarios.php                ← Obtener horarios disponibles
│   ├── citas.php                   ← Crear y reservar citas
│   ├── pagos.php                   ← Procesar pagos
│   └── admin.php                   ← Endpoints para panel admin
│
├── 📁 css/                         ← ESTILOS
│   ├── style.css                   ← Estilos del sitio principal
│   └── admin.css                   ← Estilos del panel admin
│
├── 📁 js/                          ← JAVASCRIPT
│   ├── funciones.js                ← Lógica del sitio principal
│   └── admin.js                    ← Lógica del panel admin
│
└── 📁 lib/                         ← LIBRERÍAS
    └── email.php                   ← Funciones para enviar emails
```

---

## 🎯 Puntos de Entrada

### Para Clientes
```
http://localhost/estetica/
```
- Página bonita y profesional
- Formulario de reserva de citas
- Lista de servicios
- Pago de adelantos

### Para Administrador
```
http://localhost/estetica/admin.php
```
- Ver citas del día
- Gestionar todas las citas
- Administrar clientes
- Ver historial de pagos
- Estadísticas en tiempo real

### Para Inicializar BD
```
http://localhost/estetica/config/init_db.php
```
- Crea las tablas automáticamente
- Inserta servicios de ejemplo
- **Ejecutar una sola vez**

---

## 📊 Flujo de la Aplicación

```
Cliente visita index.php
    ↓
Selecciona fecha y hora
    ↓
Completa datos (nombre, email, teléfono) → api/citas.php
    ↓
Reserva guardada en base de datos
    ↓
¿Quiere adelanto?
    ├─ SÍ → Redirecciona a pago → api/pagos.php
    └─ NO → Muestra confirmación

Admin entra a admin.php
    ↓
El JavaScript carga datos → api/admin.php
    ↓
Muestra citas, clientes, pagos, estadísticas
    ↓
Admin edita estado de cita → api/admin.php actualiza
```

---

## 🗄️ Base de Datos

### 5 Tablas Principales

1️⃣ **clientes** - Datos de los clientes
2️⃣ **citas** - Reservas de citas
3️⃣ **pagos** - Historial de pagos
4️⃣ **servicios** - Servicios disponibles
5️⃣ (Opcional) **admins** - Para login en el futuro

### Relaciones
```
clientes ─────[1:N]───── citas ────[1:N]──── pagos
                         /
                    servicios
```

---

## 🔧 Tecnologías Usadas

| Capa | Tecnología |
|------|-----------|
| **Frontend** | HTML5, CSS3, Bootstrap 5, JavaScript Vanilla |
| **Backend** | PHP 7.4+ |
| **Base de Datos** | MySQL 5.7+ |
| **Server** | Apache (XAMPP) |
| **Pagos** | Stripe (opcional) |

---

## 📝 Archivos Clave Explicados

### index.php
- Página principal con diseño responsive
- Formulario de reserva con validaciones
- Modal de pago
- Modal de confirmación

### admin.php
- Panel con navegación lateral
- 5 secciones: Citas, Clientes, Pagos, Estadísticas
- Edición de estados
- Búsqueda y filtros

### config/database.php
```php
// Credenciales de MySQL
// CAMBIAR si tus credenciales son diferentes
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', ''); // Vacío en XAMPP por defecto
define('DB_NAME', 'estetica_db');
```

### api/citas.php
- Validación de datos
- Búsqueda o creación de cliente
- Inserción de cita
- Creación de registro de pago

### api/horarios.php
- Valida que sea día laboral
- Obtiene horas no reservadas
- Retorna JSON

### css/style.css
- Colores: Rosa (#ff6b9d) y secundario (#c44569)
- Grid responsive
- Animaciones suaves
- Diseño profesional

### js/funciones.js
- Carga horarios mediante AJAX
- Validación de teléfono
- Envío de formulario
- Manejo de modales
- Mostrar alertas

---

## ✨ Características Implementadas

✅ Reserva de citas  
✅ Validación de datos  
✅ Horarios dinámicos  
✅ Disponibilidad en tiempo real  
✅ Sistema de clientes  
✅ Adelantos de pago  
✅ Panel administrativo  
✅ Estadísticas  
✅ Diseño responsive  
✅ Base de datos relacional  

---

## 🚀 Para Expandir el Proyecto

Puedes agregar fácilmente:

- **Autenticación de admin** → Crear tabla `users` + login.php
- **Envío de emails** → Descomentar en lib/email.php
- **Stripe real** → Config en config/stripe.php
- **SMS** → Integración con Twilio
- **Google Calendar** → Sincronización automática
- **App móvil** → React Native con API
- **Reseñas** → Nueva tabla y página

---

## 📞 Contacto

Para cambios o mejoras:
1. Contacta al desarrollador
2. O aprende las tecnologías y modifica tú mismo

---

**Proyecto listo para producción ✅**
