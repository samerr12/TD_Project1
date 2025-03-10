async function editFuncionario( ) {
    const pop = document.querySelector('.pop_Uuser');
    const null_space = document.querySelector('.null_space');

    const txtNomeFuncEdit = document.getElementById('txtNomeFuncEdit');
    const txtIdadeFuncEdit = document.getElementById('txtIdadeFuncEdit');
    const txtContactoFuncEdit = document.getElementById('txtContactoFuncEdit');
    const cbbLinhaEdit = document.getElementById('cbbLinhaEdit');
    const cbbEquipaEdit = document.getElementById('cbbEquipaEdit');

    try {
        if (isNaN(parseInt(txtIdadeFuncEdit.value))) {
            CriarPopExtra("Preencha a idade corretamente", "warning");
            return;
        }
        if (isNaN(parseInt(txtContactoFuncEdit.value))) {
            CriarPopExtra("Preencha o contacto corretamente", "warning");
            return;
        }

        if (txtNomeFuncEdit.value != "" && txtIdadeFuncEdit.value != "" && txtContactoFuncEdit.value != "") {

            const params = new URLSearchParams(window.location.search);
            const idFunc = params.get('Funcid');
            const response = await fetch(`/skibidiAPI/funcionarios/${idFunc}`);
            var Minecraft121 = await response.json();

            if (Minecraft121.length > 0) {
                Minecraft121 = Minecraft121[0];

                const NomeOG = Minecraft121.NomeFuncionario;
                const IdadeOG = Minecraft121.IdadeFuncionario;
                const ContactoOG = Minecraft121.ContactoFuncionario;
                const EquipaOG = Minecraft121.idEquipa;
    
                const valNome = txtNomeFuncEdit.value;
                const valIdade = txtIdadeFuncEdit.value;
                const valContacto = txtContactoFuncEdit.value.replaceAll(" ", "");
                var valEquipa = cbbEquipaEdit.value;

                if (parseInt(valIdade) < 14) {
                    CriarPopExtra("Calma, acho que não contrataste um menor certo?", "warning");
                    return;
                }
                if (valContacto.length != 9) {
                    CriarPopExtra("Preencha o contacto corretamente<br>Certifique-se que não tem espaços", "warning");
                    return;
                }

                if (valEquipa == "null" && EquipaOG != null) {
                    valEquipa = EquipaOG;
                }
                else {
                    if (valEquipa == "null" && EquipaOG == null) {
                        valEquipa = null;
                    }
                }
                
                var request;
                if (valEquipa != null) {
                    request = await fetch(`/skibidiAPI/funcionarios/update/${valNome}/${valIdade}/${valContacto}/${valEquipa}/${idFunc}`);
                }
                else {
                    request = await fetch(`/skibidiAPI/funcionarios/update_NEquipa/${valNome}/${valIdade}/${valContacto}/${idFunc}`);
                }

                var Minecraft121 = await request.json();
                if (Minecraft121.affectedRows == 1) {
                    CriarPopExtra("Funcionário editado com sucesso", "safe");
                    cbbLinhaEdit.replaceChildren();
                    fetchData();
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