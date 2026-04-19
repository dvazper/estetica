# 📚 Documentación Técnica - API

## Base de Datos

### Tabla: clientes
```sql
id              INT AUTO_INCREMENT PRIMARY KEY
nombre          VARCHAR(100) - Nombre del cliente
email           VARCHAR(100) - Email único
telefono        VARCHAR(20) - Teléfono de contacto
created_at      TIMESTAMP - Fecha de registro
```

### Tabla: citas
```sql
id              INT AUTO_INCREMENT PRIMARY KEY
cliente_id      INT - FK a clientes
fecha           DATE - Fecha de la cita
hora            TIME - Hora de la cita (HH:MM)
servicio        VARCHAR(100) - Nombre del servicio
estado          ENUM - pendiente|confirmada|completada|cancelada
monto_adelanto  DECIMAL(10,2) - Adelanto pagado
pago_realizado  BOOLEAN - Si pagó el adelanto
created_at      TIMESTAMP - Fecha de creación
```

### Tabla: pagos
```sql
id              INT AUTO_INCREMENT PRIMARY KEY
cita_id         INT - FK a citas
monto           DECIMAL(10,2) - Monto pagado
metodo_pago     VARCHAR(50) - stripe|paypal|efectivo|otro
stripe_payment_id VARCHAR(255) - ID de transacción Stripe
estado          ENUM - pendiente|completado|fallido
created_at      TIMESTAMP - Fecha del pago
```

### Tabla: servicios
```sql
id              INT AUTO_INCREMENT PRIMARY KEY
nombre          VARCHAR(100) - Nombre del servicio
descripcion     TEXT - Descripción
precio          DECIMAL(10,2) - Precio del servicio
duracion_minutos INT - Duración estimada
activo          BOOLEAN - Servicio disponible
```

## API Endpoints

### POST /api/horarios.php
**Obtener horarios disponibles**

Request:
```
action=obtener_horarios
fecha=2024-04-20
```

Response:
```json
{
  "horarios": ["09:00", "09:30", "10:00", ...]
}
```

Error:
```json
{
  "error": "La estética solo atiende de lunes a viernes"
}
```

---

### POST /api/citas.php
**Crear nueva cita**

Request:
```
action=crear_cita
nombre=Juan Pérez
email=juan@example.com
telefono=+52123456789
fecha=2024-04-20
hora=10:00
servicio=Limpieza Facial - $45
monto_adelanto=23.00
```

Response Success:
```json
{
  "success": true,
  "cita_id": 5,
  "mensaje": "Cita reservada exitosamente",
  "necesita_pago": true,
  "monto_adelanto": 23.00
}
```

Errores posibles:
```json
{"error": "Todos los campos son requeridos"}
{"error": "Email inválido"}
{"error": "Teléfono inválido"}
{"error": "La fecha debe ser en el futuro"}
{"error": "La estética solo atiende de lunes a viernes"}
{"error": "Horario no disponible"}
{"error": "Esa hora ya no está disponible"}
```

---

### POST /api/pagos.php
**Procesar pagos con Stripe**

Request (crear intent):
```
action=crear_intent_pago
cita_id=5
```

Response:
```json
{
  "success": true,
  "clientSecret": "pi_xxxx_secret_xxxx",
  "publicKey": "pk_test_xxxx"
}
```

Request (confirmar pago):
```
action=confirmar_pago
cita_id=5
payment_intent_id=pi_xxxx
```

Response:
```json
{
  "success": true,
  "mensaje": "Pago completado exitosamente"
}
```

---

### POST /api/admin.php

#### obtener_citas_fecha
**Ver citas de una fecha específica**

Request:
```
action=obtener_citas_fecha
fecha=2024-04-20
```

Response:
```json
{
  "citas": [
    {
      "id": 1,
      "fecha": "2024-04-20",
      "hora": "10:00",
      "servicio": "Limpieza Facial",
      "estado": "confirmada",
      "monto_adelanto": "45.00",
      "nombre_cliente": "Juan Pérez",
      "telefono": "+52123456789",
      "email": "juan@example.com"
    }
  ]
}
```

#### obtener_clientes
**Listar todos los clientes**

Request:
```
action=obtener_clientes
```

Response:
```json
{
  "clientes": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "telefono": "+52123456789",
      "created_at": "2024-04-10 15:30:00",
      "total_citas": 3
    }
  ]
}
```

#### obtener_pagos
**Listar todos los pagos**

Request:
```
action=obtener_pagos
```

Response:
```json
{
  "pagos": [
    {
      "id": 1,
      "cita_id": 5,
      "monto": "23.00",
      "estado": "completado",
      "metodo_pago": "stripe",
      "created_at": "2024-04-15 10:00:00",
      "cliente": "Juan Pérez"
    }
  ]
}
```

#### obtener_estadisticas
**Obtener estadísticas generales**

Request:
```
action=obtener_estadisticas
```

Response:
```json
{
  "citas_mes": 15,
  "total_pagos": "450.50",
  "clientes_totales": 42,
  "citas_pendientes": 3
}
```

#### actualizar_cita
**Cambiar estado de una cita**

Request:
```
action=actualizar_cita
cita_id=5
estado=completada
```

Response:
```json
{
  "success": true,
  "mensaje": "Cita actualizada"
}
```

---

## Validaciones

### Email
```python
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### Teléfono
```python
/^[\d\s\-\+\(\)]{7,}$/
```

### Fechas
- Debe ser en el futuro (no hoy ni pasado)
- Solo lunes a viernes
- Entre 9:00-13:00 o 16:00-20:00

---

## Seguridad

### SQL Injection
✅ Prevención: Use `PDO::prepare()` siempre

### XSS
✅ Prevención: Usar `htmlspecialchars()` en salidas HTML

### CSRF
✅ Considerar agregar tokens CSRF en producción

### Rate Limiting
Recomendado para API endpoints (usar middleware)

---

## Ejemplos de Integración

### JavaScript: Crear Cita
```javascript
const formData = new FormData();
formData.append('action', 'crear_cita');
formData.append('nombre', 'Juan');
formData.append('email', 'juan@example.com');
formData.append('telefono', '+52123456789');
formData.append('fecha', '2024-04-20');
formData.append('hora', '10:00');
formData.append('servicio', 'Limpieza Facial - $45');
formData.append('monto_adelanto', 23);

const response = await fetch('/api/citas.php', {
    method: 'POST',
    body: formData
});

const result = await response.json();
if (result.success) {
    console.log('Cita creada:', result.cita_id);
}
```

### PHP: Obtener Citas Próximas
```php
$stmt = $pdo->prepare("
    SELECT * FROM citas 
    WHERE fecha >= CURDATE() 
    AND estado != 'cancelada'
    ORDER BY fecha, hora
    LIMIT 10
");
$stmt->execute();
$citas = $stmt->fetchAll();
```

---

## Performance Tips

1. **Índices**: Ya configurados en foreign keys
2. **Caché**: Añadir Redis para estadísticas frecuentes
3. **Paginación**: Implementar en admin (ver >100 registros)
4. **Lazy Loading**: Cargar citas del mes, no del año
5. **Compress**: Habilitar gzip en `.htaccess`

---

## Extensiones Futuras

- [ ] Notificaciones por SMS
- [ ] Recordatorios por email 24h antes
- [ ] Múltiples empleados/roles
- [ ] Categorías de servicios
- [ ] Promociones y cupones
- [ ] App móvil (React Native)
- [ ] Integración con Google Calendar
- [ ] Sistema de reseñas
- [ ] Galería de trabajos

---

**Versión:** 1.0  
**Última actualización:** 2024
