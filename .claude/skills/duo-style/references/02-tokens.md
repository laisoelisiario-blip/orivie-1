# 02 — Tokens de design

Legenda de confiabilidade: **[V]** verificado no CSS oficial do blog.duolingo.com (nov/2026);
**[P]** paleta pública conhecida do guia de marca antigo (design.duolingo.com, hoje fora do ar) e da
interface do app. Versão pronta em `../assets/tokens.css`.

## 1. Cores

Cada cor funcional tem 3 tons: **base** (preenchimento), **shadow** (lábio 3D, texto sobre fundo claro)
e **light** (fundo de feedback/selecionado). Nomes de animais são os apelidos oficiais, só para referência.

### Funcionais
| Token | HEX | Ref. | Uso |
|---|---|---|---|
| `--duo-green` | `#58CC02` [V] | Feather Green | Primária, botão principal, correto, títulos de marca |
| `--duo-green-shadow` | `#58A700` [P] | Tree Frog | Lábio verde, texto de sucesso |
| `--duo-green-light` | `#D7FFB8` [P] | — | Fundo do banner "correto" |
| `--duo-green-lime` | `#89E219` [P] | Mask Green | Ilustração, destaques |
| `--duo-blue` | `#1CB0F6` [V] | Macaw | Secundária, selecionado, links (700) |
| `--duo-blue-shadow` | `#1899D6` [P] / `#009CDC` [V] | Whale | Lábio do botão azul |
| `--duo-blue-text` | `#009BE4` [V] | — | Texto azul sobre fundo azul-claro (tags) |
| `--duo-blue-light` | `#DDF4FF` [V] | — | Fundo de opção selecionada, tags, callouts |
| `--duo-blue-border` | `#84D8FF` [V] | — | Borda de item selecionado |
| `--duo-blue-dark` | `#2B70C9` [P] | Humpback | Ilustração |
| `--duo-red` | `#FF4B4B` [P] | Cardinal | Erro, corações |
| `--duo-red-shadow` | `#EA2B2B` [P] | Fire Ant | Lábio vermelho, texto de erro |
| `--duo-red-light` | `#FFDFE0` [P] | — | Fundo do banner "incorreto" |
| `--duo-orange` | `#FF9600` [P] | Fox | Sequência |
| `--duo-orange-shadow` | `#CD7900` [P] | — | Lábio laranja |
| `--duo-yellow` | `#FFC800` [P] | Bee | XP, ouro, conquistas |
| `--duo-yellow-shadow` | `#E5A400` [P] | — | Lábio amarelo |
| `--duo-yellow-light` | `#FFF5D3` [P] | — | Fundo dourado |
| `--duo-purple` | `#CE82FF` [P] | Beetle | Premium |
| `--duo-purple-shadow` | `#A568CC` [P] | — | Lábio roxo |
| `--duo-purple-light` | `#F3E0FF` [P] | — | Fundo premium |

### Neutros
| Token | HEX | Ref. | Uso |
|---|---|---|---|
| `--duo-text` | `#4B4B4B` [V] | Eel | Títulos e texto principal (nunca preto puro) |
| `--duo-text-muted` | `#777777` [V] | Wolf | Texto secundário |
| `--duo-gray-400` | `#AFAFAF` [V] | Hare | Desabilitado, ícones inativos, metadados |
| `--duo-gray-300` | `#CECECE` [V] | — | Borda/lábio de botão claro pressionado |
| `--duo-border` | `#E5E5E5` [V] | Swan | Bordas 2px, trilhos de progresso |
| `--duo-border-lip` | `#E8E8E8` [V] | — | Lábio de botão branco |
| `--duo-pressed-bg` | `#E6E6E6` [V] | — | Fundo de botão branco pressionado |
| `--duo-surface` | `#F7F7F7` [P] | Polar | Fundos alternativos, inputs |
| `--duo-bg` | `#FFFFFF` [V] | Snow | Fundo principal |

### Dark mode [P]
Fundo azul-petróleo profundo, não preto:
`--duo-bg #131F24 · --duo-surface #202F36 · --duo-border #37464F · --duo-text #F1F7FB ·
--duo-text-muted #94A3AD · --duo-gray-400 #52656D`.
Cores funcionais iguais; fundos "light" viram versões translúcidas (`rgba(88,204,2,.15)` etc.) e o
texto de feedback usa a cor base.

### Premium
Visual "iridescente/psicodélico": gradiente multicolor brilhante (roxo, azul, rosa, verde-água)
**apenas** em telas e selos premium. Ex.: `linear-gradient(135deg,#26FF55 0%,#268AFF 45%,#FC55FF 100%)`.

