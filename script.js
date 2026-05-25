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
    const data = document.getElementById('dataEscolhida').value;
    
    if (!data) {
        alert('Por favor, escolha uma data! 📅');
        return;
    }

    // Formatar a data
    const dataObj = new Date(data);
    const diasSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
    const dia = dataObj.getDate();
    const mes = meses[dataObj.getMonth()];
    const ano = dataObj.getFullYear();
    const diaSemana = diasSemana[dataObj.getDay()];

    const dataFormatada = `${diaSemana}, ${dia} de ${mes} de ${ano}`;

    document.getElementById('dataConfirmada').textContent = dataFormatada;
    document.getElementById('resultado').classList.add('show');
    document.getElementById('dateSection').classList.remove('show');

    // Desabilita todos os botões permanentemente
    document.querySelectorAll('button').forEach(btn => {
        btn.disabled = true;
    });

    dataConfirmada = true;
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
    alert('Tudo bem... 😢 Talvez numa próxima oportunidade! 💔');
}

// Impedir que a data seja menor que hoje
document.getElementById('dataEscolhida').addEventListener('change', function() {
    const hoje = new Date().toISOString().split('T')[0];
    if (this.value < hoje) {
        alert('Por favor, escolha uma data no futuro! 📅');
        this.value = '';
    }
});

// Definir data mínima como hoje
window.addEventListener('load', function() {
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('dataEscolhida').min = hoje;

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
