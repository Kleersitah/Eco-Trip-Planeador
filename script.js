
const calcularEnergiaNecesaria = (distancia, eficiencia) => {
    return distancia * eficiencia;
};

const calcularBateriaRestante = (capacidadTotal, energiaNecesaria) => {
    return capacidadTotal - energiaNecesaria;
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

  
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const distancia = parseFloat(document.getElementById('inputDistance').value);
        const capacidad = parseFloat(document.getElementById('inputCapacity').value);
        const eficiencia = parseFloat(document.getElementById('inputEfficiency').value);
        const energiaNecesaria = calcularEnergiaNecesaria(distancia, eficiencia);
        const bateriaRestante = calcularBateriaRestante(capacidad, energiaNecesaria);
        const tiempoEstimado = calcularTiempoEstimado(distancia);
        const posible = esViajePosible(bateriaRestante);
        nodoUsoEnergia.textContent = `${energiaNecesaria.toFixed(2)} Wh`;
        
        if (posible) {
            nodoBateriaRestante.textContent = `${bateriaRestante.toFixed(2)} Wh`;
            nodoEstado.textContent = "¡Viaje seguro! Tienes batería suficiente.";
            nodoEstado.className = "alert text-center fw-bold py-2 mb-0 rounded-pill alert-success";
        } else {
            nodoBateriaRestante.textContent = "0 Wh (Te quedarás varado)";
            nodoEstado.textContent = "¡Cuidado! Batería insuficiente. Considera recargar antes de salir.";
            nodoEstado.className = "alert text-center fw-bold py-2 mb-0 rounded-pill alert-danger";
        }

 
        const horas = Math.floor(tiempoEstimado);
        const minutos = Math.round((tiempoEstimado - horas) * 60);
        nodoTiempo.textContent = `${horas}h ${minutos}m`;
        areaResultados.classList.remove('d-none');
    });
});