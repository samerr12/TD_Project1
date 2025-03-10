function AtivarRegisto() {
    const registo = document.querySelector('.container_registo');
    const null_space = document.querySelector('.null_space');

    switch(registo.style.display) {
        case 'none':
            registo.style.pointerEvents = 'auto';
            registo.setAttribute('tabindex', '0');
            registo.style.display = 'block';
            registo.style.zIndex = "37";
            null_space.style.display = 'block';
            break;
        case 'block':
            document.getElementById('txtNomeCriar').value = "";
            document.getElementById('txtPasswordCriar').value = "";
            registo.style.display = 'none';
            null_space.style.display = 'none';
            break;
    }
}

async function CriarConta() {
    const username = document.getElementById('txtNomeCriar').value;
    const password = document.getElementById('txtPasswordCriar').value;

    if (username != "" && password != "") {
        if (password.length <= 4) {
            CriarPopExtra("Utilize uma palavra passe mais forte", "warning");
            return;
        }
        if (password.replaceAll(" ", "") != password) {
            CriarPopExtra("Não utilize espaços na palavra passe", "warning");
            return;
        }
        else {
            try {
                console.log(username, password);
                const response = await fetch('/skibidiAPI/registo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });
                console.log(response);
        
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.message);
                    CriarPopExtra("Conta criada com sucesso!", "safe");
                }
                else if (response.status = 401) {
                    CriarPopExtra("Este nome já foi criado", "warning");
                }
                else {
                    CriarPopExtra(response, "danger");
                }
            } catch (error) {
                CriarPopExtra(error, "danger");
            }
        }
    }
    else {
        CriarPopExtra("Preencha o formulário corretamente", "warning");
    }
}