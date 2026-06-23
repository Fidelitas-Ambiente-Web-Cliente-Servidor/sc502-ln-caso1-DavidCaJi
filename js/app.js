const menu = [
  { nombre: 'Bruschetta Clásica',     descripcion: 'Pan tostado con tomate y albahaca fresca',   precio: 4500,  categoria: 'Entrada'       },
  { nombre: 'Tabla de Quesos',         descripcion: 'Selección de quesos importados con mermelada', precio: 7800,  categoria: 'Entrada'       },
  { nombre: 'Lomo al Vino Tinto',      descripcion: 'Lomo de res en reducción de vino tinto',      precio: 15500, categoria: 'Plato Fuerte'  },
  { nombre: 'Pasta Carbonara',         descripcion: 'Pasta con tocino, huevo y queso parmesano',    precio: 10200, categoria: 'Plato Fuerte'  },
  { nombre: 'Salmón a la Plancha',     descripcion: 'Filete de salmón con vegetales al vapor',      precio: 13800, categoria: 'Plato Fuerte'  },
  { nombre: 'Tiramisú',               descripcion: 'Postre italiano con café y mascarpone',         precio: 5200,  categoria: 'Postre'        },
  { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá',    precio: 4800,  categoria: 'Postre'        },
];

const reservas = [];

let categoriaActual = 'Todos';

// Se renderizan las tajetas del menu
function renderMenu() {
  const contenedorMenu = document.getElementById('contenedor-menu');
  contenedorMenu.innerHTML = '';

  const platosFiltrados = categoriaActual === 'Todos'
    ? menu
    : menu.filter(plato => plato.categoria === categoriaActual);

  platosFiltrados.forEach(plato => {
    const columna = document.createElement('div');
    columna.classList.add('col-12', 'col-md-6', 'col-lg-4');

    const card = document.createElement('div');
    card.classList.add('card-plato');

    const nombre = document.createElement('h3');
    nombre.textContent = plato.nombre;

    const categoria = document.createElement('p');
    categoria.classList.add('categoria');
    categoria.textContent = plato.categoria;

    const descripcion = document.createElement('p');
    descripcion.textContent = plato.descripcion;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.textContent = `₡${plato.precio.toLocaleString('es-CR')}`;

    card.appendChild(nombre);
    card.appendChild(categoria);
    card.appendChild(descripcion);
    card.appendChild(precio);

    columna.appendChild(card);
    contenedorMenu.appendChild(columna);
  });
}

// Filtrar platillos y acutalizar el boton
function filtrarCategoria(categoria) {
  categoriaActual = categoria;

  const botones = document.querySelectorAll('.btn-filtro');

  botones.forEach(boton => {
    boton.classList.remove('activo');

    if (boton.dataset.categoria === categoria) {
      boton.classList.add('activo');
    }
  });

  renderMenu();
}

// Validar los campos
function validarFormulario() {
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const fecha = document.getElementById('fecha');
  const personas = document.getElementById('personas');
  const btnReserva = document.getElementById('btn-reserva');
  const errorNombre = document.getElementById('error-nombre');
  const errorCorreo = document.getElementById('error-correo');
  const errorFecha = document.getElementById('error-fecha');
  const errorPersonas = document.getElementById('error-personas');
  let formularioValido = true;
  const regexNombre = /^[A-Za-z ]+$/;
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  errorNombre.textContent = '';
  errorCorreo.textContent = '';
  errorFecha.textContent = '';
  errorPersonas.textContent = '';
  if (nombre.value.trim() === '') {
    errorNombre.textContent = 'El nombre completo es obligatorio.';
    formularioValido = false;
  } else if (nombre.value.trim().length < 5) {
    errorNombre.textContent = 'El nombre debe tener mínimo 5 caracteres.';
    formularioValido = false;
  } else if (!regexNombre.test(nombre.value.trim())) {
    errorNombre.textContent = 'El nombre solo puede contener letras y espacios.';
    formularioValido = false;
  }

  if (correo.value.trim() === '') {
    errorCorreo.textContent = 'El correo electrónico es obligatorio.';
    formularioValido = false;

  } else if (!regexCorreo.test(correo.value.trim())) {
    errorCorreo.textContent = 'Ingrese un correo electrónico válido.';
    formularioValido = false;
  }

  if (fecha.value === '') {
    errorFecha.textContent = 'La fecha de reserva es obligatoria.';
    formularioValido = false;

  } else {
    const fechaSeleccionada = new Date(fecha.value + 'T00:00:00');
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
      errorFecha.textContent = 'La fecha no puede ser una fecha pasada.';
      formularioValido = false;
    }
  }

  const cantidadPersonas = Number(personas.value);

  if (personas.value === '') {
    errorPersonas.textContent = 'El número de personas es obligatorio.';
    formularioValido = false;


  } else if (cantidadPersonas < 1 || cantidadPersonas > 20) {
    errorPersonas.textContent = 'El número de personas debe estar entre 1 y 20.';
    formularioValido = false;
  }

  btnReserva.disabled = !formularioValido;

  return 
  formularioValido;
}

