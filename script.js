// 1. GERENCIAMENTO DO CARREGAMENTO (PRELOADER)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('loader-hidden');
    }, 600); // Pequeno atraso para suavidade
});

// 2. SLIDESHOW DE FUNDO NA SEÇÃO HERO
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 segundos

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, slideInterval);
}
initHeroSlideshow();

// 3. ANIMAÇÃO DE REVELAÇÃO AO ROLAR (INTERSECTION OBSERVER)
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15 // Dispara quando 15% do elemento aparece
    });

    revealElements.forEach(el => observer.observe(el));
}
initScrollReveal();

// 4. ENVIO DO FORMULÁRIO COM FEEDBACK
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button');
        const originalText = btn.innerText;
        
        // Feedback visual de carregamento
        btn.innerText = "Enviando...";
        btn.style.opacity = "0.7";
        btn.disabled = true;

        // Simulação de processamento (AJAX)
        setTimeout(() => {
            alert('Sua mensagem foi enviada! Entraremos em contato em breve por WhatsApp ou e-mail.');
            
            btn.innerText = originalText;
            btn.style.opacity = "1";
            btn.disabled = false;
            contactForm.reset();
        }, 1500);
    });
}

// 5. MUDANÇA DE COR DO HEADER AO ROLAR
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = '#000';
        header.style.padding = '0.7rem 0';
    } else {
        header.style.background = '#1a1a1a';
        header.style.padding = '1rem 0';
    }
});

// Banco de dados das "pastas" de fotos
const projetos = {
    'residencial': {
        titulo: 'Reforma Residencial - Lagoa Santa',
        fotos: [
            '//via.placeholder.com/400x300?text=Iluminação+LED',
            'https://via.placeholder.com/400x300?text=Iluminação+LED',
            'https://via.placeholder.com/400x300?text=Fiação+Concluída'
        ]
    },
    'industrial': {
        titulo: 'Montagem Industrial - Galpão MG',
        fotos: [
            'https://via.placeholder.com/400x300?text=Padrão+Trifásico',
            'https://via.placeholder.com/400x300?text=Gerador',
            'https://via.placeholder.com/400x300?text=Painel+de+Controle'
        ]
    }
};

function abrirProjeto(id) {
    const modal = document.getElementById('modal-galeria');
    const listaFotos = document.getElementById('modal-lista-fotos');
    const titulo = document.getElementById('modal-titulo');
    
    const dados = projetos[id];
    titulo.innerText = dados.titulo;
    listaFotos.innerHTML = ''; // Limpa fotos anteriores

    dados.fotos.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        listaFotos.appendChild(img);
    });

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Trava o scroll do site
}

function fecharModal() {
    document.getElementById('modal-galeria').style.display = "none";
    document.body.style.overflow = "auto"; // Destrava o scroll
}

// Fechar modal ao clicar fora da caixa branca
window.onclick = function(event) {
    const modal = document.getElementById('modal-galeria');
    if (event.target == modal) fecharModal();
}