async function MostrarEquipas(cbbEquipasMain, shulkerbox) {
    var arrEquipasComp = [];
    
    if (shulkerbox.length > 0) {
        for (i=0; i < shulkerbox.length; i++) {
            if (shulkerbox[i].idTurno != null) {
                arrEquipasComp.push({ id: shulkerbox[i].idEquipa, name: shulkerbox[i].NomeEquipa});
            }
        }
    }

    arrEquipasComp = arrEquipasComp.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t.id === item.id && t.name === item.name
        ))
    );

    arrEquipasComp.forEach(element => {
        var opcao = document.createElement('option');
        opcao.value = element.id;
        opcao.innerHTML = element.name;

        cbbEquipasMain.appendChild(opcao);
    });


    //============================================================

    const content_equipa = document.getElementById('content_equipa');

    cbbEquipasMain.addEventListener('change', async function() {
        const response = await fetch(`/skibidiAPI/search_info/equipa/${cbbEquipasMain.value}`);
        var Minecraft121 = await response.json();
        console.log(Minecraft121);
        content_equipa.replaceChildren();
        RemoverClassesEquipas();

        document.getElementById('Display_NomeEquipa').innerHTML = cbbEquipasMain.options[cbbEquipasMain.selectedIndex].text;
        const NomeEquipa2 = document.createElement('h3');
        const NFuncionarios = document.createElement('p');
        const NomeLinha = document.createElement('p');
        const NomeTurno = document.createElement('p');

        var NomeLinha_cont = null;
        var NomeTurno_cont = null;
        var NFuncionarios_cont = 0;
        Minecraft121.forEach(element => {
            if (element.NomeLinha) {
                NomeLinha_cont = element.NomeLinha;
            }
            if (element.Nome) {
                NomeTurno_cont = element.Nome + " (" + element.DataInicio + " - " + element.DataFim + ")";
            }
            if (element.NomeFuncionario) {
                NFuncionarios_cont++;
            }
        });

        NomeEquipa2.innerHTML = "Informações da " + cbbEquipasMain.options[cbbEquipasMain.selectedIndex].text + ":";
        NFuncionarios.innerHTML = "Nº de funcionários: " + NFuncionarios_cont;
        NomeLinha.innerHTML = "Linha: " + NomeLinha_cont;
        NomeTurno.innerHTML = "Turno: " + NomeTurno_cont;

        content_equipa.appendChild(NomeEquipa2);
        content_equipa.appendChild(NFuncionarios);
        content_equipa.appendChild(NomeLinha);
        content_equipa.appendChild(NomeTurno);
    });
}

async function RemoverClassesEquipas() {
    if (document.getElementById('container_informacaoEquipa')) {
        document.getElementById('container_informacaoEquipa').classList.remove("no_select");
        document.getElementById('head_informacaoEquipa').classList.remove("no_select_head");
        document.getElementById('Display_NomeEquipa').classList.remove("no_select_txt");
        document.getElementById('container_btnsEquipa').classList.remove("no_select_btns");
    }
}