document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item-active');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    // Garante que os elementos essenciais existem antes de executar o código
    if (items.length === 0 || !prevButton || !nextButton) {
        console.error("Elementos do carrossel não foram encontrados.");
        return;
    }

    let active = 0;
    let isAnimating = false; // Flag para prevenir cliques durante a animação

    // Função para atualizar o carrossel
    function updateCarousel(newIndex, direction) {
        if (isAnimating) return; // Impede a animação se uma já estiver em andamento
        isAnimating = true;

        const currentItem = items[active];
        const newItem = items[newIndex];
        
        // Define a animação de saída para o item atual
        if (direction === 'next') {
            currentItem.classList.add('exit-left');
        } else {
            currentItem.classList.add('exit-right');
        }

        // Posiciona o novo item para entrar corretamente
        if (direction === 'next') {
            // Entra pela direita (que já é o padrão no CSS)
            newItem.classList.remove('exit-left', 'exit-right');
        } else {
            // Para entrar pela esquerda, removemos a posição padrão e o colocamos na esquerda
            newItem.style.transform = 'translateX(-100%)';
        }
        
        // Ativa o novo item, iniciando a animação de entrada
        newItem.classList.add('active');
        
        // Limpa o estilo inline após a animação começar
        setTimeout(() => {
            newItem.style.transform = '';
        }, 50);

        // Quando a animação do item que saiu terminar, fazemos a limpeza
        currentItem.addEventListener('transitionend', () => {
            currentItem.classList.remove('active', 'exit-left', 'exit-right');
            isAnimating = false; // Permite a próxima animaçãos
        }, { once: true }); // O evento é chamado apenas uma vez para evitar bugs

        // Atualiza o índice do item ativo
        active = newIndex;
    }

    // Evento de clique para o botão "próximo"
    nextButton.onclick = () => {
        // Calcula o índice do próximo item, voltando ao início se necessário
        const newIndex = (active + 1) % items.length;
        updateCarousel(newIndex, 'next');
    };

    // Evento de clique para o botão "anterior"
    prevButton.onclick = () => {
        // Calcula o índice do item anterior, indo para o final se necessário
        const newIndex = (active - 1 + items.length) % items.length;
        updateCarousel(newIndex, 'prev');
    };
});