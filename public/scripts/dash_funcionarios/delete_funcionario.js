async function deleteFuncionario() {
    const params = new URLSearchParams(window.location.search);
    const idFunc = params.get('Funcid');

    request = await fetch(`/skibidiAPI/funcionarios/delete/${idFunc}`);
    var Minecraft121 = await request.json();
    if (Minecraft121.affectedRows == 1) {
        CriarPopExtra("Funcionário eliminado com sucesso", "safe");
    }
    else {
        CriarPopExtra("Aconteceu algum problema", "danger");
    }
}