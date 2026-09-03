# JZL OpenClaude Dogfooding — JZL Train

## Regras

Tipos:

- ACERTO
- ATRITO
- BUG
- IDEIA

Política:

- BUG bloqueante ou problema de integridade: parar e reportar.
- ATRITO não bloqueante: registrar e continuar.
- IDEIA: registrar sem implementar automaticamente.
- Não modificar o JZL OpenClaude silenciosamente.

Este arquivo será mantido pelo Host/Codex durante o projeto.

## OBS-001

Tipo: ACERTO

Descrição:
O Codex conseguiu inicializar um projeto traditional-web-v4 pelo JZL
OpenClaude e executar check-standards com PASS.

## OBS-002

Tipo: ATRITO

Descrição:
O ambiente restrito do Codex apresentou "setup refresh had errors"
antes da execução do PowerShell e exigiu execução elevada.

Observação:
O problema ocorreu antes de o JZL OpenClaude ser executado.

## OBS-003

Tipo: ATRITO

Descrição:
A documentação de arquitetura do JZL OpenClaude ainda contém trechos
indicando que componentes não estão implementados, apesar de já existirem.

## OBS-004

Tipo: IDEIA

Descrição:
Adicionar futuramente ao README do JZL OpenClaude um quick start operacional
com init-project e check-standards.

## OBS-005

Tipo: ATRITO

Descrição:
O projeto foi inicializado com tools vazio. O JZL possui configuração CLI
para modelos via set-model, mas não existe atualmente comando CLI equivalente
para configurar o executável PHP após init-project.

Impacto:
Ainda não bloqueia enquanto não existirem arquivos PHP first-party.

Ação:
Somente registrar nesta etapa. Não alterar o JZL OpenClaude.
