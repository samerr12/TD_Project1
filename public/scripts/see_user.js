function see_user(event) {
    const EClicado = event.currentTarget;

    const ENomeFunc = EClicado.querySelector('.nome_utilizador');

    var URL = new URLSearchParams(window.location.search);
    URL.set('Funcid', ENomeFunc.id);
    //console.log(URL);
    window.location.search = URL;
}

function MostrarTodosFunc() {
    var URL = new URLSearchParams(window.location.search);
    URL.set('search', "tudo");
    URL.delete('Equipaid');
    URL.delete('Linhaid');
    window.location.search = URL;
}

function AdicionarFiltros() {

    FuncionariosLinhas();
    console.log(LinhaValor);
    console.log(EquipaValor);

    var URL = new URLSearchParams(window.location.search);
    if (LinhaValor != null) {
        URL.delete('search');
        if (EquipaValor != null) {
            URL.set('Linhaid', LinhaValor);
            URL.set('Equipaid', EquipaValor);
        }
        else {
            URL.set('Linhaid', LinhaValor);
            URL.delete('Equipaid');
        }
    }
    window.location.search = URL;
}

async function LerParamsFiltros() {
    const params = new URLSearchParams(window.location.search);
    const procura = params.get('search');
    const LinhaSelect = params.get('Linhaid');
    const EquipaSelect = params.get('Equipaid');
    
    var data = "";

    if (LinhaSelect != null) {
        if (params.has('Equipaid') && EquipaSelect != null) {
            //para eu poder verificar se o utilizador mete o id ou tenta meter á força
            try {
                parseInt(EquipaSelect);
                const response = await fetch(`/skibidiAPI/funcionariosFilter/${LinhaSelect}/${EquipaSelect}`);
                data = await response.json();
            }
            catch (e) {
                const response = await fetch('/skibidiAPI/funcionarios');
                data = await response.json();
            }
        }
        else {
            try {
                parseInt(LinhaSelect);
                const response = await fetch(`/skibidiAPI/funcionariosFilter/${LinhaSelect}`);
                data = await response.json();
            }
            catch (e) {
                const response = await fetch('/skibidiAPI/funcionarios');
                data = await response.json();
            }
        }
    }
    else {
        const response = await fetch('/skibidiAPI/funcionarios');
        data = await response.json();
    }
    if ((procura != null)) {
        if (procura == "tudo") {
            const response = await fetch('/skibidiAPI/funcionarios');
            data = await response.json();
        }
    }

    return data;
}