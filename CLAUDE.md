# CLAUDE.md — Regras do projeto

## Biblioteca de estilos visuais

Toda interface deste projeto (app, web, landing page, protótipo, componente, ícone, ilustração, texto de
UI) deve seguir **um** dos design systems abaixo. Cada um é uma skill com fluxo, regras, tokens e
templates próprios:

| Estilo | Skill | Quando combina | Entrada |
|---|---|---|---|
| **Duo Style** — lúdico e gamificado (inspirado no Duolingo) | `duo-style` | Hábito diário, aprendizado, progresso, recompensas, mascote | `.claude/skills/duo-style/SKILL.md` |
| **Insta Style** — minimalista e centrado no conteúdo (inspirado no Instagram) | `insta-style` | Conteúdo visual, perfil, feed, comunidade, compartilhamento | `.claude/skills/insta-style/SKILL.md` |

Antes de escrever qualquer linha de UI, carregue a skill do estilo escolhido (ou leia o `SKILL.md`
dele) e as referências que a tarefa exige. **Não misture estilos** na mesma interface, a não ser que o
usuário peça e o plano descreva como.

## Fluxo obrigatório antes de desenhar ou codar UI

0. **Estilo** — se o usuário ainda não escolheu, pergunte qual estilo usar (mostre a tabela acima com
   uma recomendação baseada no que ele quer construir). Se já houver um estilo aprovado no projeto,
   use-o sem perguntar de novo.
1. **Descoberta** — pergunte o que ele pretende construir e qual o foco do app, usando
   `templates/discovery-questions.md` da skill escolhida. Pergunte só o que ainda não foi respondido.
2. **Plano** — escreva o plano com `templates/design-plan-template.md` da skill e peça aprovação explícita.
3. **Design** — só depois da aprovação, construa seguindo as referências da skill.
4. **QA** — valide com `references/09-qa-checklist.md` da skill antes de entregar.

Pule as etapas 0–2 só quando o usuário pedir explicitamente um ajuste pequeno em uma tela existente.

## Propriedade intelectual

Replicamos **estilos**, nunca marcas. É proibido usar nomes, logotipos, mascotes/personagens, fontes
proprietárias, ícones, sons ou assets do Duolingo ou do Instagram. Também não combine "Insta" ou "gram"
com a marca do produto. Crie marca, mascote, gradiente e nomes próprios (detalhes em
`references/01-principles.md` de cada skill).

## Contexto do produto

Orivie: app de autoconhecimento, personalidade e estilo de vida. Idioma padrão da interface: português (BR).
