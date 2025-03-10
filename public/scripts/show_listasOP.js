var intervalId = null;

function InicioTimer() {
    if (intervalId !== null) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(LerTurnos, 1000);
}

/*
function redirectLinha(Linha, Equipa) {
    console.log(Linha);
    console.log(Equipa);
}*/

async function CricacaoElementos(arrNomeEquipas) {
    const container_linhas = document.querySelector('.container_linhas');
    container_linhas.replaceChildren();
    for (const nomeLinha in arrNomeEquipas) {
        //console.log(`Linha: ${nomeLinha}`);

        for (const nomeEquipa in arrNomeEquipas[nomeLinha]) {
            const equipaInfo = arrNomeEquipas[nomeLinha][nomeEquipa];
            /*console.log(`  Equipa: ${nomeEquipa}`);
            console.log(`    Data Início: ${equipaInfo.DataInicio}`);
            console.log(`    Data Fim: ${equipaInfo.DataFim}`);*/

            var cartao = document.createElement('div');
            var head_linha = document.createElement('div')
            var txtNomeLinha = document.createElement('h2');
            var info1 = document.createElement('div');
            var info_head_equipa = document.createElement('div');
            var lblNomeEquipa = document.createElement('h4');
            var barra1 = document.createElement('hr');
            var container_Nfunc = document.createElement('div');
            var head_turnos = document.createElement('div');
            var barra2 = document.createElement('hr');
            var lblHoraEntrada_Equipa = document.createElement('p');
            var lblHoraSaida_Equipa = document.createElement('p');

            cartao.className = "container_cartao";
            //cartao.setAttribute("onclick", `redirectLinha(${equipaInfo}, 1)`);
            head_linha.className = "head_linha";
            txtNomeLinha.innerHTML = nomeLinha;
            info_head_equipa.className = "info_head_equipa";
            lblNomeEquipa.innerHTML = nomeEquipa;
            barra1.className = "barra_divisoria_cartao";
            container_Nfunc.className = "container_Nfunc";
            head_turnos.className = "head_turnos";
            barra2.className = "barra_divisoria_cartao";
            lblHoraEntrada_Equipa.innerHTML = equipaInfo.DataInicio;
            lblHoraSaida_Equipa.innerHTML = equipaInfo.DataFim;

            container_linhas.appendChild(cartao);
            cartao.appendChild(head_linha);
            head_linha.appendChild(txtNomeLinha);
            cartao.appendChild(info1);
            info1.appendChild(info_head_equipa);
            info_head_equipa.appendChild(lblNomeEquipa);
            info1.appendChild(barra1);
            info1.appendChild(container_Nfunc);
            cartao.appendChild(head_turnos);
            head_turnos.appendChild(barra2);
            head_turnos.appendChild(lblHoraEntrada_Equipa);
            head_turnos.appendChild(lblHoraSaida_Equipa);

            for (const idFuncionario in equipaInfo.Funcionarios) {
                const nomeFuncionario = equipaInfo.Funcionarios[idFuncionario];
                //console.log(`      Funcionário ID: ${idFuncionario}, Nome: ${nomeFuncionario}`);

                var link_funcionario = document.createElement('a');
                var txtNomeFuncionario = document.createElement('p');

                link_funcionario.className = "link_funcionario";
                link_funcionario.href = `funcionarios.html?Funcid=${idFuncionario}`;
                txtNomeFuncionario.innerHTML = nomeFuncionario;

                container_Nfunc.appendChild(link_funcionario);
                link_funcionario.appendChild(txtNomeFuncionario);
            }
        }
    }
    
}

async function CategorizarDados(Minecraft121) {
    
    var arrNomeEquipas = {};

    for (let i = 0; i < Minecraft121.length; i++) {
        const entry = Minecraft121[i];
        const { NomeLinha, NomeEquipa, idFuncionario, NomeFuncionario, DataInicio, DataFim } = entry;

        if (!arrNomeEquipas[NomeLinha]) {
            arrNomeEquipas[NomeLinha] = {};
        }

        if (!arrNomeEquipas[NomeLinha][NomeEquipa]) {
            arrNomeEquipas[NomeLinha][NomeEquipa] = {
                DataInicio: DataInicio,
                DataFim: DataFim,
                Funcionarios: {}
            };
        }

        arrNomeEquipas[NomeLinha][NomeEquipa].Funcionarios[idFuncionario] = NomeFuncionario;
    }
    //console.log(arrNomeEquipas);
    CricacaoElementos(arrNomeEquipas);
}

async function LerTurnos() {

    const tempo = new Date();
    var horas = tempo.getHours();
    var minutos = tempo.getMinutes();
    var segundos = tempo.getSeconds();

    if (minutos.toString().length == 1) {
        minutos = "0" + minutos;
    }
    if (segundos.toString().length == 1) {
        segundos = "0" + segundos;
    }
    const tempoAtual = horas + ":" + minutos + ":" + segundos;

    document.getElementById('Horas_atuais').innerHTML = tempoAtual;

    var horasint = parseInt(horas*60) + parseInt(minutos);
    var dataInicio = 0;
    var dataFim = 0;

    if (horasint < 480) {
        dataInicio = "00:00:00";
        dataFim = "08:00:00";
    }
    else if (horasint < 960) {
        dataInicio = "08:00:00";
        dataFim = "16:00:00";
    }
    else if (horasint < 1440) {
        dataInicio = "16:00:00";
        dataFim = "24:00:00";
    }

    const response = await fetch(`/skibidiAPI/linhaProd/${dataInicio}/${dataFim}`);
    var Minecraft121 = await response.json();

    console.log(Minecraft121);

    CategorizarDados(Minecraft121);
}

window.onload = function() {
    LerTurnos();
    InicioTimer();
};