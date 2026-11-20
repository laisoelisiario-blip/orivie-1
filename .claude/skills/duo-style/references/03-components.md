# 03 — Componentes

Use os tokens de `02-tokens.md`; CSS base em `../assets/tokens.css`. Todo componente interativo tem:
**default, hover (desktop), pressed (afunda), focus-visible, disabled** e, quando couber,
**selected, correct, incorrect**.

## 1. Botões
```
┌──────────────────────────────┐  raio 12px, borda 2px (transparente nos coloridos)
│          CONTINUAR           │  700, 15–16px, CAIXA ALTA, letter-spacing .64px
└──────────────────────────────┘
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  lábio: box-shadow 0 4px 0 <shadow>
```
| Variante | Fundo | Texto | Borda / lábio | Uso |
|---|---|---|---|---|
| `primary` | `--duo-green` | `#FFF` | `0 4px 0 --duo-green-shadow` | CONTINUAR, VERIFICAR, COMEÇAR |
| `secondary` | `--duo-blue` | `#FFF` | `0 4px 0 --duo-blue-shadow` | Ações alternativas fortes |
| `danger` | `--duo-red` | `#FFF` | `0 4px 0 --duo-red-shadow` | Após erro ("ENTENDI"), sair |
| `gold` / `premium` | `--duo-yellow` / gradiente premium | `#FFF` | shadow correspondente | Recompensas, upgrade |
| `outline` | `#FFF` | `--duo-blue` | borda 2px `#E5E5E5` + `0 2px 0 #E8E8E8` | "JÁ TENHO CONTA", PULAR, VER MAIS |
| `ghost` | transparente | `--duo-blue` (700) | nenhum | "AGORA NÃO" |
| `disabled` | `--duo-border` | `--duo-gray-400` | sem lábio, não afunda | VERIFICAR sem resposta |

- Pressed: `translateY(4px)` + `box-shadow: none` (outline: fundo `#E6E6E6`, borda `#CECECE`). Transição 50–100ms.
- Hover desktop: `filter: brightness(1.05)`.
- Telas de tarefa: botão principal **fixo no rodapé**, largura total no mobile, à direita no desktop.
- Botão circular de ícone (áudio, câmera): 48–64px, raio full, mesmo lábio.

## 2. Opções de resposta / tiles selecionáveis
```css
.duo-tile { background:#fff; border:2px solid var(--duo-border); border-bottom-width:4px;
  border-radius:16px; padding:12px 16px; color:var(--duo-text); font-weight:700; }
.duo-tile:active    { transform:translateY(2px); border-bottom-width:2px; }
.duo-tile.selected  { background:var(--duo-blue-light); border-color:var(--duo-blue-border); color:var(--duo-blue-text); }
.duo-tile.correct   { background:var(--duo-green-light); border-color:var(--duo-green); color:var(--duo-green-shadow); }
.duo-tile.incorrect { background:var(--duo-red-light); border-color:var(--duo-red); color:var(--duo-red-shadow); }
```
- Lista vertical (gap 8–12px), grade 2×2 com ilustração (~100px) acima do rótulo, ou chips em linha.
- Desktop: atalho numérico à esquerda (quadrado 30px com borda 2px e número).

## 3. Cards
- Borda 2px `--duo-border`, raio 16px, padding 16–24px, **sem sombra difusa**.
- Título h3 + texto muted + link de ação no canto ("VER TUDO", azul, 15px/700, caixa alta).
- Card destaque: fundo na cor (verde, roxo…), texto branco, ilustração "vazando" da borda.
- Callout informativo: fundo `--duo-blue-light`, raio 12px, padding 28px [V].

## 4. Tags e chips
- Tag [V]: fundo `#DDF4FF`, texto `#009BE4`, 12px/700, CAIXA ALTA, letter-spacing .48px, altura 28px,
  padding 0 10px, raio 8px.
- Tile de palavra (montar frase): fundo branco, borda 2px, `border-bottom-width: 4px`, raio 12px;
  ao ser usado deixa um "fantasma" cinza `--duo-border` do mesmo tamanho.

## 5. Barra de progresso
```css
.duo-progress { height:16px; background:var(--duo-border); border-radius:9999px; overflow:hidden; }
.duo-progress > .fill { height:100%; background:var(--duo-green); border-radius:9999px; position:relative;
  transition:width .4s cubic-bezier(.34,1.56,.64,1); }
.duo-progress > .fill::after { content:""; position:absolute; left:8px; right:8px; top:4px; height:4px;
  background:rgba(255,255,255,.3); border-radius:9999px; } /* brilho característico */
```
- Na lição: ✕ cinza à esquerda + barra + contador de vidas (❤ vermelho + número) à direita.
- Combo de acertos: barra muda para laranja/brilho + label "5 SEGUIDAS!".
- Missão diária: barra amarela 16–20px, texto "3 / 5" centralizado e baú/recompensa na ponta.

## 6. Trilha de progresso (home) — componente assinatura
- **Nós circulares (~70px)** empilhados em **zigue-zague** (deslocamentos horizontais em onda:
  0, +45, +70, +45, 0, −45, −70, −45px).
