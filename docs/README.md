# 🌸 Estética Premium - Sistema de Reservas

Sistema profesional de gestión de citas para estéticas con panel administrativo, pagos de adelanto y base de datos.

## 📋 Características

✅ **Sistema de Citas Online**
- Reserva de citas de lunes a viernes
- Horarios: 9:00-13:00 y 16:00-20:00
- Disponibilidad automática en tiempo real
- Validación de datos del cliente

✅ **Datos del Cliente**
- Nombre completo
- Email (único)
- Teléfono validado
- Historial de citas

✅ **Sistema de Pagos**
- Adelanto opcional en la cita
- Integración con Stripe (listo para producción)
- Simulador de pago para pruebas
- Registro completo de transacciones

✅ **Panel Administrativo**
- Ver citas del día
- Gestionar todas las citas
- Administrar clientes
- Registro de pagos
- Estadísticas en tiempo real
- Editar estado de citas

✅ **Base de Datos Completa**
- MySQL con 5 tablas relacionadas
- Integridad referencial
- Índices optimizados

## 🚀 Instalación

### Requisitos
- XAMPP (PHP 7.4+, MySQL)
- Navegador moderno

### Pasos

1. **Descargar/Clonar el proyecto**
   ```
   Copiar carpeta 'estetica' a: C:\xampp\htdocs\
   ```

2. **Inicializar la Base de Datos**
   - Abrir navegador: `http://localhost/phpmyadmin`
   - Crear base de datos: `estetica_db`
   - Ejecutar script: Ingresa a `http://localhost/estetica/config/init_db.php`

   O ejecutar manualmente en phpMyAdmin:
   ```sql
   CREATE DATABASE estetica_db;
   USE estetica_db;
   
   CREATE TABLE clientes (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nombre VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL UNIQUE,
       telefono VARCHAR(20) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   CREATE TABLE citas (
       id INT AUTO_INCREMENT PRIMARY KEY,
       cliente_id INT NOT NULL,
       fecha DATE NOT NULL,
       hora TIME NOT NULL,
       servicio VARCHAR(100) NOT NULL,
       estado ENUM('pendiente', 'confirmada', 'completada', 'cancelada') DEFAULT 'pendiente',
       monto_adelanto DECIMAL(10, 2) DEFAULT 0,
       pago_realizado BOOLEAN DEFAULT FALSE,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
   );
   
   CREATE TABLE pagos (
       id INT AUTO_INCREMENT PRIMARY KEY,
       cita_id INT NOT NULL,
       monto DECIMAL(10, 2) NOT NULL,
       metodo_pago VARCHAR(50) NOT NULL,
       stripe_payment_id VARCHAR(255),
       estado ENUM('pendiente', 'completado', 'fallido') DEFAULT 'pendiente',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (cita_id) REFERENCES citas(id) ON DELETE CASCADE
   );
   
   CREATE TABLE servicios (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nombre VARCHAR(100) NOT NULL,
       descripcion TEXT,
       precio DECIMAL(10, 2) NOT NULL,
       duracion_minutos INT DEFAULT 60,
       activo BOOLEAN DEFAULT TRUE
   );
   
   INSERT INTO servicios (nombre, descripcion, precio) VALUES
   ('Limpieza Facial', 'Limpieza profunda y tratamiento facial', 45.00),
   ('Manicure', 'Manicure completa con esmalte', 35.00),
   ('Pedicure', 'Pedicure completa con esmalte', 40.00),
   ('Masaje Relajante', 'Masaje corporal relajante', 60.00),
   ('Depilación', 'Depilación con cera o hilo', 30.00),
   ('Corte de Cabello', 'Corte y peinado profesional', 50.00);
   ```

3. **Acceder a la Aplicación**
   - **Sitio Principal:** `http://localhost/estetica/`
   - **Panel Admin:** `http://localhost/estetica/admin.php`

## 📁 Estructura del Proyecto

