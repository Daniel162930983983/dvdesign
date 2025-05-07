// Efeito de rolagem para a navegação
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Links ativos na navegação
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Filtro de portfólio
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar itens do portfólio
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Rolagem suave para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Validação e envio do formulário de contato
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validação básica
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um endereço de e-mail válido.');
            return;
        }
        
        // Simulação de envio bem-sucedido
        // Em um ambiente real, você enviaria os dados para um servidor aqui
        
        // Resetar o formulário e mostrar mensagem de sucesso
        contactForm.reset();
        
        // Criar e exibir mensagem de sucesso
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <p>Obrigado ${name}! Sua mensagem foi enviada com sucesso.</p>
            <p>Entraremos em contato em breve.</p>
        `;
        successMessage.style.backgroundColor = 'rgba(0, 150, 50, 0.1)';
        successMessage.style.color = '#00c853';
        successMessage.style.padding = '15px';
        successMessage.style.borderRadius = '4px';
        successMessage.style.marginTop = '20px';
        successMessage.style.textAlign = 'center';
        
        // Adicionar a mensagem após o formulário
        contactForm.after(successMessage);
        
        // Remover a mensagem após 5 segundos
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 5000);
    });
}

// Efeito de revelação ao rolar
const revealElements = document.querySelectorAll('.about-content, .service-card, .portfolio-item, .contact-content');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

// Adicionar classe inicial para estilização CSS
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Função para adicionar o efeito de revelação
function addRevealEffect() {
    window.addEventListener('scroll', revealOnScroll);
    // Verificar elementos visíveis no carregamento da página
    revealOnScroll();
}

// Adicionar efeito CSS para elementos revelados
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// Iniciar efeito após o carregamento da página
window.addEventListener('load', addRevealEffect);

// Preloader
window.addEventListener('load', function() {
    // Criar e exibir preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="spinner"></div>
    `;
    
    // Estilizar preloader
    preloader.style.position = 'fixed';
    preloader.style.top = '0';
    preloader.style.left = '0';
    preloader.style.width = '100%';
    preloader.style.height = '100%';
    preloader.style.backgroundColor = 'var(--black)';
    preloader.style.display = 'flex';
    preloader.style.justifyContent = 'center';
    preloader.style.alignItems = 'center';
    preloader.style.zIndex = '9999';
    preloader.style.transition = 'opacity 0.6s ease, visibility 0.6s ease';
    
    // Estilizar spinner
    const spinner = preloader.querySelector('.spinner');
    spinner.style.width = '40px';
    spinner.style.height = '40px';
    spinner.style.border = '4px solid rgba(255, 255, 255, 0.1)';
    spinner.style.borderRadius = '50%';
    spinner.style.borderTop = '4px solid var(--red)';
    spinner.style.animation = 'spin 1s linear infinite';
    
    // Adicionar animação do spinner
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `);
    
    // Adicionar preloader ao corpo
    document.body.prepend(preloader);
    
    // Remover preloader após 1.5 segundos
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.remove();
        }, 600);
    }, 1500);
});

// Modal para visualização de projetos
function setupPortfolioModal() {
    // Criar modal
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body"></div>
        </div>
    `;
    
    // Estilizar modal
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    
    // Estilizar conteúdo do modal
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.backgroundColor = 'var(--black)';
    modalContent.style.margin = '5% auto';
    modalContent.style.padding = '30px';
    modalContent.style.width = '80%';
    modalContent.style.maxWidth = '900px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.position = 'relative';
    
    // Estilizar botão de fechar
    const closeButton = modal.querySelector('.close-modal');
    closeButton.style.position = 'absolute';
    closeButton.style.top = '15px';
    closeButton.style.right = '20px';
    closeButton.style.color = 'var(--white)';
    closeButton.style.fontSize = '28px';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.cursor = 'pointer';
    
    // Adicionar modal ao corpo
    document.body.appendChild(modal);
    
    // Adicionar evento para fechar o modal
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Fechar o modal ao clicar fora do conteúdo
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Adicionar eventos aos links "Ver projeto"
    const projectLinks = document.querySelectorAll('.view-project');
    
    projectLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obter informações do projeto
            const portfolioItem = this.closest('.portfolio-item');
            const projectImage = portfolioItem.querySelector('img').src;
            const projectTitle = portfolioItem.querySelector('h3').textContent;
            const projectCategory = portfolioItem.querySelector('p').textContent;
            
            // Conteúdo do projeto (simulado)
            const projectContent = getProjectContent(index);
            
            // Preencher o modal com o conteúdo do projeto
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <h2 style="font-size: 2rem; margin-bottom: 20px; color: var(--red);">${projectTitle}</h2>
                <div class="project-details" style="display: flex; gap: 30px; margin-bottom: 30px;">
                    <div class="project-image" style="flex: 1;">
                        <img src="${projectImage}" alt="${projectTitle}" style="width: 100%; border-radius: 8px;">
                    </div>
                    <div class="project-info" style="flex: 1;">
                        <p style="margin-bottom: 15px;"><strong>Categoria:</strong> ${projectCategory}</p>
                        <p style="margin-bottom: 15px;"><strong>Cliente:</strong> Cliente ${index + 1}</p>
                        <p style="margin-bottom: 15px;"><strong>Data:</strong> ${getRandomDate()}</p>
                        <p style="line-height: 1.6; color: var(--light-gray);">${projectContent.description}</p>
                    </div>
                </div>
                <div class="project-full-description">
                    <h3 style="font-size: 1.5rem; margin-bottom: 15px; color: var(--red);">Sobre o Projeto</h3>
                    <p style="margin-bottom: 20px; line-height: 1.6; color: var(--light-gray);">${projectContent.fullDescription}</p>
                    
                    <h3 style="font-size: 1.5rem; margin-bottom: 15px; color: var(--red);">Processo de Design</h3>
                    <div class="process-steps" style="display: flex; justify-content: space-between; margin: 30px 0;">
                        ${projectContent.processSteps.map((step, i) => `
                            <div class="step" style="text-align: center; max-width: 150px;">
                                <div class="step-number" style="width: 40px; height: 40px; background-color: var(--red); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">${i + 1}</div>
                                <h4 style="margin-bottom: 10px;">${step.title}</h4>
                                <p style="font-size: 0.9rem; color: var(--light-gray);">${step.description}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <h3 style="font-size: 1.5rem; margin-bottom: 15px; color: var(--red);">Resultado</h3>
                    <p style="line-height: 1.6; color: var(--light-gray);">${projectContent.result}</p>
                </div>
            `;
            
            // Mostrar o modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
}

// Função para obter conteúdo simulado do projeto
function getProjectContent(index) {
    const contents = [
        {
            description: "Redesign completo da identidade visual para uma empresa em expansão no mercado.",
            fullDescription: "O cliente precisava de uma atualização completa da sua marca para refletir seu crescimento e nova direção estratégica. Desenvolvemos uma identidade visual contemporânea, mantendo elementos que já eram reconhecidos pelo público.",
            processSteps: [
                {title: "Pesquisa", description: "Análise do mercado e público-alvo"},
                {title: "Conceito", description: "Desenvolvimento de direções criativas"},
                {title: "Design", description: "Criação do sistema visual completo"},
                {title: "Implementação", description: "Aplicação em todos os pontos de contato"}
            ],
            result: "A nova identidade visual foi recebida com entusiasmo pelo mercado, resultando em um aumento de 40% no reconhecimento da marca em apenas 6 meses após o lançamento."
        },
        {
            description: "Desenvolvimento de um website responsivo e otimizado para conversões.",
            fullDescription: "O desafio era criar uma plataforma digital que não apenas apresentasse os produtos e serviços do cliente, mas também gerasse leads qualificados e aumentasse as conversões.",
            processSteps: [
                {title: "UX Research", description: "Entrevistas com usuários e análise de jornada"},
                {title: "Wireframes", description: "Estruturação das páginas e fluxos"},
                {title: "UI Design", description: "Design visual das interfaces"},
                {title: "Desenvolvimento", description: "Implementação e testes"}
            ],
            result: "O novo website aumentou o tempo médio de permanência em 65% e elevou a taxa de conversão em 32%, superando as expectativas iniciais do cliente."
        },
        {
            description: "Design editorial para um catálogo de produtos premium que reflete a qualidade dos itens apresentados.",
            fullDescription: "O cliente precisava de um catálogo impresso que elevasse a percepção de valor dos seus produtos e servisse como uma ferramenta eficaz para sua equipe de vendas.",
            processSteps: [
                {title: "Briefing", description: "Definição dos objetivos e requisitos"},
                {title: "Direção de Arte", description: "Desenvolvimento do conceito visual"},
                {title: "Diagramação", description: "Layout e hierarquia da informação"},
                {title: "Produção", description: "Acompanhamento da impressão"}
            ],
            result: "O catálogo se tornou uma peça de referência no setor e contribuiu para um aumento de 28% nas vendas dos produtos apresentados."
        },
        {
            description: "Criação de uma identidade visual completa para uma startup inovadora no setor de tecnologia.",
            fullDescription: "A startup precisava estabelecer sua presença no mercado com uma identidade visual que comunicasse inovação, confiabilidade e tecnologia de ponta.",
            processSteps: [
                {title: "Imersão", description: "Entendimento profundo do negócio"},
                {title: "Ideação", description: "Geração de alternativas criativas"},
                {title: "Refinamento", description: "Desenvolvimento do sistema visual"},
                {title: "Guia de Marca", description: "Documentação para aplicação consistente"}
            ],
            result: "A identidade visual foi fundamental para a startup conquistar um financiamento de $2 milhões e estabelecer parcerias estratégicas no setor."
        },
        {
            description: "Design de interface para um aplicativo mobile com foco em experiência do usuário e usabilidade.",
            fullDescription: "O desafio era criar um aplicativo intuitivo que resolvesse problemas complexos de maneira simples e acessível para usuários com diferentes níveis de familiaridade com tecnologia.",
            processSteps: [
                {title: "User Research", description: "Entendimento das necessidades dos usuários"},
                {title: "Prototipação", description: "Criação de protótipos interativos"},
                {title: "Testes", description: "Validação com usuários reais"},
                {title: "Design Final", description: "Refinamento baseado em feedback"}
            ],
            result: "O aplicativo alcançou uma avaliação de 4.8/5 nas lojas de aplicativos e conquistou mais de 50 mil downloads nos primeiros três meses após o lançamento."
        },
        {
            description: "Design de embalagem inovador que destaca o produto e conecta-se emocionalmente com o consumidor.",
            fullDescription: "O cliente buscava uma solução de embalagem que não apenas protegesse o produto, mas também comunicasse seus valores de sustentabilidade e premium.",
            processSteps: [
                {title: "Análise", description: "Pesquisa de mercado e concorrência"},
                {title: "Conceituação", description: "Desenvolvimento de conceitos criativos"},
                {title: "Prototipagem", description: "Criação de mockups físicos"},
                {title: "Finalização", description: "Preparação para produção"}
            ],
            result: "A nova embalagem reduziu custos de produção em 15% enquanto aumentou a percepção de valor do produto, resultando em um aumento de 22% nas vendas no primeiro trimestre após o lançamento."
        }
    ];
    
    return contents[index % contents.length];
}

// Gerar data aleatória para os projetos
function getRandomDate() {
    const year = 2023 + Math.floor(Math.random() * 3);
    const month = 1 + Math.floor(Math.random() * 12);
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    return `${monthNames[month - 1]} de ${year}`;
}

// Inicializar modal de portfólio quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', setupPortfolioModal);

// Paralax na seção hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// Animação de digitação para o título do hero
function setupTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h2');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    const textWithoutSpan = originalText.replace(/<\/?span[^>]*>/g, '');
    const words = textWithoutSpan.split(' ');
    
    // Limpar o conteúdo do título
    heroTitle.innerHTML = '';
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            currentText = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Texto com o efeito de digitação
        const displayText = words.map((word, index) => {
            if (index < wordIndex) {
                return word;
            } else if (index === wordIndex) {
                return currentText;
            } else {
                return '';
            }
        }).join(' ');
        
        // Reconstruir com a tag span
        heroTitle.innerHTML = displayText.replace('transforma', '<span class="highlight">transforma</span>');
        
        // Definir a próxima etapa
        if (!isDeleting && charIndex === currentWord.length) {
            if (wordIndex === words.length - 1) {
                return; // Finaliza quando terminar todas as palavras
            }
            
            setTimeout(() => {
                wordIndex++;
                type();
            }, 500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex++;
            
            if (wordIndex === words.length) {
                wordIndex = 0; // Reiniciar
            }
            
            setTimeout(type, 500);
        } else {
            // Velocidade de digitação
            setTimeout(type, isDeleting ? 50 : 80);
        }
    }
    
    // Iniciar o efeito de digitação após 1 segundo
    setTimeout(type, 1000);
}

// Inicializar efeito de digitação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', setupTypingEffect);