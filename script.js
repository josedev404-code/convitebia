let dataConfirmada = false;

function mostrarData() {
    if (!dataConfirmada) {
        document.getElementById('dateSection').classList.add('show');
        document.querySelector('.buttons-section').classList.add('hidden');
        // Desabilita ambos os botões
        document.querySelectorAll('button').forEach(btn => {
            if (btn !== document.querySelector('.confirm-btn')) {
                btn.disabled = true;
            }
        });
    }
}

function confirmarData() {
    const horario = document.getElementById('dataEscolhida').value;
    
    if (!horario) {
        alert('Por favor, escolha um horário! ⏰');
        return;
    }

    // Formatar o horário
    const [horas, minutos] = horario.split(':');
    const horarioFormatado = `${horas}:${minutos}`;

    // Criar mensagem para o WhatsApp
    const mensagem = `Oi josé gatão lindão, vamos sair no horário ${horarioFormatado}`;
    
    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Redirecionar para WhatsApp
    const numeroWhatsapp = '34999915174';
    const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${mensagemCodificada}`;
    
    window.location.href = urlWhatsapp;
}

function moverBotaoNao() {
    const botaoNao = document.querySelector('.btn-nao');
    
    // Adicionar classe para mudar para fixed positioning
    botaoNao.classList.add('fugindo');
    
    // Gerar posição aleatória
    const posX = Math.random() * (window.innerWidth - botaoNao.offsetWidth);
    const posY = Math.random() * (window.innerHeight - botaoNao.offsetHeight);
    
    botaoNao.style.left = posX + 'px';
    botaoNao.style.top = posY + 'px';
}

function voltarBotaoNao() {
    const botaoNao = document.querySelector('.btn-nao');
    botaoNao.classList.remove('fugindo');
    botaoNao.style.left = '';
    botaoNao.style.top = '';
}

function rejeitarConvite() {
    moverBotaoNao();
}

// Definir data mínima como hoje
window.addEventListener('load', function() {
    // Adicionar event listener ao botão "não"
    const botaoNao = document.querySelector('.btn-nao');
    let timerId = null;
    
    // Quando o mouse entra no botão, ele foge
    botaoNao.addEventListener('mouseenter', function(e) {
        if (!this.disabled) {
            moverBotaoNao();
        }
    });

    // Quando o mouse sai do botão, retorna à posição original
    botaoNao.addEventListener('mouseleave', function(e) {
        if (!this.disabled) {
            // Pequeno delay para dar tempo de ver a animação
            setTimeout(() => {
                voltarBotaoNao();
            }, 100);
        }
    });

    // Também detectar quando o mouse se aproxima muito do botão
    document.addEventListener('mousemove', function(e) {
        if (botaoNao.disabled) return;
        
        const rect = botaoNao.getBoundingClientRect();
        const distancia = Math.sqrt(
            Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
            Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
        );
        
        // Se o mouse estiver a menos de 100px do botão, ele foge
        if (distancia < 100) {
            moverBotaoNao();
        }
    });
});
