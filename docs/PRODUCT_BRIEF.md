# JZL Train — Product Brief v0.1

Este é um documento do Host, não um substituto do State/Mission Engine.

## Visão

Aplicação pessoal de acompanhamento de treino de musculação, inicialmente web,
com foco em registrar rapidamente séries, cargas e repetições e acompanhar
progressão ao longo do tempo.

O JZL Train será o primeiro projeto real desenvolvido através do JZL OpenClaude.

## Usuário inicial

Uso pessoal do proprietário do projeto.

A arquitetura pode permitir evolução futura para múltiplos usuários, mas o MVP
não deve ser complicadamente projetado em torno de escala ainda inexistente.

## Stack

Traditional Web:

- PHP
- MySQL
- JavaScript
- HTML
- CSS

Sem frameworks adicionais salvo necessidade explicitamente aprovada.

## Interface

Visual:

- escuro;
- compacto;
- funcional;
- alta densidade de informação;
- azul, branco e preto;
- foco em registro rápido durante o treino;
- navegação simples por abas/seções.

## Objetivo do MVP

Permitir:

1. cadastrar exercícios;
2. montar fichas/treinos;
3. iniciar uma sessão de treino;
4. registrar séries;
5. registrar carga e repetições;
6. consultar o treino anterior;
7. definir e visualizar uma meta simples para o próximo treino;
8. concluir a sessão;
9. consultar histórico básico;
10. visualizar progressão básica.

## Progressão inicial

A progressão deve ser baseada no registro anterior do exercício.

O detalhe da fórmula não deve ser inventado nesta etapa.

Será definido antes da Mission que implementar progressão.

## Fora do MVP inicial

Não implementar agora:

- dieta;
- diário alimentar;
- integração com wearables;
- rede social;
- pagamentos;
- marketplace;
- recursos complexos de IA;
- múltiplos apps integrados;
- analytics avançado;
- gamificação sofisticada.

## Persistência

MySQL será a persistência principal quando a camada de dados for iniciada.

Offline/sincronização não deve ser implementado nesta primeira fatia do produto.
Pode ser estudado depois que o fluxo principal online estiver funcional.

## Princípio de desenvolvimento

Construir verticalmente em pequenas Missions verificáveis.

Não tentar desenhar o aplicativo inteiro antecipadamente.

O JZL OpenClaude controla workflow, standards e validações.

O Codex atua como Host/operador.

OpenClaude executa as Missions.
