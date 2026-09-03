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

Nota: "setup refresh had errors" ocorreu novamente nesta etapa.

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

## OBS-006

Tipo: ACERTO

Descrição:
Na primeira falha real de mission-planning, o JZL registrou
mission.plan.unavailable, manteve a Mission pending e não permitiu alteração
dos arquivos da aplicação.

Impacto:
O workflow falhou fechado sem corromper State ou aplicação.

## OBS-007

Tipo: BUG

Descrição:
A primeira execução real de mission-planning não concluiu dentro do limite
de 300 segundos e terminou com:
"tempo limite da sessão mission-planning excedido".

Impacto:
Bloqueante para o fluxo atual porque não existe plan.finished para aprovação.

Observação:
A causa ainda não foi atribuída ao JZL, OpenClaude, LM Studio ou modelo.

## OBS-008

Tipo: ATRITO

Descrição:
Durante mission-planning não existe feedback de progresso visível no CLI;
o Host permaneceu sem indicação intermediária até o timeout.

Impacto:
Dificulta distinguir processamento lento de travamento.
