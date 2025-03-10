function pop_Clinha() {
    const pop_Clinha = document.getElementById('pop_Clinha');

    switch (pop_Clinha.style.display) {
        case 'block':
            pop_Clinha.style.display = 'none';
            document.querySelector('.null_space').style.display = 'none';
            break;
        case 'none':
            pop_Clinha.style.display = 'block';
            document.querySelector('.null_space').style.display = 'block';
            break;
    }
}

function pop_Elinha() {
    const pop_Elinha = document.getElementById('pop_Elinha');

    switch (pop_Elinha.style.display) {
        case 'block':
            pop_Elinha.style.display = 'none';
            document.querySelector('.null_space').style.display = 'none';
            break;
        case 'none':
            pop_Elinha.style.display = 'block';
            document.querySelector('.null_space').style.display = 'block';
            break;
    }
}

//=========================
//||------ Turnos -------||
//=========================
function pop_Cturno() {
    const pop_Cturno = document.getElementById('pop_Cturno');

    switch (pop_Cturno.style.display) {
        case 'block':
            pop_Cturno.style.display = 'none';
            document.querySelector('.null_space').style.display = 'none';
            break;
        case 'none':
            pop_Cturno.style.display = 'block';
            document.querySelector('.null_space').style.display = 'block';
            break;
    }
}

function pop_Eturno() {
    const pop_Eturno = document.getElementById('pop_Eturno');

    switch (pop_Eturno.style.display) {
        case 'block':
            pop_Eturno.style.display = 'none';
            document.querySelector('.null_space').style.display = 'none';
            break;
        case 'none':
            pop_Eturno.style.display = 'block';
            document.querySelector('.null_space').style.display = 'block';
            break;
    }
}

//=========================
//||------ Equipas ------||
//=========================

function pop_Cequipa() {
    const pop_Cequipa = document.getElementById('pop_Cequipa');

    switch (pop_Cequipa.style.display) {
        case 'block':
            pop_Cequipa.style.display = 'none';
            document.querySelector('.null_space').style.display = 'none';
            break;
        case 'none':
            pop_Cequipa.style.display = 'block';
            document.querySelector('.null_space').style.display = 'block';
            break;
    }
}

function pop_Eequipa() {
    const pop_Eequipa = document.getElementById('pop_Eequipa');

    switch (pop_Eequipa.style.display) {
        case 'block':
            pop_Eequipa.style.display = 'none';
            document.querySelector('.null_space').style.display = 'none';
            break;
        case 'none':
            pop_Eequipa.style.display = 'block';
            document.querySelector('.null_space').style.display = 'block';
            break;
    }
}

function pop_D() {
    if (document.getElementById('Dgeral')) {
        document.getElementById('Dgeral').remove();
        document.querySelector('.null_space').style.display = 'none';
    }
}

async function pop_Dgeral(tipo) {
    const container_total = document.getElementById('corpo');
    const null_space = document.querySelector('.null_space');

    const Dgeral = document.createElement('div');
        const Headgeral = document.createElement('h2');
        const textD = document.createElement('div');
            const Dconteudo = document.createElement('p');
        const container_Dbtns = document.createElement('div');
            const Dbtn_cancelar = document.createElement('button');
            const Dbtn_continuar = document.createElement('button');

    Dgeral.classList = "pop_CE CE_XXL";
    Dgeral.id = 'Dgeral';
    textD.className = "text_Dgeral";
    container_Dbtns.className = "container_pop_botoes";
    Dbtn_cancelar.className = "btn_pop_cancelar";
    Dbtn_cancelar.setAttribute("onclick", 'pop_D()');
    Dbtn_continuar.className = "btn_pop_continuar"
    null_space.style.display = 'block';

    switch (tipo) {
        case 'linha':
            const cbbLinhasMain = document.getElementById('cbbLinhasMain');
            Headgeral.innerHTML = "Deseja eliminar a linha: \"" + cbbLinhasMain.options[cbbLinhasMain.selectedIndex].text + "\"?";

            var response = await fetch(`/skibidiAPI/search_related/linha/${cbbLinhasMain.value}`);
            var Minecraft121 = await response.json();

            Dconteudo.innerHTML = listaContPopD(Minecraft121, tipo);
            Dbtn_continuar.setAttribute("onclick", 'deleteLinha()');
            break;
        case 'turno':
            const cbbTurnosMain = document.getElementById('cbbTurnosMain');
            Headgeral.innerHTML = "Deseja eliminar a linha: \"" + cbbTurnosMain.options[cbbTurnosMain.selectedIndex].text.slice(0, -22) + "\"?";

            var response = await fetch(`/skibidiAPI/search_related/turno/${cbbTurnosMain.value}`);
            var Minecraft121 = await response.json();

            Dconteudo.innerHTML = listaContPopD(Minecraft121, tipo);
            //Dconteudo.innerHTML = "Antes de eliminar verifique que este turno não tem uma equipa associada";
            Dbtn_continuar.setAttribute("onclick", 'deleteTurno()');
            break;
        case 'equipa':
            const cbbEquipasMain = document.getElementById('cbbEquipasMain');
            Headgeral.innerHTML = "Deseja eliminar a linha: \"" + cbbEquipasMain.options[cbbEquipasMain.selectedIndex].text + "\"?";

            var response = await fetch(`/skibidiAPI/search_related/equipa/${cbbEquipasMain.value}`);
            var Minecraft121 = await response.json();

            Dconteudo.innerHTML = listaContPopD(Minecraft121, tipo);
            //Dconteudo.innerHTML = "Antes de eliminar verifique que esta equipa não tem funcionários associados";
            Dbtn_continuar.setAttribute("onclick", 'deleteLinha()');
            break;
    }

    Dbtn_cancelar.innerHTML = "Cancelar";
    Dbtn_continuar.innerHTML = "Continuar";

    container_total.appendChild(Dgeral);
        Dgeral.appendChild(Headgeral);
        Dgeral.appendChild(textD);
            textD.appendChild(Dconteudo);
        Dgeral.appendChild(container_Dbtns);
            container_Dbtns.appendChild(Dbtn_cancelar);
            container_Dbtns.appendChild(Dbtn_continuar);
}

function listaContPopD(Minecraft121, tipo) {
    var contExistente = false;
    var txt_final = "";

    arrLinhas = [];
    arrTurnos = [];
    arrEquipas = [];
    arrFuncionarios = [];

    Minecraft121.forEach(element => {
        if (element.NomeLinha) {
            arrLinhas.push(element.NomeLinha);
            contExistente = true;
        }
    });

    if (contExistente) {
        console.log(arrLinhas);
        txt_final = "Esta "+ tipo + " tem os seguintes turnos associados:<br>";
    }
    else {
        txt_final = "Não tem nenhum item associado, deseja continuar?<br>Esta acção não pode ser revertida";
    }

    return txt_final;
}