function pop_Cuser() {
    const pop = document.querySelector('.pop_Cuser');
    const null_space = document.querySelector('.null_space');

    switch(pop.style.display) {
        case 'block':
            pop.style.display = 'none';
            null_space.style.display = 'none';
            break
        case 'none':
            pop.style.display = 'block';
            null_space.style.display = 'block';
            break;
    }
}

function pop_Uuser() {
    const pop = document.querySelector('.pop_Uuser');
    const null_space = document.querySelector('.null_space');

    const nomeFunc = document.getElementById('NomeFuncShow');
    const txtNomeFunc = document.getElementById('txtNomeFuncEdit');
    const idadeFunc = document.getElementById('IdadeFuncShow');
    const txtIdadeFunc = document.getElementById('txtIdadeFuncEdit');
    const contactonomeFunc = document.getElementById('ContactoFuncShow');
    const txtContactoFunc = document.getElementById('txtContactoFuncEdit');

    switch(pop.style.display) {
        case 'block':
            pop.style.display = 'none';
            null_space.style.display = 'none';
            break
        case 'none':
            pop.style.display = 'block';
            txtNomeFunc.value = nomeFunc.innerHTML;
            txtIdadeFunc.value = idadeFunc.innerHTML;
            txtContactoFunc.value = contactonomeFunc.innerHTML;
            null_space.style.display = 'block';
            break;
    }
}

function pop_Duser() {
    const pop = document.querySelector('.pop_Duser');
    const null_space = document.querySelector('.null_space');

    switch(pop.style.display) {
        case 'block':
            pop.style.display = 'none';
            null_space.style.display = 'none';
            break
        case 'none':
            pop.style.display = 'block';
            null_space.style.display = 'block';
            break;
    }
}