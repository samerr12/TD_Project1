async function ObterEditLinhas(idLinha, idEquipa) {
    const respostaLinhas = await fetch('/skibidiAPI/equipas_linhas/');
    var shulkerbox = await respostaLinhas.json();

    //para casos que o utilizador n tenha linha nem equipa
    //vai ser simplesmente colocado o valor de "escolha uma linha", podia deixar em branco mas n quero saber
    if (idLinha == null && idEquipa == null) {
        idLinha = 0;
        idEquipa = 0;
    }

    if (shulkerbox.length > 0) {
        const cbbLinhaEdit = document.getElementById('cbbLinhaEdit');
        const cbbEquipaEdit = document.getElementById('cbbEquipaEdit');

        var arrNomeLinhas = [];
        var arrNomeEquipas = {};

        var valLinha = 0;

        for (i=0; i < shulkerbox.length; i++) {
            arrNomeLinhas.push({ id: shulkerbox[i].idLinha, name: shulkerbox[i].NomeLinha });

            if (valLinha == shulkerbox[i].idLinha) {
                arrNomeEquipas[valLinha-1].push({ id: shulkerbox[i].idEquipa, name: shulkerbox[i].NomeEquipa });
            }
            else {
                valLinha = shulkerbox[i].idLinha;
                arrNomeEquipas[valLinha-1] = [];
                arrNomeEquipas[valLinha-1].push({ id: shulkerbox[i].idEquipa, name: shulkerbox[i].NomeEquipa });
            }
        }

        arrNomeLinhas = arrNomeLinhas.filter((item, index, self) =>
            index === self.findIndex((t) => (
                t.id === item.id && t.name === item.name
            ))
        );

        arrNomeLinhas.forEach(element => {
            var opcao = document.createElement('option');
            opcao.value = element.id; // Set value to idLinha
            opcao.innerHTML = element.name; // Set text to NomeLinha

            //caso o id da linha do funcionaro corrsponda, isto seleciona
            if (element.id == idLinha) {
                opcao.selected = true;
            }

            cbbLinhaEdit.appendChild(opcao);
        });

        //parte para quando alterar a combobox meter os valores na outra
        document.getElementById('cbbLinhaEdit').addEventListener('change', function() {
            const indexAtual = this.value;
            const cbbEquipaEdit = document.getElementById('cbbEquipaEdit');

            // para limpar
            cbbEquipaEdit.innerHTML = '';
            const Equipas = arrNomeEquipas[indexAtual - 1]; // Adjust index to match array

            if (Equipas && Equipas.length > 1) {
                Equipas.forEach(element => {
                    if (element) {
                        const opcao = document.createElement('option');
                        opcao.value = element.id; // Set value to idEquipa
                        opcao.textContent = element.name; // Set text to NomeEquipa
                        if (element.id == idEquipa) {
                            opcao.selected = true;
                        }
                        cbbEquipaEdit.appendChild(opcao);
                    }
                    else {
                        const opcao = document.createElement('option');
                        opcao.textContent = 'Não existem equipas';
                        opcao.value = null;
                        cbbEquipaEdit.appendChild(opcao);
                    }
                });
            } else {
                const opcao = document.createElement('option');
                opcao.textContent = 'Não existem equipas';
                opcao.value = null;
                cbbEquipaEdit.appendChild(opcao);
            }

            cbbEquipaEdit.dispatchEvent(new Event('change'));
        });

        document.getElementById('cbbEquipaEdit').addEventListener('change', async function() {
            const indexAtual = this.value;

            //vai ler o turno da equipa
            const respostaTurno = await fetch(`/skibidiAPI/turno_equipa/${indexAtual}`);
            var Minecraft121 = await respostaTurno.json();
            Minecraft121 = Minecraft121[0];

            console.log(Minecraft121);

            if (Minecraft121 != null) {
                document.getElementById('txtTurnoFuncEdit').value = Minecraft121.Nome + " (" + Minecraft121.DataInicio + "-" + Minecraft121.DataFim + ")";
            }
            else {
                document.getElementById('txtTurnoFuncEdit').value = "Selecione uma Equipa";
            }

        });

        if (idLinha != 0) {
            cbbLinhaEdit.dispatchEvent(new Event('change'));
        }
    }
}