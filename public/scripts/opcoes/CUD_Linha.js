async function createLinha() {
    const txtNomeLinha = document.getElementById('Clinha_txtNomeLinha').value;
    console.log(txtNomeLinha);
}

async function readLinha() {
    const cbbTurnosMain = document.getElementById('cbbTurnosMain').value;

    const respostaLinhas = await fetch('/skibidiAPI/equipas_linhas/');
    var shulkerbox = await respostaLinhas.json();

    if (shulkerbox.length > 0) {
        const cbbNomeLinhaC = document.getElementById('cbbNomeLinhaC');
        const cbbNomeLinhaE = document.getElementById('cbbNomeLinhaE');

        var arrNomeLinhas = [];

        var valLinha = 0;
        for (i=0; i < shulkerbox.length; i++) {
            arrNomeLinhas.push({ id: shulkerbox[i].idLinha, name: shulkerbox[i].NomeLinha });
        }

        arrNomeLinhas = arrNomeLinhas.filter((item, index, self) =>
            index === self.findIndex((t) => (
                t.id === item.id && t.name === item.name
            ))
        );

        arrNomeLinhas.forEach(element => {
            var opcao = document.createElement('option');
            opcao.value = element.id;
            opcao.innerHTML = element.name;
            
            cbbNomeLinhaC.appendChild(opcao);
            cbbNomeLinhaE.appendChild(opcao.cloneNode(true));
        });
    }
}

async function updateLinha() {
    const txtNomeLinha = document.getElementById('Elinha_txtNomeLinha').value;
    console.log(txtNomeLinha);
}

async function deleteLinha() {

}