document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todas as links de navegação e seções
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');

    // Definir Treino como seção inicial padrão
    setActiveSection('treino');
});

function setActiveSection(sectionId) {
    // Remover classe 'active' de todas as seções
    sections.forEach(function(section) {
        section.classList.remove('active');
    });

    // Adicionar classe 'active' à seção selecionada
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Atualizar estado das links de navegação
    navLinks.forEach(function(link) {
        link.classList.remove('active');

        // Se a href da link corresponder ao sectionId, marcar como ativa
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });

    // Fechar modal se estiver aberto
    closeModal();
}
