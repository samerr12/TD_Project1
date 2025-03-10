function criarCookie() {
    const tempoSessao = 10 * 60 * 1000;
    const prazoValidade = new Date(Date.now() + tempoSessao).toUTCString();

    document.cookie = `session=active; expires=${prazoValidade}; path=/`;
}

function verificarCookie() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'session' && value === 'active') {
            return true;
        }
    }
    return false;
}

function redirecionarSessoes() {
    if (!verificarCookie()) {
        window.location.href = "http://localhost:3000/index.html";
    }
}