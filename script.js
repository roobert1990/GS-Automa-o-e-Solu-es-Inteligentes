// 1. CARREGAMENTO E PRELOAD
window.addEventListener('load', () => {
    document.body.classList.remove('preload');
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('loader-hidden');
    }, 1000);
});

// 2. MENU HAMBÚRGUER (CORRIGIDO)
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

menu.addEventListener('click', () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Fechar menu ao clicar num link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('is-active');
        menuLinks.classList.remove('active');
    });
});

// 3. SLIDESHOW HERO
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if(slides.length === 0) return;
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5000);
}
initSlideshow();

// 4. EFEITO REVEAL
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 5. BANCO DE DADOS DA GALERIA (PASTAS)
const projetos = {
    'residencial': {
        titulo: 'Reforma Residencial',
        fotos: [
            'imagens/instalação elétrica/foto1.jpeg',
            'imagens/instalação elétrica/foto2.jpeg',
            'imagens/instalação elétrica/foto3.jpeg',
        ]
    },
    'industrial': {
        titulo: 'Montagem Industrial - Galpão MG',
        fotos: [

        ]
    }
};


function abrirProjeto(id) {
    const modal = document.getElementById('modal-galeria');
    const lista = document.getElementById('modal-lista-fotos');
    const titulo = document.getElementById('modal-titulo');
    
    const dados = projetos[id];
    titulo.innerText = dados.titulo;
    lista.innerHTML = ''; 

    dados.fotos.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        lista.appendChild(img);
    });

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function fecharModal() {
    document.getElementById('modal-galeria').style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    const modal = document.getElementById('modal-galeria');
    if (event.target == modal) fecharModal();
}