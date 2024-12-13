const historialOperaciones = [];

const numero1Input = document.getElementById("numero1");
const numero2Input = document.getElementById("numero2");
const operacionSelect = document.getElementById("operacion");
const calcularBtn = document.getElementById("calcular");
const limpiarBtn = document.getElementById("limpiar");
const listaHistorial = document.getElementById("historial");


calcularBtn.addEventListener("click", () => {
    const numero1 = parseFloat(numero1Input.value);
    const numero2 = parseFloat(numero2Input.value);
    const operacion = operacionSelect.value;

    if (isNaN(numero1) || isNaN(numero2)) {
        alert("Por favor, ingresa números válidos.");
        return;
    }

    const resultado = realizarOperacion(numero1, numero2, operacion);
    agregarAlHistorial({ numero1, numero2, operacion, resultado });
    actualizarHistorialDOM();
});


limpiarBtn.addEventListener("click", () => {
    historialOperaciones.length = 0; 
    actualizarHistorialDOM(); 
});

function realizarOperacion(numero1, numero2, operacion) {
    switch (operacion) {
        case "suma":
            return numero1 + numero2;
        case "resta":
            return numero1 - numero2;
        case "multiplicacion":
            return numero1 * numero2;
        case "division":
            return numero2 !== 0 ? numero1 / numero2 : "Error: División por 0";
        default:
            return "Operación no válida";
    }
}

function agregarAlHistorial(operacion) {
    historialOperaciones.push(operacion); 
}

function actualizarHistorialDOM() {
    listaHistorial.innerHTML = "";

    historialOperaciones.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item";

        li.innerHTML = `
            ${item.operacion}: ${item.numero1} y ${item.numero2} = ${item.resultado}
            <button class="btn-delete" onclick="eliminarOperacion(${index})">&times;</button>
        `;

        listaHistorial.appendChild(li);
    });
}

function eliminarOperacion(index) {
    historialOperaciones.splice(index, 1); 
    actualizarHistorialDOM(); 
}