- Estados:
  - `concluído`: cor da unidade (ou dourado quando "dominado"), ícone branco, lábio 6–8px.
  - `atual`: cor da unidade + **anel de progresso** + balão "COMEÇAR" saltitante acima.
  - `bloqueado`: `--duo-border`, ícone `--duo-gray-400`, lábio `--duo-gray-300`.
  - `especial`: baú (recompensa), troféu (fim de unidade), história/revisão, personagem ao lado.
- Tocar num nó abre **popover** com o tema da lição e botão de começar.
- **Cabeçalho de unidade**: banner na cor da unidade, raio 16px, lábio 4px, "SEÇÃO 1, UNIDADE 2"
  (tag clara) + título descritivo h2 branco (ex.: "Pedir direções", nunca "Cidade 3") + botão "GUIA".
  Fica **sticky** no topo.
- Cada unidade usa uma cor diferente da paleta; personagens animados ocupam o espaço vazio do zigue-zague.
- Botão flutuante (seta) no canto inferior direito para voltar à posição atual quando o usuário rola para longe.

## 7. Header de status
Ícone + número colorido, 700: `[curso/área]  🔥 12 (laranja)  💎 500  ❤ 5 (vermelho)`.
Zero/inativo em `--duo-gray-400`. Tocar abre popover (card borda 2px, seta) com detalhes.

## 8. Navegação
- **Mobile**: tab bar inferior com 4–5 ícones ilustrados coloridos (32px), sem rótulo; aba ativa com
  fundo `--duo-blue-light`, borda 2px `--duo-blue-border`, raio 12px. Divisor superior 2px.
- **Desktop**: sidebar fixa (~256px) com wordmark no topo; itens ícone 32px + rótulo 15px/700 caixa alta;
  ativo com fundo/borda azul-claros e texto `--duo-blue`.

## 9. Banner de feedback da resposta
Sobe do rodapé ao verificar (slide-up 200ms), largura total:
| Estado | Fundo | Conteúdo | Botão |
|---|---|---|---|
| Correto | `--duo-green-light` | ícone ✓ em círculo branco + "Excelente!" h2 `--duo-green-shadow` | `primary` CONTINUAR |
| Incorreto | `--duo-red-light` | ícone ✕ + "Resposta correta:" + solução `--duo-red-shadow` | `danger` ENTENDI |
Ações pequenas (reportar, explicar) como ícones/links discretos.

## 10. Inputs
Fundo `--duo-surface`, borda 2px `--duo-border`, raio 12px, altura 48–52px, 17px/600.
Foco: borda `--duo-blue-border` e fundo branco. Erro: borda `--duo-red` + texto de ajuda vermelho.

## 11. Modais e bottom sheets
Backdrop `rgba(0,0,0,.5)`; card branco raio 24px; ilustração/mascote grande no topo; h1 central;
texto muted; botões empilhados (primário em cima, ghost embaixo). Entrada: scale .9 → 1 com spring.

## 12. Pílulas, badges e contadores
- Pílula: raio full, padding 4px 12px, 12–13px/700 caixa alta ("NOVO", "PRO", "+10 XP").
- Ponto de notificação: 12px vermelho com borda 2px branca.

## 13. Conquistas
Badge ilustrado (escudo/hexágono arredondado) com cor por nível e número; bloqueado dessaturado
(`grayscale(1); opacity:.5`) + barra de progresso. Recordes pessoais ("mais XP em um dia") também viram badge.
Coleção na tela de perfil "como troféus numa prateleira", com botão de compartilhar.

## 14. Ranking (liga semanal)
Linhas sem borda: posição (1–3 com medalhas), avatar 48px, nome 700, XP muted à direita; linha do usuário
destacada (`--duo-blue-light`). Divisores "ZONA DE PROMOÇÃO" (verde) e "ZONA DE REBAIXAMENTO" (vermelho).
Topo: fileira de emblemas das ligas (atual colorida, demais cinza) + contagem regressiva.

## 15. Calendário de sequência
Grade semanal de círculos 32–40px: dias cumpridos laranja com ícone branco; hoje com anel;
dias perdidos cinza; dias protegidos azul-claro com ícone de gelo/escudo.

## 16. Switch, checkbox, radio
Switch 52×32 raio full, ligado `--duo-blue`/herói, bolinha branca com lábio 2px.
Checkbox 24px raio 8px borda 2px; marcado preenchido com check branco grosso.

## 17. Avatares
Circulares, borda 2px, fundo chapado com ilustração ou iniciais brancas 800. Construtor de avatar no mesmo
estilo geométrico.

## 18. Estados vazios, carregamento e erro
- Vazio: mascote (160–200px) + h2 + texto muted + 1 botão primário.
- Carregando: mascote animado em loop + dica engraçada rotativa; skeleton `--duo-surface` raio 16px.
- Erro de rede: mascote confuso + copy leve ("Ops! A internet tropeçou.") + TENTAR DE NOVO.

## 19. Widget de tela inicial e notificações
- Widget mostra **só o essencial**: sequência atual e se está em risco hoje, com o mascote em **humor
  diferente conforme a hora** (tranquilo de manhã, desesperado perto da meia-noite).
- Versão de tela de bloqueio: ícone da sequência + número.
