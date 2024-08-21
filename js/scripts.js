const nome = document.querySelector("#nome");
const potencia = document.querySelector('#potencia');
const tempo = document.querySelector('#tempo');
const dias = document.querySelector('#dias');
const preco = document.querySelector('#preco');
const frm = document.querySelector('form');
const resultado = document.querySelector('.result');
const dialog = document.querySelector('dialog');
// const btClose = document.querySelector('#bt-close');
// const btSum = document.querySelector('#bt-sum');

let nomeAparelho = "";
let consumoTotal = 0;
let gastoTotal = 0;
let consumoDiario = 0;
let gastoDiario = 0;
let consumoMensal = 0;

const arrObj = [
    {
        nomeAparelho: "Total",
        consumoTotal: 0,
        gastoTotal: 0,
        consumoDiario: 0,
        gastoDiario: 0,
        consumoMensal: 0
    }
];

frm.addEventListener("submit", (e) => {
    e.preventDefault();

    nomeAparelho = document.querySelector("#nome").value;
    const potenciaValue = potencia.value;
    const tempoValue = tempo.value;
    const diasValue = dias.value;
    const precoValue = preco.value;

    consumoTotal = (potenciaValue * tempoValue * diasValue) / 1000;
    gastoTotal = consumoTotal * precoValue;
    consumoDiario = consumoTotal / diasValue;
    gastoDiario = gastoTotal / diasValue;
    consumoMensal = consumoDiario * 30; // Assuming 30 days in a month

    dialog.showModal();
    dialog.style.opacity = 1;
    dialog.style.zIndex = 9999;

    resultado.innerHTML = `<b>${nomeAparelho}</b><br>Consumo total (em ${diasValue} dias): ${consumoTotal} kWh<br>Gasto total: R$ ${gastoTotal.toFixed(2)}<br>Consumo diário: ${consumoDiario.toFixed(2)} kWh<br>Gasto diário é de R$ ${gastoDiario.toFixed(2)}<br>Consumo mensal: ${consumoMensal.toFixed(2)} kWh`;
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});

function closeModal() {
    dialog.close();
    dialog.style.opacity = 0;
    dialog.style.zIndex = -1;

    nome.value = '';
    potencia.value = '';
    tempo.value = '';
    dias.value = '';

    nome.focus();
}

function updateTable(){
    const dadosTotal = arrObj[arrObj.length - 1];

    const dadosAparelho = {nomeAparelho, consumoTotal, gastoTotal, consumoDiario, gastoDiario, consumoMensal};

    dadosTotal.consumoTotal += dadosAparelho.consumoTotal;
    dadosTotal.gastoTotal += dadosAparelho.gastoTotal;
    dadosTotal.consumoDiario += dadosAparelho.consumoDiario;
    dadosTotal.gastoDiario += dadosAparelho.gastoDiario;
    dadosTotal.consumoMensal += dadosAparelho.consumoMensal;

    arrObj[arrObj.length - 1] = dadosAparelho;
    arrObj.push(dadosTotal);

    let tab = "";
    for (const obj of arrObj) {
        tab += `
            <tr>
                <td><b>${obj.nomeAparelho}</b></th>
                <td>${obj.consumoTotal.toFixed(2)}</th>
                <td>${obj.gastoTotal.toFixed(2)}</th>
                <td>${obj.consumoDiario.toFixed(2)}</th>
                <td>${obj.gastoDiario.toFixed(2)}</th>
                <td>${obj.consumoMensal.toFixed(2)}</th>
            </tr>
        `;
    }

    document.querySelector("table").classList.remove("hide");
    document.querySelector("#result-row").innerHTML = tab;
    closeModal();
}