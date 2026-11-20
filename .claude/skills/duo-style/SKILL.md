---
name: duo-style
description: Design system "Duo Style" — estilo visual lúdico e gamificado inspirado no Duolingo (cores chapadas e vivas, botões 3D com "lábio" que afundam ao toque, bordas cinza de 2px, cantos arredondados, tipografia gordinha em caixa alta nos botões, mascote e elenco de personagens geométricos, trilha de progresso em zigue-zague, sequência diária, XP, ligas e celebrações animadas). Use quando o usuário escolher o estilo Duolingo/gamificado/lúdico para criar ou alterar qualquer interface, tela, componente, landing page, ilustração, animação ou texto de UI, para qualquer tipo de app. Antes de desenhar, conduz uma descoberta com o usuário e um plano aprovado.
---

# Duo Style — design system lúdico e gamificado

Você vai replicar a **linguagem visual, de interação e de motivação** do Duolingo em um produto de
qualquer tema (autoconhecimento, saúde, finanças, hábitos, educação…). O usuário deve sentir:
*"parece um jogo, é amigável, não tenho medo de errar e quero voltar amanhã"*.

> Estilo, não marca. Nunca use nome, coruja, personagens, logotipo, fontes Feather / Duolingo Sans
> ou assets do Duolingo. Veja `references/01-principles.md#propriedade-intelectual`.

## Fluxo obrigatório (não pule)

### Etapa 1 — Descoberta
Antes de qualquer design, pergunte ao usuário usando `templates/discovery-questions.md`
(use `AskUserQuestion` se existir; 4–8 perguntas por rodada, com opções sugeridas). Essenciais:
1. O que é o app e qual o **foco** (o verbo central: aprender, treinar, refletir, economizar…)?
2. Qual é a **"lição"**: a unidade repetível de 2–5 minutos que o usuário completa todo dia?
3. Quanta **gamificação**: leve, média ou completa (sequência, XP, ligas, vidas, moedas, missões, conquistas)?
4. Quem é o público e em que momento do dia ele usa o app?
5. Plataforma(s) e stack técnica.
6. Marca existente (nome, cor, mascote) ou devo propor? Quanto humor o mascote pode ter?
7. Telas prioritárias para a primeira entrega.

### Etapa 2 — Plano
Preencha `templates/design-plan-template.md`:
- Tradução do loop do Duolingo para o domínio (`references/06-gamification.md`).
- Cor-herói e paleta (`references/02-tokens.md#escolhendo-a-cor-heroi`).
- Conceito do mascote e do elenco (`references/04-illustration-characters.md`).
- Mapa de telas e componentes (`references/08-screens-layouts.md`, `references/03-components.md`).
- Tom de voz com 5 exemplos de microcopy (`references/07-voice-tone.md`).
Mostre o plano e **peça aprovação explícita** antes de construir.

### Etapa 3 — Design / implementação
Siga as referências. Copie `assets/tokens.css` para o projeto e ajuste a cor-herói. Estados obrigatórios:
default, hover, pressed (afunda), selected, disabled, correto, incorreto, vazio, carregando.

### Etapa 4 — QA
Rode `references/09-qa-checklist.md` e corrija antes de entregar.

## Índice de referências

| Arquivo | Quando ler |
|---|---|
| `references/01-principles.md` | Sempre: filosofia, o que as fontes oficiais dizem, antipadrões, PI. |
| `references/02-tokens.md` | Cor, tipografia, espaçamento, raio, borda, lábio 3D, dark mode. |
| `references/03-components.md` | Qualquer componente (botões, opções, barras, trilha, header, feedback…). |
| `references/04-illustration-characters.md` | Ilustração, mascote, elenco, ícones, estados vazios. |
| `references/05-motion-sound.md` | Animação, celebração, som, haptics, Rive/Lottie. |
| `references/06-gamification.md` | Planejamento do produto e qualquer elemento de progresso/recompensa. |
| `references/07-voice-tone.md` | Qualquer texto visível ao usuário, notificações. |
| `references/08-screens-layouts.md` | Montagem de telas, navegação, responsivo. |
| `references/09-qa-checklist.md` | Antes de entregar. |
| `references/sources.md` | De onde vem cada informação e o que foi verificado. |
| `assets/tokens.css` | Tokens CSS (light/dark) + classes base prontas. |

## As 12 regras de ouro

1. **Fundo branco, cor com significado**: verde = avançar/correto, azul = selecionado/link,
   vermelho = erro/vidas, laranja = sequência, amarelo = XP/conquista, roxo = premium.
2. **Profundidade por "lábio" sólido**, nunca sombra difusa: `box-shadow: 0 4px 0 <tom escuro>`.
3. **Pressionar afunda**: `transform: translateY(4px); box-shadow: none`.
4. **Bordas de 2px `#E5E5E5`** em cards, opções e botões claros.
5. **Cantos arredondados**: 12px (botões), 16px (cards), círculo (nós da trilha, avatares).
6. **Tipografia arredondada e pesada**; botões em CAIXA ALTA, 700, `letter-spacing` ~0,64–0,8px.
7. **Uma ação primária por tela**, botão largo fixo no rodapé nas telas de tarefa.
8. **Feedback imediato e emocional** em cada resposta (cor + som + haptic + personagem).
9. **Progresso sempre visível**: barra no topo da lição, trilha na home, contadores no header.
10. **Personagens geométricos e expressivos** reagem ao usuário; ilustração minimalista e engraçada.
11. **Texto curto, caloroso e brincalhão**, nunca culpabilizante; humor leve e opcional.
12. **Celebre muito as vitórias, alivie os erros**, e facilite manter o hábito (barreira mínima).
