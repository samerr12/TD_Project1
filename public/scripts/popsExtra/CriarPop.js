function CriarPopExtra(mensagem, tipo) {
    const base = document.getElementById('corpo');

    const popExtras_container_total = document.createElement('div');
        const popExtras_container_head = document.createElement('div');
            const popExtras_Tmsg = document.createElement('h2');
        const popExtras_container_msg = document.createElement('div');
            const popExtras_icone = document.createElement('img');
            const popExtras_msg = document.createElement('p');
        const popExtras_container_btns = document.createElement('div');
            const btn_popExtras_ok = document.createElement('div');

    popExtras_container_total.className = "popExtras_container_total";
    popExtras_container_head.className = "popExtras_container_head";
    popExtras_Tmsg.id = "popExtras_Tmsg";
    popExtras_container_msg.className = "popExtras_container_msg";
    popExtras_icone.id = "popExtras_icone";
    popExtras_icone.className = "popExtras_icone";
    popExtras_msg.id = "popExtras_msg";
    popExtras_container_btns.className = "popExtras_container_btns";

    popExtras_msg.innerHTML = mensagem;
    btn_popExtras_ok.innerHTML = "OK";

    switch (tipo) {
        case 'danger':
            popExtras_Tmsg.innerHTML = "Erro";
            popExtras_icone.src = "../media/wrong.svg"
            btn_popExtras_ok.classList = "btn_popExtras_ok Extra_erro";
            break;
        case 'warning':
            popExtras_Tmsg.innerHTML = "Aviso";
            popExtras_icone.src = "../media/triangle.svg"
            btn_popExtras_ok.classList = "btn_popExtras_ok Extra_aviso";
            break;
        case 'safe':
            popExtras_Tmsg.innerHTML = "Sucesso";
            popExtras_icone.src = "../media/correct.svg"
            btn_popExtras_ok.classList = "btn_popExtras_ok Extra_certo";
            break;
    }

    base.appendChild(popExtras_container_total);
    popExtras_container_total.appendChild(popExtras_container_head);
    popExtras_container_head.appendChild(popExtras_Tmsg);
    popExtras_container_total.appendChild(popExtras_container_msg);
    popExtras_container_msg.appendChild(popExtras_icone);
    popExtras_container_msg.appendChild(popExtras_msg);
    popExtras_container_total.appendChild(popExtras_container_btns);
    popExtras_container_btns.appendChild(btn_popExtras_ok);

    //parte feita pelo chat pq eu n sabia como fazer
    // Set focus on the new popup
    popExtras_container_total.setAttribute('tabindex', '0');
    popExtras_container_total.focus();

    //tira o focus
    const pop_Cuser = document.querySelector('.pop_Cuser');
    const pop_Uuser = document.querySelector('.pop_Uuser');
    const pop_Duser = document.querySelector('.pop_Duser');
    const pop_Registo = document.querySelector('.container_registo');
    TirarFoco();

    // Add event listener to restore focusability when the popup is closed
    btn_popExtras_ok.addEventListener('click', () => {
        base.removeChild(popExtras_container_total);
        if (pop_Cuser) {
            pop_Cuser.style.pointerEvents = 'auto';
            pop_Cuser.setAttribute('tabindex', '0');
            pop_Cuser.style.zIndex = "37";
        }
        if (pop_Uuser) {
            pop_Uuser.style.pointerEvents = 'auto';
            pop_Uuser.setAttribute('tabindex', '0');
            pop_Uuser.style.zIndex = "37";
        }
        if (pop_Duser) {
            if (pop_Duser.style.display != "none") {
                pop_Duser.style.pointerEvents = 'auto';
                pop_Duser.setAttribute('tabindex', '0');
                pop_Duser.style.zIndex = "37";

                var URL = new URLSearchParams(window.location.search);
                URL.delete('Funcid');
                window.location.search = URL;
            }
        }
        if (pop_Registo) {
            if (tipo == "safe") {
                AtivarRegisto();
            }
            else {
                pop_Registo.style.pointerEvents = 'auto';
                pop_Registo.setAttribute('tabindex', '0');
                pop_Registo.style.zIndex = "37";
            }
        }
    });
}

function TirarFoco() {
    //tira o focus
    const pop_Cuser = document.querySelector('.pop_Cuser');
    if (pop_Cuser) {
        pop_Cuser.style.pointerEvents = 'none';
        pop_Cuser.setAttribute('tabindex', '-1');
        pop_Cuser.style.zIndex = "16";
    }
    const pop_Uuser = document.querySelector('.pop_Uuser');
    if (pop_Uuser) {
        pop_Uuser.style.pointerEvents = 'none';
        pop_Uuser.setAttribute('tabindex', '-1');
        pop_Uuser.style.zIndex = "16";
    }
    const pop_Duser = document.querySelector('.pop_Duser');
    if (pop_Duser) {
        if (pop_Duser.style.display != "none") {
            pop_Duser.style.pointerEvents = 'none';
            pop_Duser.setAttribute('tabindex', '-1');
            pop_Duser.style.zIndex = "16";
        }
    }
    const pop_Registo = document.querySelector('.container_registo');
    if (pop_Registo) {
        pop_Registo.style.pointerEvents = 'none';
        pop_Registo.setAttribute('tabindex', '-1');
        pop_Registo.style.zIndex = "16";
    }
}