// Agrega una reserva que sea valida para la tabla y limpia el formulario
function agregarReserva() {


  if (!validarFormulario()) {
    return;
  }

  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const fecha = document.getElementById('fecha');
  const hora = document.getElementById('hora');
  const personas = document.getElementById('personas');
  const comentarios = document.getElementById('comentarios');
  const formulario = document.getElementById('form-reserva');
  const tablaReservas = document.getElementById('tabla-reservas');
  const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
  const nuevaReserva = {
    nombre: nombre.value.trim(),
    correo: correo.value.trim(),
    fecha: fecha.value,
    hora: hora.value,
    personas: Number(personas.value),
    comentarios: comentarios.value.trim()
  };
  reservas.push(nuevaReserva);

  const fila = document.createElement('tr');
  fila.classList.add('fila-reserva');


  if (nuevaReserva.personas >= 6) {
    fila.classList.add('vip');
  }

  const celdaNombre = document.createElement('td');
  celdaNombre.textContent = nuevaReserva.nombre;

  const celdaCorreo = document.createElement('td');
  celdaCorreo.textContent = nuevaReserva.correo;

  const celdaFecha = document.createElement('td');
  celdaFecha.textContent = nuevaReserva.fecha;

  const celdaHora = document.createElement('td');
  celdaHora.textContent = nuevaReserva.hora;

  const celdaPersonas = document.createElement('td');
  celdaPersonas.textContent = nuevaReserva.personas;

  fila.appendChild(celdaNombre);
  fila.appendChild(celdaCorreo);
  fila.appendChild(celdaFecha);
  fila.appendChild(celdaHora);
  fila.appendChild(celdaPersonas);

  tablaReservas.appendChild(fila);

  mensajeConfirmacion.textContent = 'Reserva registrada correctamente.';

  formulario.reset();

  document.getElementById('btn-reserva').disabled = true;

  actualizarResumen();
}

// Actualizar el resumen reservas registradas
function actualizarResumen() {
  const resumen = document.getElementById('resumen-reservas');

  const totalReservas = reservas.length;
  const totalPersonas = reservas.reduce((total, reserva) => total + reserva.personas, 0);
  let reservaMayor = 'Ninguna';

  if (reservas.length > 0) {
    const mayor = reservas.reduce((maxima, reserva) => {
      return reserva.personas > maxima.personas ? reserva : maxima;


    });

    reservaMayor = `${mayor.nombre} (${mayor.personas} personas)`;
  }
  resumen.innerHTML = `
    <p>Total de reservas registradas: ${totalReservas}</p>
    <p>Total de personas esperadas: ${totalPersonas}</p>
    <p>Reserva con mayor número de personas: ${reservaMayor}</p>
  `;
}

document.addEventListener('DOMContentLoaded', function () {
  renderMenu();

  const botonesFiltro = document.querySelectorAll('.btn-filtro');

  const formulario = document.getElementById('form-reserva');
  const camposFormulario = ['nombre', 'correo', 'fecha', 'personas'];

  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', function () {
      filtrarCategoria(boton.dataset.categoria);
    });
  });

  camposFormulario.forEach(idCampo => {
    document.getElementById(idCampo).addEventListener('input', validarFormulario);
  });

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    agregarReserva();
  });
});