const potencia = document.querySelector('#potencia');
const tempo = document.querySelector('#tempo');
const dias = document.querySelector('#dias');
const preco = document.querySelector('#preco');
const frm = document.querySelector('form');
const resultado = document.querySelector('.result');
const dialog = document.querySelector('dialog');
const close = document.querySelector('#close');

frm.addEventListener("submit", (e) => {
    e.preventDefault();

    const potenciaValue = potencia.value;
    const tempoValue = tempo.value;
    const diasValue = dias.value;
    const precoValue = preco.value;

    const consumoTotal = (potenciaValue * tempoValue * diasValue) / 1000;
    const gastoTotal = consumoTotal * precoValue;
    const consumoDiario = consumoTotal / diasValue;
    const gastoDiario = gastoTotal / diasValue;
    const consumoMensal = consumoDiario * 30; // Assuming 30 days in a month

    dialog.showModal();
    dialog.style.opacity = 1;
    dialog.style.zIndex = 9999;

    resultado.innerHTML = `Consumo total: ${consumoTotal} kWh<br>Gasto total: R$ ${gastoTotal.toFixed(2)}<br>Consumo diário: ${consumoDiario.toFixed(2)} kWh<br>Gasto diário é de R$ ${gastoDiario.toFixed(2)}<br>Consumo mensal: ${consumoMensal.toFixed(2)} kWh`;
});

close.addEventListener("click", () => {
    dialog.close();
    dialog.style.opacity = 0;
    dialog.style.zIndex = -1;

    potencia.value = '';
    tempo.value = '';
    dias.value = '';
    preco.value = '';
});