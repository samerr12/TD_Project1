async function verificarDados() {
    const txtNome = document.getElementById('txtNome').value;
    const txtPassword = document.getElementById('txtPassword').value;

    try {
        const response = await fetch('/skibidiAPI/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: txtNome, password: txtPassword }),
        });

        if (response.ok) {
            criarCookie();
            window.location = "http://localhost:3000/paginas/dashboard.html";
        } else {
            CriarPopExtra("Credenciais incorretas", "warning");
        }
    } catch (error) {
        CriarPopExtra(error, "danger");
    }
}