```
estetica/
├── config/
│   ├── database.php          # Configuración de conexión
│   └── init_db.php           # Script de inicialización
├── api/
│   ├── horarios.php          # API de horarios disponibles
│   ├── citas.php             # API de reserva de citas
│   ├── pagos.php             # API de procesamiento de pagos
│   └── admin.php             # API del panel administrativo
├── css/
│   ├── style.css             # Estilos del sitio
│   └── admin.css             # Estilos del admin
├── js/
│   ├── funciones.js          # JavaScript del sitio
│   └── admin.js              # JavaScript del admin
├── index.php                 # Página principal
├── admin.php                 # Panel administrativo
└── README.md                 # Este archivo
```

## 🔧 Configuración de Stripe (Opcional)

Para usar pagos reales con Stripe:

1. Crear cuenta en [stripe.com](https://stripe.com)
2. Obtener claves API (Test o Live)
3. Modificar en `api/pagos.php`:
   ```php
   \Stripe\Stripe::setApiKey('sk_test_TU_CLAVE');
   ```
4. Agregar en `index.php`:
   ```html
   <script src="https://js.stripe.com/v3/"></script>
   ```
5. Inicializar Stripe en `js/funciones.js`

## 🎨 Personalización

### Cambiar Colores
Editar en `css/style.css`:
```css
:root {
    --primary-color: #ff6b9d;      /* Rosa principal */
    --secondary-color: #c44569;    /* Rosa secundario */
}
```

### Agregar más Servicios
En `config/init_db.php`, adicionar en el array de servicios o directo en phpMyAdmin

### Modificar Horarios
En `api/horarios.php`, cambiar los rangos:
```php
for ($h = 9; $h < 13; $h++)   // Mañana
for ($h = 16; $h < 20; $h++)  // Tarde
```

## 📊 Uso del Panel Administrativo

### Citas del Día
- Vista rápida de todas las citas del día actual
- Estados: Pendiente, Confirmada, Completada, Cancelada

### Todas las Citas
- Filtrar por fecha específica
- Ver historial completo
- Editar estado de cada cita

### Gestionar Clientes
- Ver todos los clientes registrados
- Historial de citas por cliente
- Fecha de registro

### Registro de Pagos
- Todas las transacciones
- Estado de cada pago
- Método de pago utilizado

### Estadísticas
- Citas este mes
- Total recaudado
- Clientes totales
- Citas pendientes

## 🔐 Seguridad

**Implementado:**
- Validación de emails
- Validación de teléfonos
- Validación de fechas y horarios
- Protección contra SQL injection (PDO prepared statements)
- Integridad de datos con foreign keys

**Para Producción:**
- Agregar autenticación al panel admin
- Implementar HTTPS
- Configurar CORS apropiadamente
- Usar variables de entorno para credenciales
- Agregar rate limiting
- Implementar 2FA para admin

## 💡 Tips

1. **Primera vez:** Ingresa a `init_db.php` para crear las tablas automáticamente
2. **Pruebas:** El sistema funciona sin Stripe, solo simula el pago
3. **Emails:** Puedes usar Mailgun o SendGrid para enviar confirmaciones
4. **Backup:** Hacer backup regular de la base de datos

## 🐛 Troubleshooting

### Error "Connection refused"
- Verificar que XAMPP esté iniciado
- Revisar que MySQL esté corriendo
- Revisar credenciales en `config/database.php`

### No carga la base de datos
- Entrar a `phpMyAdmin`
- Verificar que exista `estetica_db`
- Ejecutar el script `init_db.php`

### Los horarios no se cargan
- Verificar que la fecha sea un día laboral (lunes-viernes)
- Comprobar que la fecha sea en el futuro

## 📧 Soporte

Para más información o reportar bugs, contacta al desarrollador.

---

**Versión:** 1.0  
**Última actualización:** 2024  
**Licencia:** MIT
