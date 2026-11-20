# CLAUDE.md — Regras do projeto

## Estilo visual obrigatório: "Insta Style"

Toda interface deste projeto (app, web, landing page, protótipo, componente, ícone, texto de UI)
**deve** seguir o design system "Insta Style": o estilo minimalista, monocromático e centrado no
conteúdo inspirado no Instagram, com o gradiente vibrante reservado para momentos de marca.

```
.claude/skills/insta-style/SKILL.md          ← comece por aqui (fluxo + índice + regras de ouro)
.claude/skills/insta-style/references/*.md   ← regras detalhadas
.claude/skills/insta-style/assets/tokens.css ← tokens e classes base prontos
.claude/skills/insta-style/templates/*.md    ← perguntas de descoberta e modelo de plano
```

Antes de escrever qualquer linha de UI, carregue a skill `insta-style` (ou leia o `SKILL.md`) e as
referências que a tarefa exige.

## Fluxo obrigatório antes de desenhar ou codar UI

1. **Descoberta** — pergunte ao usuário o que ele pretende construir e qual o foco do app, usando
   `templates/discovery-questions.md`. Não presuma; pergunte só o que ainda não foi respondido.
2. **Plano** — escreva o plano com `templates/design-plan-template.md` e peça aprovação explícita.
3. **Design** — só depois da aprovação, construa as telas seguindo as referências.
4. **QA** — valide com `references/09-qa-checklist.md` antes de entregar.

Pule as etapas 1–2 só quando o usuário pedir explicitamente um ajuste pequeno em uma tela existente.

## Propriedade intelectual

Replicamos o **estilo**, nunca a marca: proibido usar o nome "Instagram", o glifo da câmera, o
logotipo manuscrito, a fonte proprietária Instagram Sans ou ícones/assets copiados. Crie marca,
logo, gradiente e nomes próprios (detalhes em `references/01-principles.md`).

## Contexto do produto

Orivie: app de autoconhecimento, personalidade e estilo de vida. Idioma padrão da interface: português (BR).
