# 08 — Web e responsividade

## Breakpoints de referência
| Faixa | Layout |
|---|---|
| < 768px | Igual ao app mobile: header com logo + tab bar inferior; mídia de ponta a ponta |
| 768–1263px | **Sidebar compacta** à esquerda (72px, só ícones), feed centralizado |
| ≥ 1264px | **Sidebar expandida** (~245px, ícone + rótulo), feed central (~470px) + coluna direita (~320px) com perfil do usuário e sugestões |

## Sidebar (desktop)
- Logo/wordmark no topo (glifo na versão compacta), itens com ícone 24px + rótulo 16px
  (ativo: rótulo 700 e ícone preenchido), altura do item 48px, raio 8px, hover `--ig-bg-tertiary`
  (light) / `#1A1A1A` (dark). Itens: Início, Pesquisa, Explorar, Vídeos, Mensagens, Notificações,
  Criar, Perfil; no rodapé "Mais" (☰).
- Pesquisa e notificações abrem **painel deslizante** (~400px, raio 16px à direita) sobre o conteúdo,
  e a sidebar encolhe para ícones.
- Divisor 1px à direita.

## Feed no desktop
- Coluna de 470px; posts com mídia **com raio 4–8px** e borda 1px opcional; espaçamento entre posts
  com divisor 1px e ~20px de margem.
- Stories no topo com setas de navegação circulares brancas (sombra leve) nas extremidades.
- Coluna direita: card do usuário (avatar 44px, nome, "Mudar" azul), "Sugestões para você"
  (título cinza 14/600 + "Ver tudo"), rodapé com links pequenos 12px cinza.

## Post aberto (modal)
- Backdrop `rgba(0,0,0,.65)`, × branco no canto, setas laterais para navegar.
- Modal dividido: mídia à esquerda (fundo preto, proporção preservada) + painel à direita (~400–500px)
  com header do autor, comentários roláveis, ações, curtidas, data e compositor.

## Perfil no desktop
- Avatar 150px à esquerda, à direita: nome + botões na mesma linha, estatísticas em linha
  ("**128** publicações  **1,2 mil** seguidores  **340** seguindo"), bio abaixo.
- Grade 3 colunas, gap 4px, largura máx. ~935px.

## Teclado e acessibilidade na web
- Foco visível: anel 2px `--ig-blue` com 2px de deslocamento.
- Setas ← → em carrosséis e modais; Esc fecha modais/painéis.
- Contraste: texto secundário `#737373` sobre branco atinge 4,6:1 (AA). Mantenha.
