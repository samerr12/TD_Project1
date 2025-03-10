async function addFuncionario() {
    const pop = document.querySelector('.pop_Cuser');
    const null_space = document.querySelector('.null_space');

    const txtNomeFuncAdd = document.getElementById('txtNomeFuncAdd');
    const txtIdadeFuncAdd = document.getElementById('txtIdadeFuncAdd');
    const txtContactoFuncAdd = document.getElementById('txtContactoFuncAdd');

    try {
        //tive de por isto aqui em cima pq senão acionava primeiro o valor null por alguma razão
        if (isNaN(parseInt(txtIdadeFuncAdd.value))) {
            CriarPopExtra("Preencha a idade corretamente", "warning");
            return;
        }
        if (isNaN(parseInt(txtContactoFuncAdd.value))) {
            CriarPopExtra("Preencha o contacto corretamente", "warning");
            return;
        }

        if (txtNomeFuncAdd.value != "" && txtIdadeFuncAdd.value != "" && txtContactoFuncAdd.value != "") {
            
            const valNome = txtNomeFuncAdd.value;
            const valIdade = txtIdadeFuncAdd.value;
            const valContacto = txtContactoFuncAdd.value.replaceAll(" ", "");
            
            if (parseInt(valIdade) < 14) {
                CriarPopExtra("Não podes andar a contratar pessoas assim tão jovens, isso fica mal para a empresa", "warning");
                return;
            }
            if (valContacto.length != 9) {
                CriarPopExtra("Preencha o contacto corretamente<br>Certifique-se que não tem espaços", "warning");
                return;
            }

            //fazer a verificação para se o utilizador já existe
            var response = await fetch(`/skibidiAPI/funcionarios/addSelect/${valNome}/${valIdade}/${valContacto}`);
            var Minecraft121 = await response.json();

            console.log(Minecraft121);

            if (Minecraft121.length > 0) {
                CriarPopExtra("Este funcionário já existe", "warning");
                return;
            }
            else {
                const request = await fetch(`/skibidiAPI/funcionarios/add/${valNome}/${valIdade}/${valContacto}`);
                var response = await fetch(`/skibidiAPI/funcionarios/addSelect/${valNome}/${valIdade}/${valContacto}`);
                var Minecraft121 = await response.json();
                if (Minecraft121.length > 0) {
                    CriarPopExtra("Funcionário criado com sucesso", "safe");
                    txtNomeFuncAdd.value = null;
                    txtIdadeFuncAdd.value = null;
                    txtContactoFuncAdd.value = null;
                    pop.style.display = 'none';
                    null_space.style.display = 'none';
                    fetchData();
                }
                else {
                    CriarPopExtra("Erros ao criar o utilizador", "danger");
                }
            }
        }
        else {
            CriarPopExtra("Preencha os campos todos", "warning");
        }
    }
    catch (e) {
        console.log(e);
        CriarPopExtra(e, "danger");
    }
}