document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('leadForm');
    if (!form) return;

    // 1. Captura o parâmetro 'origem' da URL
    const urlParams = new URLSearchParams(window.location.search);
    const origem = urlParams.get('origem') || 'acesso_direto';
    document.getElementById('origemLead').value = origem;

    // 2. Máscara automática para WhatsApp
    const whatsInput = document.getElementById('whatsapp');
    whatsInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }
        if (value.length > 10) {
            value = `${value.slice(0, 10)}-${value.slice(10)}`;
        }
        e.target.value = value;
    });

    // 3. Validação e Envio da Inscrição
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const posicao = document.getElementById('posicao').value;

        let isValid = true;

        // Limpa erros anteriores
        document.getElementById('erroNome').textContent = '';
        document.getElementById('erroEmail').textContent = '';
        document.getElementById('erroWhats').textContent = '';
        document.getElementById('erroPosicao').textContent = '';

        // Valida Nome
        if (nome.length < 3) {
            document.getElementById('erroNome').textContent = 'Digite o nome completo do atleta.';
            isValid = false;
        }

        // Valida E-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('erroEmail').textContent = 'Digite um e-mail válido.';
            isValid = false;
        }

        // Valida WhatsApp
        if (whatsapp.length < 14) {
            document.getElementById('erroWhats').textContent = 'Digite um número de WhatsApp válido com DDD.';
            isValid = false;
        }

        // Valida Posição
        if (!posicao) {
            document.getElementById('erroPosicao').textContent = 'Selecione uma posição em quadra.';
            isValid = false;
        }

        if (isValid) {
            const novoAtleta = {
                nome,
                email,
                whatsapp,
                posicao,
                categoria: 'Sub-17 Masculino',
                time: 'GMC',
                origem,
                dataInscricao: new Date().toLocaleString('pt-BR')
            };

            // Salva no localStorage
            const inscritosSalvos = JSON.parse(localStorage.getItem('inscritos_peneira_gmc')) || [];
            inscritosSalvos.push(novoAtleta);
            localStorage.setItem('inscritos_peneira_gmc', JSON.stringify(inscritosSalvos));

            console.log('Atleta inscrito com sucesso:', novoAtleta);

            // Exibe tela de agradecimento
            form.classList.add('hidden');
            document.querySelector('.lp-form-box h2').classList.add('hidden');
            document.getElementById('userNameSuccess').textContent = nome.split(' ')[0];
            document.getElementById('successBox').classList.remove('hidden');
        }
    });
});