document.addEventListener('DOMContentLoaded', function() {
    configurarFecha();
    agregarEventos();
});

function configurarFecha() {
    const fechaInput = document.getElementById('fechaInput');
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 1);
    fechaInput.min = hoy.toISOString().split('T')[0];
}

function agregarEventos() {
    const formulario = document.getElementById('formReserva');
    const fechaInput = document.getElementById('fechaInput');

    fechaInput.addEventListener('change', cargarHorarios);
    formulario.addEventListener('submit', enviarSolicitud);
}

function cargarHorarios(e) {
    const fecha = e.target.value;
    const horaSelect = document.getElementById('horaSelect');

    if (!fecha) {
        horaSelect.disabled = true;
        horaSelect.innerHTML = '<option value="">Selecciona una fecha primero</option>';
        return;
    }

    const dia = new Date(fecha).getDay();
    if (dia === 0 || dia === 6) {
        mostrarAlerta('Solo trabajan de lunes a viernes. Por favor elige otra fecha.', 'danger');
        horaSelect.disabled = true;
        horaSelect.innerHTML = '<option value="">Solo lunes a viernes</option>';
        return;
    }

    horaSelect.disabled = false;
    horaSelect.innerHTML = '<option value="">Selecciona una hora</option>';

    const horarios = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
        '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
    ];

    horarios.forEach(hora => {
        const option = document.createElement('option');
        option.value = hora;
        option.textContent = hora;
        horaSelect.appendChild(option);
    });
}

function validarTelefono(telefono) {
    const regex = /^[\d\s\-\+\(\)]{7,}$/;
    return regex.test(telefono);
}

function enviarSolicitud(e) {
    e.preventDefault();

    const form = document.getElementById('formReserva');
    const formData = new FormData(form);
    const nombre = formData.get('nombre').trim();
    const email = formData.get('email').trim();
    const telefono = formData.get('telefono').trim();
    const servicio = formData.get('servicio');
    const fecha = formData.get('fecha');
    const hora = formData.get('hora');
    const monto = parseFloat(formData.get('monto_adelanto')) || 0;

    if (!validarTelefono(telefono)) {
        mostrarAlerta('El teléfono ingresado no es válido.', 'danger');
        return;
    }

    const subject = encodeURIComponent('Solicitud de cita - Loto Spa');
    const bodyText =
        `Nombre: ${nombre}\r\n` +
        `Email: ${email}\r\n` +
        `Teléfono: ${telefono}\r\n` +
        `Servicio: ${servicio}\r\n` +
        `Fecha: ${fecha}\r\n` +
        `Hora: ${hora}\r\n` +
        `Adelanto: ${monto.toFixed(2)}€\r\n\r\n` +
        `Por favor, confirma mi reserva.`;
    const body = encodeURIComponent(bodyText);

    const mailto = `mailto:info@lotospa.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    mostrarAlerta('Se ha abierto tu correo para enviar la solicitud. Revisa el mensaje y envíalo.', 'success');
}

function mostrarAlerta(mensaje, tipo = 'success') {
    const alertasDiv = document.getElementById('alertas');
    const alert = document.createElement('div');
    alert.className = `alert alert-${tipo} alert-dismissible fade show`;
    alert.setAttribute('role', 'alert');
    alert.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    alertasDiv.innerHTML = '';
    alertasDiv.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 7000);
}
