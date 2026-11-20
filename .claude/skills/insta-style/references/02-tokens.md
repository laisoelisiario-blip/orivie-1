# 02 — Tokens de design

Valores baseados na interface pública do Instagram (app e web). Versão pronta em `../assets/tokens.css`.

> **Atenção:** este documento foi escrito sem acesso à página oficial de marca da Meta (rede bloqueada
> no ambiente de criação). Valores de UI são os observados no produto; os pontos do gradiente oficial
> devem ser conferidos em `meta.com/brand/resources/instagram/instagram-brand/` quando possível.

## 1. Cores

### Neutros (a base de 90% da interface)

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--ig-bg` | `#FFFFFF` | `#000000` | Fundo principal |
| `--ig-bg-elevated` | `#FFFFFF` | `#262626` | Sheets, modais, menus |
| `--ig-bg-secondary` | `#FAFAFA` | `#121212` | Fundo de áreas secundárias (web) |
| `--ig-bg-tertiary` | `#EFEFEF` | `#363636` | Botão secundário, campo de busca, bolha de DM recebida |
| `--ig-bg-hover` | `#DBDBDB` | `#3C3C3C` | Hover/pressed do botão secundário |
| `--ig-text` | `#000000` | `#F5F5F5` | Texto principal, ícones |
| `--ig-text-secondary` | `#737373` | `#A8A8A8` | Metadados, legendas, timestamps, placeholders |
| `--ig-text-tertiary` | `#C7C7C7` | `#737373` | Desabilitado |
| `--ig-separator` | `#DBDBDB` | `#262626` | Divisores 1px, bordas de input |
| `--ig-separator-strong` | `#C7C7C7` | `#363636` | Bordas de cards/inputs em foco neutro |
| `--ig-overlay` | `rgba(0,0,0,.65)` | `rgba(0,0,0,.65)` | Fundo atrás de modais |

> Versões antigas usavam `#262626` como texto principal e `#8E8E8E` como secundário. Se quiser um
> visual levemente mais suave, use essas no light mode.

### Cores funcionais

| Token | HEX | Uso |
|---|---|---|
| `--ig-blue` | `#0095F6` | Botão primário, "Seguir", links de ação, selo de verificado |
| `--ig-blue-hover` | `#1877F2` | Hover/pressed do primário |
| `--ig-blue-disabled` | `#B2DFFC` (light) / `rgba(0,149,246,.3)` (dark) | Primário desabilitado |
| `--ig-link` | `#00376B` (light) / `#E0F1FF` (dark) | Links em texto (URL na bio, hashtags no web) |
| `--ig-red` | `#FF3040` | Coração de curtida, badges de notificação |
| `--ig-error` | `#ED4956` | Erros de formulário, ações destrutivas ("Excluir", "Deixar de seguir") |
| `--ig-green` | `#58C322` | Sucesso |
| `--ig-close-friends` | `#1CD14F` | Anel/selo de amigos próximos |
| `--ig-live` | gradiente rosa → vermelho | Selo "AO VIVO" |

### O gradiente
Gradiente clássico de referência (mais citado; a versão 2022 é mais luminosa e com transições mais suaves):

```css
/* referência — NÃO usar como logo do produto */
--ig-gradient-ref: linear-gradient(45deg,
  #FEDA75 0%,   /* amarelo   */
  #FA7E1E 25%,  /* laranja   */
  #D62976 50%,  /* magenta   */
  #962FBF 75%,  /* roxo      */
  #4F5BD5 100%  /* azul      */);
```

Para o anel de stories o app usa um gradiente quente → rosa → roxo, partindo do canto inferior esquerdo:
```css
--ig-ring-ref: linear-gradient(45deg, #FFD600 0%, #FF7A00 25%, #FF0069 55%, #D300C5 80%, #7638FA 100%);
```

**Gradiente próprio do produto (obrigatório).** Crie um gradiente com a mesma técnica, com:
- 3 a 5 paradas, saturação alta (≥ 80%), luminosidade 50–65%;
- direção diagonal (45°) ou radial a partir do canto inferior esquerdo;
- uma progressão de matiz contínua (sem saltos que criem "lama" cinza no meio);
- ao menos uma diferença clara do original (ordem das matizes, paleta ou número de paradas).
Exemplo para Orivie (sugestão; confirmar no plano):
```css
--brand-gradient: linear-gradient(45deg, #FFB547 0%, #FF5E7E 40%, #B84DFF 75%, #5B6CFF 100%);
```
Uso permitido do gradiente: anel de conteúdo novo, logo/glifo próprio, ícone de criar em destaque,
splash/onboarding, selos especiais, CTAs de marketing. **Nunca** em fundo de tela de uso, texto
longo, botões comuns, bordas de card.

## 2. Tipografia

