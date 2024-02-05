function registrarse() {
    // Obtener valores del formulario de registro
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = parseInt(document.getElementById("edad").value);
    let direccion = document.getElementById("direccion").value;
    let contrasenia = document.getElementById("contrasenia").value;

    // Verificar que todos los campos estén completos
    if (nombre && apellido && !isNaN(edad) && direccion && contrasenia) {
        // Verificar que la edad sea mayor o igual a 18 años
        if (edad >= 18) {
            // Mostrar mensaje de bienvenida y formulario de cursos
            mostrarBienvenida(nombre);
        } else {
            alert("Debes ser mayor de 18 años para registrarte.");
        }
    } else {
        alert("Debes completar todos los campos del formulario de registro.");
    }
}

function mostrarBienvenida(nombre) {
    // Ocultar el formulario de registro
    document.getElementById("registro").style.display = "none";

    // Mostrar el mensaje de bienvenida con el nombre registrado y formulario de cursos
    document.getElementById("cursos").style.display = "block";
    document.getElementById("nombreBienvenida").innerText = nombre;

    // Mostrar el precio inicial al cargar la página
    mostrarPrecio();
}

function mostrarPrecio() {
    // Obtener el elemento select y su valor seleccionado
    let selectCurso = document.getElementById("curso");
    let cursoSeleccionado = selectCurso.options[selectCurso.selectedIndex].value;

    // Obtener el precio del curso seleccionado
    let precioCurso = obtenerPrecioCurso(cursoSeleccionado);

    // Obtener la cantidad de cuotas seleccionadas
    let cuotas = parseInt(document.getElementById("cuotas").value);

    // Limitar la cantidad de cuotas a un máximo de 3
    cuotas = Math.min(cuotas, 3);

    // Actualizar el campo de cuotas con el valor corregido
    document.getElementById("cuotas").value = cuotas;

    // Calcular costo total con impuestos y cuotas
    let costoTotal = precioCurso;

    // Aplicar porcentaje de recargo por cuotas
    if (cuotas === 2) {
        costoTotal *= 1.20; // 20% de recargo para 2 cuotas
    } else if (cuotas === 3) {
        costoTotal *= 1.35; // 35% de recargo para 3 cuotas
    }

    // Agregar 21% de IVA
    costoTotal = calcularCostoConIVA(costoTotal);

    // Mostrar el precio del curso en algún lugar 
    document.getElementById("resultado").innerText = "Costo total con " + cuotas + " cuotas (IVA incluido): $" + costoTotal.toFixed(2);
}

function comprarCurso() {
    // Obtener valores seleccionados por el usuario
    let cursoSeleccionado = document.getElementById("curso").value;
    let cuotas = parseInt(document.getElementById("cuotas").value);

    // Precios base de los cursos
    let precioCurso = obtenerPrecioCurso(cursoSeleccionado);

    // Calcular costo total con impuestos y cuotas
    let costoTotal = precioCurso;

    // Aplicar porcentaje de recargo por cuotas
    if (cuotas === 2) {
        costoTotal *= 1.20; // 20% de recargo para 2 cuotas
    } else if (cuotas === 3) {
        costoTotal *= 1.35; // 35% de recargo para 3 cuotas
    }

    // Agregar 21% de IVA
    costoTotal = calcularCostoConIVA(costoTotal);

    // Mostrar el precio del curso antes de redirigir a la plataforma de pago de Mercado Pago
    alert("El costo total con " + cuotas + " cuotas (IVA incluido) es: $" + costoTotal.toFixed(2) + "\nUsted será redirigido a la plataforma de pago de Mercado Pago. Haga clic en 'Aceptar' para continuar.");

    // Redirigir a la plataforma de pago de Mercado Pago
    window.location.href = "https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=SU_PREFERENCIA_ID"; 
}

function calcularCostoConIVA(precio) {
    // IVA del 21%
    let iva = 0.21;
    return precio * (1 + iva);
}

function obtenerPrecioCurso(curso) {
    // Precios base de los cursos
    let precios = {
        guitarra: 5500,
        ukelele: 8500,
        canto: 8900
    };

    // Obtener el precio del curso seleccionado
    return precios[curso];
}


