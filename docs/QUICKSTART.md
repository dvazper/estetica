# ⚡ Quick Start - Inicio Rápido

## 30 segundos para tener la aplicación funcionando

### Paso 1: Asegúrate que XAMPP esté ejecutándose
- Abre XAMPP Control Panel
- Inicia **Apache** y **MySQL**

### Paso 2: Inicializa la base de datos
1. Abre en tu navegador: **http://localhost/estetica/config/init_db.php**
2. Espera a que aparezca: ✓ Base de datos inicializada correctamente

### Paso 3: ¡Listo! Ahora accede a:
- **Sitio Principal:** http://localhost/estetica/
- **Panel Admin:** http://localhost/estetica/admin.php

---

## Prueba la funcionalidad

### 📅 Hacer una Reserva
1. En http://localhost/estetica/
2. Completa el formulario:
   - Nombre: Carlos
   - Email: carlos@example.com
   - Teléfono: +52 1234567890
   - Servicio: Limpieza Facial
   - Fecha: (elige lunes a viernes próximo)
   - Hora: (se cargarán automáticamente)
   - Adelanto: $23.00 (opcional)
3. Click en "Reservar Cita"

### 🔧 Panel Administrativo
1. Ve a http://localhost/estetica/admin.php
2. Explora las secciones:
   - 📅 Citas del Día
   - 📋 Todas las Citas
   - 👥 Gestionar Clientes
   - 💳 Registro de Pagos
   - 📊 Estadísticas

---

## Problemas Comunes

### ❌ "Error de conexión"
**Solución:**
```
1. Abre XAMPP Control Panel
2. Verifica que MySQL esté iniciado (botón verde)
3. Recarga la página
```

### ❌ "Base de datos no encontrada"
**Solución:**
1. Abre http://localhost/phpmyadmin
2. Verifica que exista base de datos "estetica_db"
3. Si no existe, ejecuta: http://localhost/estetica/config/init_db.php

### ❌ "No cargan los horarios"
**Solución:**
```
- Asegúrate de seleccionar un día laborable (lunes-viernes)
- La fecha debe ser en el futuro
- Recarga la página
```

---

## Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `index.php` | Página principal y formulario |
| `admin.php` | Panel administrativo |
| `config/database.php` | Conexión a BD |
| `config/init_db.php` | Inicializar tablas |
| `api/citas.php` | Crear reservas |
| `api/horarios.php` | Obtener horarios |
| `api/admin.php` | Datos del admin |

---

## Personalización Rápida

### Cambiar nombre de la estética
```php
// En index.php, línea ~25:
<a class="navbar-brand fw-bold" href="index.php">
    ✨ TU NOMBRE AQUI
</a>
```

### Agregar tu teléfono y email
```php
// En index.php, línea ~105 (footer):
<p>📞 Teléfono: TU_TELEFONO | 📧 Email: TU_EMAIL</p>
```

### Cambiar colores
```css
/* En css/style.css, línea ~1: */
:root {
    --primary-color: #ff6b9d;      /* Tu color aquí */
    --secondary-color: #c44569;    /* Tu color aquí */
}
```

---

## Próximos Pasos

1. **Configurar Stripe** (para pagos reales)
   - Lee: `config/stripe.php`

2. **Enviar emails** (confirmaciones)
   - Lee: `lib/email.php`

3. **Documentación completa**
   - Lee: `README.md`
   - Lee: `TECHNICAL_DOCS.md`

4. **Desplegar a servidor**
   - Consulta hosting como Namecheap, Bluehost, A2Hosting
   - Asegúrate que tengan PHP 7.4+ y MySQL

---

## Contacto y Soporte

- 📧 Email: soporte@example.com
- 💬 Chat: www.example.com
- 🆘 Docs: Ver README.md y TECHNICAL_DOCS.md

---

**¡Listos! Tu aplicación está funcionando** ✅
