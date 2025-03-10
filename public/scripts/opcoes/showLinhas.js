async function MostrarLinhas() {
    const cbbLinhasMain = document.getElementById('cbbLinhasMain');
    const cbbTurnosMain = document.getElementById('cbbTurnosMain');
    const cbbEquipasMain = document.getElementById('cbbEquipasMain');

    const respostaLinhas = await fetch('/skibidiAPI/equipas_linhas/');
    var shulkerbox = await respostaLinhas.json();

    var arrLinhasComp = [];
    var valLinha = 0;

    if (shulkerbox.length > 0) {
        for (i=0; i < shulkerbox.length; i++) {
            arrLinhasComp.push({ id: shulkerbox[i].idLinha, name: shulkerbox[i].NomeLinha });
        }
    }

    arrLinhasComp = arrLinhasComp.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t.id === item.id && t.name === item.name
        ))
    );

    arrLinhasComp.forEach(element => {
        var opcao = document.createElement('option');
        opcao.value = element.id;
        opcao.innerHTML = element.name;

        cbbLinhasMain.appendChild(opcao);
    });

    MostrarTurnos(cbbTurnosMain, shulkerbox);
    MostrarEquipas(cbbEquipasMain, shulkerbox);

    //============================================================

    const content_linha = document.getElementById('content_linha');

    cbbLinhasMain.addEventListener('change', async function() {
        const response = await fetch(`/skibidiAPI/search_info/linha/${cbbLinhasMain.value}`);
        var Minecraft121 = await response.json();
        content_linha.replaceChildren();
        RemoverClassesLinhas()

        document.getElementById('Display_NomeLinha').innerHTML = cbbLinhasMain.options[cbbLinhasMain.selectedIndex].text;
        const NomeLinha2 = document.createElement('h3');
        const NFuncionarios = document.createElement('p');
        const NomeTurno = document.createElement('p');
        const NomeEquipa = document.createElement('p');

        var arrNEquipas = [];
        var arrNTurnos = [];
        var NFuncionarios_cont = 0;
        Minecraft121.forEach(element => {
            if (element.Nome) {
                arrNTurnos.push(element.Nome);
            }
            if (element.NomeEquipa) {
                arrNEquipas.push(element.NomeEquipa);
            }
            if (element.NomeFuncionario) {
                NFuncionarios_cont++;
            }
        });

        arrNTurnos = arrNTurnos.filter((item, index) => arrNTurnos.indexOf(item) === index);
        arrNEquipas = arrNEquipas.filter((item, index) => arrNEquipas.indexOf(item) === index);

        NomeLinha2.innerHTML = "Informações da " + cbbLinhasMain.options[cbbLinhasMain.selectedIndex].text + ":";
        NFuncionarios.innerHTML = "Nº de funcionários: " + NFuncionarios_cont;
        NomeTurno.innerHTML = "Nº de turnos: " + arrNTurnos.length;
        NomeEquipa.innerHTML = "Nº de equipas: " + arrNEquipas.length;

        content_linha.appendChild(NomeLinha2);
        content_linha.appendChild(NFuncionarios);
        content_linha.appendChild(NomeTurno);
        content_linha.appendChild(NomeEquipa);
    });
}

async function RemoverClassesLinhas() {
    if (document.getElementById('container_informacaoLinha')) {
        document.getElementById('container_informacaoLinha').classList.remove("no_select");
        document.getElementById('head_informacaoLinha').classList.remove("no_select_head");
        document.getElementById('Display_NomeLinha').classList.remove("no_select_txt");
        document.getElementById('container_btnsLinha').classList.remove("no_select_btns");
    }
}

window.onload = MostrarLinhas();