### Escolhendo a cor-herói
O verde é o herói original. Para diferenciar a marca escolha outra cor igualmente saturada (ou mantenha o
verde se fizer sentido) e derive os tons:
- `shadow` = mesma matiz, luminosidade −12 a −18% (HSL).
- `light` = mesma matiz, luminosidade 92–95%.
- O botão primário usa a cor-herói; **"correto" continua verde e "erro" continua vermelho**.
- Texto branco sobre a cor-herói: peso ≥ 700, tamanho ≥ 15px. Texto corrido sempre `--duo-text`.

## 2. Tipografia
Fontes oficiais [V]: **Feather Bold** (títulos de marca, em verde e **minúsculas**) e **Duolingo Sans**
(variável 100–900, para tudo o resto; substituiu a DIN Next Rounded). Ambas proprietárias. Substitutas:

| Papel | Recomendada (Google Fonts) | Alternativas |
|---|---|---|
| Display / títulos de marca | **Fredoka 600–700** | Baloo 2 800, Nunito 900 |
| Interface / corpo | **Nunito 600–800** | Quicksand 700, Varela Round |
| Japonês/CJK | GenSen Rounded [V] / M PLUS Rounded 1c | — |

### Escala
| Token | Tamanho / altura | Peso | Uso |
|---|---|---|---|
| `display` | 32/40 → 40/48 | 700 (Fredoka) | Celebração, números grandes de XP/sequência |
| `h1` | 24/32 → 32/40 | 800 | Título de tela, enunciado da lição |
| `h2` | 20/28 | 800 | Títulos de seção, cabeçalho de unidade |
| `h3` | 17/24 | 700 | Título de card |
| `body` | 17/26 (lição 19/28) | 500–600 | Texto corrido |
| `small` | 15/21 | 700 | Links ("VER TUDO"), metadados destacados |
| `button` | 15–16px, line-height 1, **UPPERCASE**, letter-spacing **0,64px** [V], **700** [V] | | Botões |
| `tag` | 12px, UPPERCASE, letter-spacing 0,48px, 700 [V] | | Tags, labels ("UNIDADE 2") |

Regras: títulos ≥ 700; nada abaixo de 500; cor padrão `--duo-text`; números com `tabular-nums`;
títulos de marca podem ir em minúsculas e na cor-herói (como o blog: `h1` verde, minúsculo, Feather).

## 3. Espaçamento
Base 4px, uso predominante de múltiplos de 8: `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64`.
- Margem lateral mobile 16px (24px ≥ 600px). Gap entre opções 8–12px. Padding de card 16–24px.
- Use **espaço em branco** para agrupar; não coloque container em volta de tudo.

## 4. Raios
| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 8px [V] | Tags, chips, checkbox |
| `--radius-md` | 12px (0,75em) [V] | **Botões**, inputs, tiles de palavra, callouts |
| `--radius-lg` | 16px | Cards, opções, banners de unidade |
| `--radius-xl` | 24px [V] | Modais, bottom sheets, cards grandes |
| `--radius-full` | 9999px | Barras de progresso, avatares, nós da trilha, pílulas |

## 5. Bordas e o "lábio" 3D
- Borda padrão: `2px solid var(--duo-border)` [V].
- Botão colorido: `border: 2px solid transparent; box-shadow: 0 4px 0 <shadow>` [V].
- Botão branco/outline: `border: 2px solid #E5E5E5; box-shadow: 0 2px 0 #E8E8E8` [V]
  (no app as opções usam `border-bottom-width: 4px`).
- Pressed: `transform: translateY(4px); box-shadow: none` [V]; botão branco ganha fundo `#E6E6E6`
  e borda `#CECECE` [V].
- Nós grandes da trilha: lábio de 6–8px.
- **Proibido blur** em sombras, exceto backdrop de modal (`rgba(0,0,0,.5)`).

## 6. Tamanhos-chave
| Elemento | Tamanho |
|---|---|
| Botão | altura 48–52px; padding vertical 15px [V], horizontal 24–48px [V] |
| Ícones de UI | 24px; navegação 32px; header de status 24–28px |
| Alvo de toque | ≥ 48×48px |
| Nó da trilha | ~70px de diâmetro |
| Barra de progresso | 16px de altura |
| Coluna de lição | máx. 600px centralizada |

## 7. Breakpoints
`sm 480 · md 700 · lg 1024 · xl 1160`. Desktop: sidebar ~256px + conteúdo ~600px + coluna direita ~370px.
