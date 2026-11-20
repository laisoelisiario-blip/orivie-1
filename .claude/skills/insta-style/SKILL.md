---
name: insta-style
description: Design system "Insta Style" — estilo visual inspirado no Instagram (UI monocromática que some para o conteúdo brilhar, mídia de ponta a ponta, ícones de traço que viram preenchidos quando ativos, tipografia de sistema, azul de ação único, gradiente vibrante só em momentos de marca, stories, feed, reels e perfil em grade). Use SEMPRE que for criar ou alterar qualquer interface, tela, componente, landing page, ícone, animação ou texto de UI neste projeto, para qualquer tipo de app. Antes de desenhar, conduz uma descoberta com o usuário e um plano aprovado.
---

# Insta Style — design system centrado no conteúdo

Você vai replicar a **linguagem visual e de interação** do Instagram em um produto de qualquer tema
(autoconhecimento, fitness, finanças, educação, comunidade…). O usuário deve sentir:
*"é limpo, familiar, rápido, e o que importa é o conteúdo (o meu e o dos outros)"*.

> Estilo, não marca. Nunca use nome, glifo de câmera, logotipo, Instagram Sans ou assets do
> Instagram. Veja `references/01-principles.md#propriedade-intelectual`.

## Fluxo obrigatório (não pule)

### Etapa 1 — Descoberta
Antes de qualquer design, pergunte ao usuário usando `templates/discovery-questions.md`
(use a ferramenta `AskUserQuestion` se existir; no máximo 4–8 perguntas por rodada, com opções sugeridas).
Essenciais:
1. O que é o app e qual o **foco** (o verbo central: compartilhar, registrar, descobrir, aprender…)?
2. Qual é o **"post"** do app, ou seja, a unidade de conteúdo que aparece no feed?
   (ex.: no Orivie pode ser uma reflexão, um resultado de teste, um hábito, uma foto do dia)
3. É **social** (seguir, curtir, comentar, DM) ou **pessoal** (diário, uso solo)? Ou misto?
4. Quais formatos: feed, stories (efêmero), reels (vídeo vertical), perfil em grade, explorar, DMs?
5. Público, plataforma (iOS, Android, web, PWA) e stack técnica.
6. Marca existente (nome, logo, cor) ou devo propor um gradiente/cor de marca?
7. Telas prioritárias para a primeira entrega.

### Etapa 2 — Plano
Preencha `templates/design-plan-template.md`: mapeamento de formatos Instagram → domínio do app,
arquitetura de navegação (5 abas), lista de telas e componentes, gradiente de marca e cor de ação,
tom de voz com exemplos. Mostre e **peça aprovação explícita** antes de construir.

### Etapa 3 — Design / implementação
Siga as referências. Copie `assets/tokens.css` para o projeto e ajuste o gradiente/marca.
Implemente light **e** dark mode desde o início (é parte do estilo).
Estados obrigatórios: default, pressed, ativo (ícone preenchido), disabled, loading (skeleton), vazio, erro.

### Etapa 4 — QA
Rode `references/09-qa-checklist.md` e corrija antes de entregar.

## Índice de referências

| Arquivo | Quando ler |
|---|---|
| `references/01-principles.md` | Sempre: filosofia, antipadrões e propriedade intelectual. |
| `references/02-tokens.md` | Cor, gradiente, tipografia, espaçamento, raio, ícones, dark mode. |
| `references/03-components.md` | Qualquer componente (botões, avatar com anel, post, tab bar, sheets…). |
| `references/04-screens-patterns.md` | Montagem de telas: feed, stories, reels, explorar, perfil, DM, criar, notificações. |
| `references/05-iconography-imagery.md` | Ícones, mídia, proporções, fotos, logo próprio. |
| `references/06-motion-interaction.md` | Gestos, animações (double tap, stories), haptics, transições. |
| `references/07-voice-tone.md` | Qualquer texto de interface. |
| `references/08-responsive-web.md` | Versão web/desktop e responsividade. |
| `references/09-qa-checklist.md` | Antes de entregar. |
| `assets/tokens.css` | Tokens CSS (light/dark) + classes base. |

## As 12 regras de ouro

1. **O conteúdo é a cor.** A UI é preto, branco e cinzas; a cor vem das fotos/vídeos do usuário.
2. **Uma única cor de ação**: azul `#0095F6` para botões primários e links de ação.
3. **Gradiente só em momentos de marca**: anel de stories não vistos, logo, criação, ao vivo, telas
   de boas-vindas. Nunca em botões comuns, fundos de tela ou texto corrido.
4. **Mídia de ponta a ponta** no mobile (sem margens, sem cantos arredondados no feed).
5. **Tipografia de sistema** (SF Pro / Roboto / system-ui), tamanho base 14px, hierarquia por peso
   (400 / 600 / 700), não por cor.
6. **Ícones de traço (~2px) que viram preenchidos quando ativos** ou selecionados.
7. **Separadores de 1px** (`#DBDBDB` / `#262626` no escuro) ou apenas espaço em branco; nada de sombras.
8. **Navegação em 5 abas** na base, ícones sem rótulo, a aba de perfil é o avatar do usuário.
9. **Avatares sempre circulares**, com anel de gradiente quando há conteúdo novo.
10. **Gestos antes de botões**: double tap para curtir, swipe entre stories, segurar para pausar.
11. **Densidade alta, mas respirável**: textos curtos, metadados em cinza, nomes de usuário em negrito.
12. **Dark mode de primeira classe**: preto puro `#000` no fundo, sem reinterpretar a hierarquia.
