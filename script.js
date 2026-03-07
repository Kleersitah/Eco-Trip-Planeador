const obtenerConsumoPorTerreno = (terreno) => {
    if (terreno === 'plano') return 10;
    if (terreno === 'subida') return 18;
    if (terreno === 'montana') return 28;
    return 15;
};

const calcularEnergiaNecesaria = (distancia, consumoWh) => {
    return distancia * consumoWh;
};

const calcularBateriaRestante = (capacidadTotal, energiaNecesaria) => {
    return capacidadTotal - energiaNecesaria;
};

const calcularPorcentajeBateria = (bateriaRestante, capacidadTotal) => {
    return (bateriaRestante / capacidadTotal) * 100;
};

const calcularTiempoEstimado = (distancia, velocidadPromedioKmH = 20) => {
    return distancia / velocidadPromedioKmH;
};

const esViajePosible = (bateriaRestante) => {
    return bateriaRestante >= 0;
};

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('ecoForm');
    const areaResultados = document.getElementById('resultsArea');
    
    const nodoUsoEnergia = document.getElementById('resUsage');
    const nodoBateriaRestante = document.getElementById('resRemaining');
    const nodoTiempo = document.getElementById('resTime');
    const nodoEstado = document.getElementById('resStatus');
    const nodoAlternativa = document.getElementById('resAlternativa');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const distancia = parseFloat(document.getElementById('inputDistance').value);
        const capacidad = parseFloat(document.getElementById('inputCapacity').value);
        const terreno = document.getElementById('inputTerreno').value;

        const consumoPorKm = obtenerConsumoPorTerreno(terreno);
        const energiaNecesaria = calcularEnergiaNecesaria(distancia, consumoPorKm);
        const bateriaRestante = calcularBateriaRestante(capacidad, energiaNecesaria);
        const tiempoEstimado = calcularTiempoEstimado(distancia);
        const posible = esViajePosible(bateriaRestante);
        const porcentajeRestante = calcularPorcentajeBateria(bateriaRestante, capacidad);

        nodoUsoEnergia.textContent = `${energiaNecesaria.toFixed(2)} Wh`;
        
        nodoAlternativa.classList.add('d-none');
        nodoAlternativa.textContent = "";

        if (posible) {
            nodoBateriaRestante.textContent = `${bateriaRestante.toFixed(2)} Wh`;
            
            if (porcentajeRestante <= 20) {
                nodoEstado.textContent = "¡Llegas, pero justo! Batería menor al 20%. ";
                nodoEstado.className = "alert text-center fw-bold py-2 mb-0 rounded-pill alert-warning";
            } else {
                nodoEstado.textContent = "¡Viaje seguro! Tienes batería suficiente. ";
                nodoEstado.className = "alert text-center fw-bold py-2 mb-0 rounded-pill alert-success";
            }
        } else {
            nodoBateriaRestante.textContent = "0 Wh (Te quedarás a medio camino)";
            nodoEstado.textContent = "¡No llegas! Batería insuficiente. ";
            nodoEstado.className = "alert text-center fw-bold py-2 mb-0 rounded-pill alert-danger";

            if (terreno !== 'plano') {
                const consumoPlano = obtenerConsumoPorTerreno('plano');
                const energiaPlano = calcularEnergiaNecesaria(distancia, consumoPlano);
                
                if (esViajePosible(calcularBateriaRestante(capacidad, energiaPlano))) {
                    nodoAlternativa.textContent = " Sugerencia: Si cambias tu ruta a un Terreno Plano, ¡sí te alcanza la batería!";
                    nodoAlternativa.classList.remove('d-none');
                }
            }
        }

        const horas = Math.floor(tiempoEstimado);
        const minutos = Math.round((tiempoEstimado - horas) * 60);
        nodoTiempo.textContent = `${horas}h ${minutos}m`;

        areaResultados.classList.remove('d-none');
    });
});
