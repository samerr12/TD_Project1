async function MostrarTurnos(cbbTurnosMain, shulkerbox) {
    var arrTurnosComp = [];

    if (shulkerbox.length > 0) {
        for (i=0; i < shulkerbox.length; i++) {
            if (shulkerbox[i].idTurno != null) {
                arrTurnosComp.push({ id: shulkerbox[i].idTurno, name: shulkerbox[i].Nome + " (" + shulkerbox[i].DataInicio + " - " + shulkerbox[i].DataFim + ")" });
            }
        }
    }

    arrTurnosComp = arrTurnosComp.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t.id === item.id && t.name === item.name
        ))
    );

    arrTurnosComp.forEach(element => {
        var opcao = document.createElement('option');
        opcao.value = element.id;
        opcao.innerHTML = element.name;

        cbbTurnosMain.appendChild(opcao);
    });


    //============================================================

    const content_turno = document.getElementById('content_turno');

    cbbTurnosMain.addEventListener('change', async function() {
        const response = await fetch(`/skibidiAPI/search_info/turno/${cbbTurnosMain.value}`);
        var Minecraft121 = await response.json();
        console.log(Minecraft121);
        content_turno.replaceChildren();
        RemoverClassesTurnos()

        document.getElementById('Display_NomeTurno').innerHTML = cbbTurnosMain.options[cbbTurnosMain.selectedIndex].text.slice(0, -22);
        const NomeTurno2 = document.createElement('h3');
        const NFuncionarios = document.createElement('p');
        const NomeLinha = document.createElement('p');
        const NomeEquipa = document.createElement('p');

        var NomeEquipa_cont = null;
        var NFuncionarios_cont = 0;
        Minecraft121.forEach(element => {
            if (element.NomeEquipa) {
                NomeEquipa_cont = element.NomeEquipa;
            }
            if (element.NomeFuncionario) {
                NFuncionarios_cont++;
            }
        });

        NomeTurno2.innerHTML = "Informações da " + cbbTurnosMain.options[cbbTurnosMain.selectedIndex].text + ":";
        NFuncionarios.innerHTML = "Nº de funcionários: " + NFuncionarios_cont;
        NomeLinha.innerHTML = "Linha: " + Minecraft121[0].NomeLinha;
        NomeEquipa.innerHTML = "Equipa: " + (NomeEquipa_cont ? NomeEquipa_cont : "Não existe uma equipa associada");

        content_turno.appendChild(NomeTurno2);
        content_turno.appendChild(NFuncionarios);
        content_turno.appendChild(NomeLinha);
        content_turno.appendChild(NomeEquipa);
    });
}

async function RemoverClassesTurnos() {
    if (document.getElementById('container_informacaoTurno')) {
        document.getElementById('container_informacaoTurno').classList.remove("no_select");
        document.getElementById('head_informacaoTurno').classList.remove("no_select_head");
        document.getElementById('Display_NomeTurno').classList.remove("no_select_txt");
        document.getElementById('container_btnsTurno').classList.remove("no_select_btns");
    }
}