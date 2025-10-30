//Controlador principal
//Funciones

//CRUD (Create, Read, Update, Delete)
//Función Agregar Empleado (C - Crear)
function crearEmpleado(){

	document.getElementById('divAgregarEmpleado').style.display='block';
	//alert("Entró a crear Empleado");
}

function calcularAdicion(tipo){
      switch((tipo||'').toUpperCase()){
        case 'A': return 200000;
        case 'B': return 150000;
        case 'C': return 100000;
        case 'D': return 50000;
        default: return 0;
      }
}
      


function agregarEmpleado(){
	alert ("entró a agregar empleado");

	// Cargar empleados guardados al iniciar
    document.addEventListener("DOMContentLoaded", mostrarEmpleados);

    // Manejar envío del formulario
    document.getElementById('formEmpleado').addEventListener('submit', function(e) {
      e.preventDefault();

      const empleado = new Empleado(
        document.getElementById('cc').value,
        document.getElementById('nombresyApellidos').value,
        document.getElementById('direccion').value,
        document.getElementById('email').value,
        document.getElementById('telefono').value,
        document.getElementById('sueldoBase').value,
        document.getElementById('tipoEmpleado').value,
        document.getElementById('tipoBonificacion').value
      );

      // Obtener lista existente o crear nueva
      let empleados = JSON.parse(localStorage.getItem('empleados')) || [];

      // Agregar nuevo empleado
      empleados.push(empleado);

      // Guardar nuevamente
      localStorage.setItem('empleados', JSON.stringify(empleados));

      // Actualizar tabla
      mostrarEmpleados();

      // Limpiar formulario
      e.target.reset();
    });

    // Mostrar empleados en tabla
    function mostrarEmpleados() {
      const tbody = document.querySelector('#tablaEmpleados tbody');
      tbody.innerHTML = '';

      const empleados = JSON.parse(localStorage.getItem('empleados')) || [];

      empleados.forEach((emp,index) => {
        const fila = `<tr>
          <td>${index + 1}</td> <!-- Aquí se genera el número autoincremento con el index del array -->
          <td>${emp.cc}</td>
          <td>${emp.nombresyApellidos}</td>
          <td>${emp.direccion}</td>
          <td>${emp.email}</td>
          <td>${emp.telefono}</td>
          <td>${emp.sueldoBase}</td>
          <td>${emp.tipoEmpleado}</td>
          <td>${emp.tipoBonificacion}</td>
          <td>${emp.tipoBonificacion}</td>
          <td>${Number(emp.sueldoTotal).toLocaleString()}</td>
        </tr>`;
        tbody.innerHTML += fila;
      });
    }
    
}

  (function(){
    const LS_KEY = 'empleados';

    function obtenerEmpleados(){
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    }
    function guardarEmpleados(list){
      localStorage.setItem(LS_KEY, JSON.stringify(list));
    }
    function calcularAdicion(tipo){
      switch((tipo||'').toUpperCase()){
        case 'A': return 200000;
        case 'B': return 150000;
        case 'C': return 100000;
        case 'D': return 50000;
        default: return 0;
      }
    }

    // Toggle display del div de agregar
    window.crearEmpleado = function(){
      const div = document.getElementById('divAgregarEmpleado');
      div.style.display = (div.style.display === 'none' || div.style.display === '') ? 'block' : 'none';
    };

    // Añade un empleado desde el formulario y guarda en localStorage
    window.agregarEmpleado = function(){
      const form = document.getElementById('formEmpleado');
      const cc = form.querySelector('#cc').value.trim();
      if(!cc){ alert('CC es requerido'); return; }

      const sueldoBase = Number(form.querySelector('#sueldoBase').value) || 0;
      const tipoBonificacion = form.querySelector('#tipoBonificacion').value;
      const adicion = calcularAdicion(tipoBonificacion);
      const empleado = {
        cc,
        nombresyApellidos: form.querySelector('#nombresyApellidos').value.trim(),
        direccion: form.querySelector('#direccion').value.trim(),
        email: form.querySelector('#email').value.trim(),
        telefono: form.querySelector('#telefono').value.trim(),
        sueldoBase: sueldoBase,
        tipoEmpleado: form.querySelector('#tipoEmpleado').value,
        tipoBonificacion: tipoBonificacion,
        adicion: adicion,
        sueldoTotal: sueldoBase + adicion
      };

      const empleados = obtenerEmpleados();
      empleados.push(empleado);
      guardarEmpleados(empleados);
      form.reset();
      renderTabla();
      document.getElementById('mensajes').classList.remove('d-none');
      document.getElementById('mensajes').textContent = 'Empleado agregado correctamente';
      setTimeout(()=> document.getElementById('mensajes').classList.add('d-none'), 2500);
    };

    // Borra todos los empleados (para pruebas)
    window.borrarEmpleados = function(){
      if(!confirm('Eliminar todos los empleados del localStorage?')) return;
      localStorage.removeItem(LS_KEY);
      renderTabla();
    };

    // Renderiza la tabla (#tablaEmpleados tbody) y el total de nómina
    function renderTabla(){
      let empleados = obtenerEmpleados();

      // Si no hay empleados, inicializar con los ejemplos mostrados en el HTML original
      if(empleados.length === 0){
        empleados = [
          { cc: '10768776555', nombresyApellidos:'Doe', direccion:'Aguachica', email:'doe@gmail.com', telefono:'3153801813', sueldoBase:100000, tipoEmpleado:'Fijo', tipoBonificacion:'C', adicion: calcularAdicion('C'), sueldoTotal:100000+calcularAdicion('C') },
          { cc: '10768776545', nombresyApellidos:'Calletana López Baleta', direccion:'Aguachica', email:'ky@gmail.com', telefono:'3153801813', sueldoBase:100000, tipoEmpleado:'Fijo', tipoBonificacion:'A', adicion: calcularAdicion('A'), sueldoTotal:100000+calcularAdicion('A') },
          { cc: '10768776500', nombresyApellidos:'José Rodríguez', direccion:'Aguachica', email:'jose@gmail.com', telefono:'3153801813', sueldoBase:500000, tipoEmpleado:'Fijo', tipoBonificacion:'C', adicion: calcularAdicion('C'), sueldoTotal:500000+calcularAdicion('C') }
        ];
        guardarEmpleados(empleados);
      }

      const tbody = document.querySelector('#tablaEmpleados tbody');
      tbody.innerHTML = '';
      empleados.forEach((emp, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${i+1}.</td>
          <td>${emp.cc}</td>
          <td>${emp.nombresyApellidos}</td>
          <td>${emp.direccion}</td>
          <td>${emp.email}</td>
          <td>${emp.telefono}</td>
          <td>${Number(emp.sueldoBase).toLocaleString()}</td>
          <td>${emp.tipoEmpleado}</td>
          <td>${emp.tipoBonificacion}</td>
          <td>${Number(emp.sueldoTotal).toLocaleString()}</td>
        `;
        tbody.appendChild(tr);
      });

      const total = empleados.reduce((sum, e) => sum + (Number(e.sueldoTotal) || 0), 0);
      const elTotal = document.getElementById('totalNomina');
      if(elTotal) elTotal.textContent = '$ ' + total.toLocaleString();
    }

    // Evitar envío real del formulario y usar nuestra función
    document.addEventListener('DOMContentLoaded', function(){
      const div = document.getElementById('divAgregarEmpleado');
      if(div) div.style.display = 'none';
      const form = document.getElementById('formEmpleado');
      if(form){
        form.addEventListener('submit', function(e){
          e.preventDefault();
          agregarEmpleado();
        });
      }
      renderTabla();
    });

  })();
  