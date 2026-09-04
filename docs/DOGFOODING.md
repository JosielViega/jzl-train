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

Nota:
Uma segunda tentativa foi executada com LM Studio explicitamente configurado
no ambiente do processo e também atingiu o timeout de 300 segundos. Isso reduz
a força da hipótese de que a ausência das variáveis de provider era a causa.

## OBS-008

Tipo: ATRITO

Descrição:
Durante mission-planning não existe feedback de progresso visível no CLI;
o Host permaneceu sem indicação intermediária até o timeout.

Impacto:
Dificulta distinguir processamento lento de travamento.

## OBS-009

Tipo: ACERTO

Descrição:
A segunda falha de planning também ocorreu de forma fail-closed. O novo evento
mission.plan.unavailable foi persistido sem alterar State da Mission ou arquivos
da aplicação.

## OBS-010

Tipo: ATRITO

Descrição:
O modelo qwen3.5-9b mostrou-se inadequado até aqui para mission-planning no
fluxo agentic real, pois duas execuções atingiram o limite de 300 segundos.

Observação:
Ainda não é possível afirmar se a demora ocorre por raciocínio, tool-use,
quantidade de turns ou outra interação interna do OpenClaude.

Ação:
Testar um modelo menor somente para a responsabilidade mission-planning,
usando o Model Router existente.

Nota posterior:
O modelo qwen3-4b-instruct-2507 também atingiu o mesmo timeout de 300 segundos.
Portanto, a evidência deixou de apontar para um problema específico do
qwen3.5-9b.

## OBS-011

Tipo: BUG

Descrição:
Mission planning atingiu o mesmo timeout com dois modelos diferentes:
qwen3.5-9b e qwen3-4b-instruct-2507.

As duas rotas utilizaram LM Studio explicitamente configurado no processo.

Impacto:
Planning continua bloqueado para uso real.

Observação:
A infraestrutura básica LM Studio → OpenClaude funciona em consulta mínima.
A evidência atual aponta para o caminho agentic/integrado de planning,
sem ainda provar qual mecanismo interno provoca o bloqueio.

Ação:
Corrigir uma diferença concreta encontrada na integração:
o JZL autoriza ferramentas via canUseTool, mas não restringe o conjunto de
ferramentas apresentado ao modelo através de disallowedTools do SDK.

Nota posterior:
Após a correção do JZL OpenClaude que passou disallowedTools ao SDK,
mission-planning foi executado novamente com qwen3-4b-instruct-2507 e também
atingiu o timeout de 300 segundos.

A correção de visibilidade continua válida, mas não resolveu o bloqueio.

## OBS-012

Tipo: ACERTO

Descrição:
A correção de visibilidade de ferramentas foi aplicada sem ampliar permissões,
mas o reteste demonstrou que ela não era suficiente para resolver o timeout.

Resultado:
O dogfooding evitou considerar uma hipótese como causa definitiva sem reteste
real.

## OBS-013

Tipo: BUG

Descrição:
Mission planning continua sem concluir mesmo após:

- dois modelos diferentes;
- LM Studio validado;
- OpenClaude mínimo validado;
- provider explícito;
- redução do tool pool apresentado ao modelo.

Impacto:
Planning permanece bloqueado.

Ação:
Executar diagnóstico curto do SDK com o mesmo prompt e as mesmas QueryOptions
de produção, registrando somente tipos de mensagens, ferramentas solicitadas e
decisões de canUseTool.

## OBS-014

Tipo: BUG

Descrição:
O diagnóstico direto com o mesmo prompt, modelo, canUseTool e disallowedTools
de produção comprovou que o SDK OpenClaude concluiu mission-planning com
result/success em aproximadamente 43,9 segundos.

Após o resultado, execution.close() foi chamado, porém o processo Node permaneceu
ativo até ser encerrado externamente aos 75 segundos.

Causa identificada no JZL:
o worker é single-shot, mas o Execution Adapter espera o processo filho emitir
close antes de consumir a resposta. Como o processo permanece vivo após o
resultado do SDK, o watchdog de aproximadamente 305 segundos encerra o worker
e transforma uma execução já concluída em timeout.

Impacto:
mission-planning retorna falsamente
"tempo limite da sessão mission-planning excedido".

Ação:
corrigir somente o ciclo de vida do worker para que, depois de o resultado ou
erro final ser serializado e o stdout/stderr ser descarregado, o processo
single-shot seja encerrado explicitamente.

Nota posterior:
Após a correção do lifecycle no commit
ada96e922f8b8d200ad4a6b32a555751e099ee84,
o mesmo mission-planning concluiu normalmente em aproximadamente 61 segundos,
com exit code 0 e mission.plan.finished.

Isso confirma que o falso timeout era causado pelo lifecycle do worker
single-shot.

## OBS-015

Tipo: ATRITO

Descrição:
Durante o diagnóstico o SDK emitiu:

agent_load_failure:
"injectAgents: item at index 1 - agent references unknown tool 'Edit'"

A Query continuou normalmente e retornou result/success.

Observação:
O comportamento surgiu após a restrição de visibilidade por disallowedTools.
Não é bloqueante para mission-planning neste momento e não será corrigido
junto com o problema de lifecycle.

## OBS-016

Tipo: ACERTO

Descrição:
A primeira Mission real finalmente concluiu mission-planning através do fluxo
completo:

JZL
→ worker
→ OpenClaude
→ LM Studio
→ qwen3-4b-instruct-2507
→ resultado estruturado
→ mission.plan.finished

Duração:
aproximadamente 61 segundos.

Resultado:
A Mission permaneceu pending, o plano permaneceu sem aprovação e nenhum arquivo
da aplicação foi criado.

Isso confirma a separação entre planejamento consultivo e autoridade de
execução.

## OBS-017

Tipo: ACERTO

Descrição:
O dogfooding identificou e comprovou um bug real de lifecycle, a correção foi
aplicada no JZL OpenClaude e o reteste real confirmou a resolução.

Observação:
A correção anterior de disallowedTools permaneceu ativa. O agent_load_failure
já registrado continua fora do escopo porque não impediu o planejamento.

## OBS-018

Tipo: ACERTO

Descrição:
A primeira Mission real do JZL Train completou o ciclo completo controlado pelo
JZL:

planning
→ aprovação explícita do plano
→ execution
→ review independente
→ validation determinística
→ completed

Resultado:

- review: PASS
- findings: []
- validation: PASS
- 13 validators PASS
- Mission final: completed

A validação determinística levou aproximadamente 0,16 segundos e não iniciou
sessão de modelo.

Observação:
Isso confirma na prática a separação entre geração probabilística e autoridade
determinística do JZL.

## OBS-019

Tipo: ATRITO

Descrição:
A execução da mission-0001 com qwen3.5-9b levou aproximadamente 553,8 segundos,
próximo do timeout configurado de 600 segundos para mission-execution.

Impacto:
Nenhuma falha ocorreu nesta Mission, mas há pouca margem operacional.

Ação:
Não alterar modelo nem timeout com apenas uma amostra.
Observar o comportamento nas próximas Missions reais.
Se o padrão se repetir, reavaliar a adequação do modelo para mission-execution.
