let dataFunc = [];

var LinhaValor = null;
var EquipaValor = null;

async function ObterLinhas(idLinha, idEquipa) {
    try {
        //==========================================
        //parte para aparecer as infos nas combobox
        //==========================================

        const respostaLinhas = await fetch('/skibidiAPI/equipas_linhas/');
        var shulkerbox = await respostaLinhas.json();

        if (shulkerbox.length > 0) {    

            const ccbLinhasSelect = document.getElementById('ccbLinhasSelect');
            const ccbEquipasSelect = document.getElementById('ccbEquipasSelect');

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

                ccbLinhasSelect.appendChild(opcao);
            });

            //parte para quando alterar a combobox meter os valores na outra
            document.getElementById('ccbLinhasSelect').addEventListener('change', function() {
                const indexAtual = this.value;
                const ccbEquipasSelect = document.getElementById('ccbEquipasSelect');

                // para limpar
                ccbEquipasSelect.innerHTML = '';
                const Equipas = arrNomeEquipas[indexAtual - 1]; // Adjust index to match arrays

                if (Equipas && Equipas.length > 1) {
                    Equipas.forEach(element => {
                        if (element) {
                            const option = document.createElement('option');
                            option.value = element.id; // Set value to idEquipa
                            option.textContent = element.name; // Set text to NomeEquipa
                            ccbEquipasSelect.appendChild(option);
                        }
                        else {
                            const option = document.createElement('option');
                            option.textContent = 'Não existem equipas';
                            ccbEquipasSelect.appendChild(option);
                        }
                    });
                } else {
                    const option = document.createElement('option');
                    option.textContent = 'Não existem equipas';
                    ccbEquipasSelect.appendChild(option);
                }
            });
        }
    }
    catch (e) {
        console.log(e);
    }
}

async function FuncionariosLinhas() {

    const params = new URLSearchParams(window.location.search);
    var LinhaSelect = document.getElementById('ccbLinhasSelect');
    var EquipaSelect = document.getElementById('ccbEquipasSelect');

    document.getElementById('ccbLinhasSelect').addEventListener('change', function() {
        LinhaValor = LinhaSelect.options[LinhaSelect.selectedIndex].value;
        EquipaValor = null;
    });

    document.getElementById('ccbEquipasSelect').addEventListener('change', function() {
        LinhaValor = LinhaSelect.options[LinhaSelect.selectedIndex].value;
        EquipaValor = EquipaSelect.options[EquipaSelect.selectedIndex].value;
    });
}

async function fetchData() {
    try {
        ObterLinhas();
        FuncionariosLinhas();
        
        var data = await LerParamsFiltros();
        const contentor = document.querySelector('.list_users');

        if (data.length > 0) {
            dataFunc = data;
            
            contentor.replaceChildren();

            dataFunc.forEach(element => {
                var item_user = document.createElement('div');
                var imagem = document.createElement('svg');
                var caminhoImagem = document.createElement('path');
                var nomeF = document.createElement('p');

                imagem.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                imagem.setAttribute("viewBox", "0 0 448 512");
                imagem.style.width = "0.8rem";
                caminhoImagem.setAttribute("d", "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z");

                item_user.className = 'item_user';
                item_user.setAttribute("onclick", "see_user(event)");
                nomeF.className = 'nome_utilizador';
                nomeF.id = element.idFuncionario;
                nomeF.innerHTML = element.NomeFuncionario;

                item_user.appendChild(imagem)
                imagem.appendChild(caminhoImagem);
                item_user.appendChild(nomeF);
                contentor.appendChild(item_user);
            });

            //=============================================
            //parte para apresentar as infos do funcionario
            //=============================================
            const params = new URLSearchParams(window.location.search);
            const idFunc = params.get('Funcid');

            if (idFunc != null) {

                document.querySelector('.container_info_pessoa').style.display = 'block';

                const response = await fetch(`/skibidiAPI/funcionarios/${idFunc}`);
                var Minecraft121 = await response.json();

                if (Minecraft121) {
                    const detalhesFunc = Minecraft121[0];
                    ObterEditLinhas(detalhesFunc.idLinha, detalhesFunc.idEquipa);
                    console.log(detalhesFunc);

                    document.getElementById('NomeFuncShow').innerHTML = detalhesFunc.NomeFuncionario;
                    document.getElementById('IdadeFuncShow').innerHTML = detalhesFunc.IdadeFuncionario;
                    document.getElementById('ContactoFuncShow').innerHTML = detalhesFunc.ContactoFuncionario;

                    if (detalhesFunc.NomeEquipa == null) {
                        document.getElementById('LinhaFuncShow').innerHTML = "Este funcionário não tem uma linha";
                        document.getElementById('EquipaFuncShow').innerHTML = "Este funcionário não tem uma equipa";
                        document.getElementById('TurnoFuncShow').innerHTML = "Este funcionário não tem um turno";
                    }
                    else {
                        document.getElementById('LinhaFuncShow').innerHTML = detalhesFunc.NomeLinha;
                        document.getElementById('EquipaFuncShow').innerHTML = detalhesFunc.NomeEquipa;
                        document.getElementById('TurnoFuncShow').innerHTML = detalhesFunc.Nome + " (" + detalhesFunc.DataInicio + "-" + detalhesFunc.DataFim + ")";
                        document.getElementById('txtTurnoFuncEdit').value = detalhesFunc.Nome + " (" + detalhesFunc.DataInicio + "-" + detalhesFunc.DataFim + ")";

                        const Pselecionado = document.getElementById(idFunc);
                        const nomeFunc = document.getElementById('NomeFuncShow');
                        nomeFunc.innerHTML = Pselecionado.innerHTML;
                    }
                }
                else {
                    alert("Erro ao carregar os itens");
                }
            }        
        }
        else {

            console.log(data);

            var item_user = document.createElement('div');
            var imagem = document.createElement('svg');
            var nomeF = document.createElement('p');

            imagem.style.width = "0.8rem";

            item_user.style.padding = '0 0 0 0.5rem';
            item_user.style.fontWeight = "bold";
            item_user.style.color = "red";
            nomeF.className = 'nome_utilizador';
            nomeF.innerHTML = "Não existem Funcionários";   

            contentor.appendChild(item_user);
            item_user.appendChild(imagem)
            item_user.appendChild(nomeF);
        }
    }
    catch (e) {
        console.log(e);
    }
}

window.onload = fetchData();