| Papel | Fonte | Observação |
|---|---|---|
| Interface (tudo) | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` | Igual ao app: SF Pro no iOS, Roboto no Android |
| Marca / marketing / títulos de story | Substituta da Instagram Sans: **"Plus Jakarta Sans"**, **"DM Sans"** ou **"Inter"** (700–800) | Instagram Sans é proprietária |
| Logotipo | Wordmark próprio (script ou geométrico) | Nunca imitar o logotipo manuscrito do Instagram |

### Escala (mobile)

| Token | Tamanho / altura de linha | Peso | Uso |
|---|---|---|---|
| `title-lg` | 24 / 30 | 700 | Título de onboarding, telas vazias |
| `title` | 20 / 25 | 700 | Nome de perfil no cabeçalho, título de seção grande |
| `headline` | 16 / 20 | 600–700 | Título de tela no header, título de sheet |
| `body` | 14 / 18 | 400 | Texto padrão, legendas, comentários |
| `body-strong` | 14 / 18 | 600 | Nomes de usuário, botões, contagem de curtidas |
| `meta` | 12 / 16 | 400 | Timestamps, "Ver todos os 24 comentários", nomes no tray de stories |
| `micro` | 11 / 14 | 400–600 | Badges, rótulos mínimos |
| `stat` | 16 / 20 | 600–700 | Números do perfil (publicações, seguidores) |

Regras:
- Hierarquia por **peso** e **cor secundária**, não por tamanho. A maioria dos textos tem 12–16px.
- Pesos usados: 400, 600, 700. Evitar 300 e 800+ na interface.
- **Sentence case** em tudo ("Editar perfil", nunca "EDITAR PERFIL" nem "Editar Perfil").
- Nome de usuário em negrito seguido do texto normal na mesma linha (padrão de legenda/comentário).
- Números grandes abreviados: 1.234 → "1.234"; 12.500 → "12,5 mil"; 1.200.000 → "1,2 mi".

## 3. Espaçamento
Grade de 4px. Valores mais usados: `4, 8, 12, 16, 20, 24, 32, 44`.
- Margem lateral mobile: **16px** (texto, cabeçalhos); mídia: **0** (de ponta a ponta).
- Altura de linha de lista (avatar 44px): 60–72px; padding vertical 8px.
- Espaço entre post e próximo post: 12–16px (sem divisores visíveis no app atual).

## 4. Raios

| Token | Valor | Uso |
|---|---|---|
| `--ig-radius-xs` | 4px | Miniaturas pequenas, chips de filtro na web |
| `--ig-radius-sm` | 8px | **Botões**, campos de busca, inputs |
| `--ig-radius-md` | 12px | Modais, menus suspensos, cards de sugestão, miniaturas de reels |
| `--ig-radius-lg` | 16–20px | Bottom sheets (cantos superiores), bolhas de DM (≈ 18–22px) |
| `--ig-radius-full` | 9999px | Avatares, anel de stories, badges, pílulas |
| — | 0 | Mídia do feed, grade do perfil, stories/reels em tela cheia |

## 5. Bordas, elevação, opacidade
- Divisor: `1px solid var(--ig-separator)` (no iOS pode ser 0,5px / hairline).
- Inputs: borda 1px `--ig-separator` ou sem borda com fundo `--ig-bg-tertiary`.
- **Sem sombras** na UI. Exceções: menus flutuantes no web (`0 4px 12px rgba(0,0,0,.15)`) e
  texto sobre mídia (`text-shadow: 0 0 4px rgba(0,0,0,.4)` ou gradiente escuro no rodapé da mídia).
- Pressed: opacidade 0,5 em ícones/textos tocáveis (padrão iOS), ou fundo `--ig-bg-hover` em linhas.

## 6. Tamanhos-chave

| Elemento | Tamanho |
|---|---|
| Ícones de interface | 24px (traço ~2px a 24px) |
| Tab bar | altura 49–50px + safe area; ícones 24–26px |
| Header do app | 44px + status bar |
| Avatar no post | 32px |
| Avatar em comentários/listas | 32–44px |
| Avatar no tray de stories | 56–64px conteúdo + anel 2px + espaço branco 2–3px (total ~66–74px) |
| Avatar no perfil | 77–86px (mobile), 150px (web) |
| Botão | altura 32px (compacto, perfil) / 44px (formulários, CTAs) |
| Alvo mínimo de toque | 44 × 44px |

## 7. Proporções de mídia
- Feed: **1:1** (quadrado), **4:5** (retrato, preferido), **1,91:1** (paisagem).
- Stories e reels: **9:16** em tela cheia.
- Grade do perfil: miniaturas **3:4** em 3 colunas com 1–2px de espaço (antes 1:1).
- Carrossel: até 10–20 itens com a mesma proporção, indicadores de pontos abaixo.
