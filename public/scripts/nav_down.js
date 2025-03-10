function barraL() {
    const barra = document.querySelector('.barra_lateral');
    switch(barra.style.left) {
        case '0px':
            barra.style.left = '-100px';
            barra.style.boxShadow = 'none';
            break;
        case '-100px':
            barra.style.left = '0px';
            barra.style.boxShadow = '2px 2px 20px black';
            break;
    }
}

const hamburgao = document.querySelector('.hamburgao');
const barra = document.querySelector('.barra_lateral');

document.addEventListener('click', e => {
    if (hamburgao.contains(e.target)) {
        switch (barra.style.left) {
            case '0px':
                barra.style.left = '-100px';
                barra.style.boxShadow = 'none';
            break;
            case '-100px':
                barra.style.left = '0px';
                barra.style.boxShadow = '2px 2px 20px black';
                break;
        }
    }
    else if (barra.contains(e.target)) {
        barra.style.left = '0px';
        barra.style.boxShadow = '2px 2px 20px black';
    }
    else {
        barra.style.left = '-100px';
        barra.style.boxShadow = 'none';
    }
})