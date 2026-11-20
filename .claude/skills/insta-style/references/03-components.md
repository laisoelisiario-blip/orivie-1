# 03 — Componentes

Use os tokens de `02-tokens.md`. CSS base em `../assets/tokens.css`. Todos os componentes devem
funcionar em light e dark mode sem regras extras (apenas trocando tokens).

---

## 1. Botões

| Variante | Fundo | Texto | Uso |
|---|---|---|---|
| `primary` | `--ig-blue` | `#FFF`, 600 | Seguir, Entrar, Publicar, Salvar |
| `secondary` | `--ig-bg-tertiary` | `--ig-text`, 600 | Editar perfil, Compartilhar perfil, Seguindo ▾, Mensagem |
| `text` / link | transparente | `--ig-blue`, 600 | "Seguir" dentro de listas e headers, "Ver tradução", "Esqueceu a senha?" |
| `destructive` | transparente ou `--ig-bg-tertiary` | `--ig-error`, 600–700 | Excluir, Denunciar, Deixar de seguir |
| `icon` | transparente | `--ig-text` | Ações de post, header |

Especificação:
- Raio **8px**; altura **32px** (compacto) ou **44px** (largo, formulários); padding 16px.
- Fonte 14px peso 600, sentence case, sem ícone na maioria dos casos.
- Sem sombra, sem borda, sem gradiente.
- Pressed: primário → `--ig-blue-hover`; secundário → `--ig-bg-hover`; ícone/texto → opacidade .5.
- Desabilitado: primário com `--ig-blue-disabled`; demais com opacidade .3.
- Loading: texto some, spinner pequeno branco/cinza centralizado, mesma largura.
- Botões lado a lado no perfil: largura igual, gap 6–8px, + botão quadrado 32px com ícone (sugestões).

## 2. Avatar e anel de stories

```
 ┌ anel gradiente 2px ┐
 │ ┌ espaço 2–3px ┐   │   o "espaço" tem a cor do fundo (branco/preto)
 │ │   avatar     │   │
 │ └──────────────┘   │
 └────────────────────┘
```
Estados do anel:
- **Novo/não visto**: gradiente da marca.
- **Visto**: anel 1px `--ig-separator` (cinza).
- **Amigos próximos**: anel verde `--ig-close-friends`.
- **Ao vivo**: anel gradiente + selo "AO VIVO" (pílula gradiente, texto branco 10–11px 700) sobreposto embaixo.
- **Seu story (sem conteúdo)**: sem anel, botão "+" azul 20px com borda 2px do fundo no canto inferior direito.
- Avatar sem foto: silhueta cinza sobre `--ig-bg-tertiary`.
- Loading do story ao tocar: o anel gira (animação de rotação/traço) até abrir.

## 3. Tray de stories
- Rolagem horizontal, primeiro item é o do usuário ("Seu story").
- Avatar ~64px, espaçamento 12–16px, nome abaixo em `meta` (12px), truncado com reticências.
- Altura total ~100–110px; separador inferior opcional de 1px.

## 4. Post (card do feed)
Estrutura de cima para baixo:
1. **Cabeçalho** (altura 52–56px, padding 12–16px): avatar 32px com anel se tiver story ·
   nome de usuário 14px/600 (+ selo verificado 12px) · linha secundária opcional (local, áudio)
   12px · à direita: botão texto "Seguir" (se não segue) e ícone "…" (mais opções).
2. **Mídia** de ponta a ponta, sem raio. Carrossel: contador "1/5" (pílula escura translúcida no
   canto superior direito) e pontos abaixo da mídia (ativo azul `--ig-blue`, demais cinza, 6px).
   Ícone de usuários marcados no canto inferior esquerdo; ícone de som em vídeos.
3. **Barra de ações** (altura ~46px): esquerda → curtir (coração), comentar (balão), compartilhar
   (avião de papel); direita → salvar (marcador). Ícones 24px, gap ~16px. Contagens ao lado dos
   ícones no app atual (14px 600).
4. **Curtidas**: "Curtido por **ana** e **outras pessoas**" ou "**1.234 curtidas**" (14px 600).
5. **Legenda**: **usuario** texto… "mais" (cinza) para expandir; hashtags/menções em `--ig-link`.
6. **Comentários**: "Ver todos os 24 comentários" (cinza), até 2 comentários de preview.
7. **Timestamp**: "há 2 horas" / "3 de março" (12px cinza) e "Ver tradução" opcional.

Estados: curtido (coração vermelho preenchido), salvo (marcador preto preenchido), patrocinado
(label "Patrocinado" abaixo do nome + faixa de CTA azul/cinza sob a mídia).

## 5. Tab bar (navegação principal)
- 5 itens, ícones 24–26px **sem rótulo**, fundo `--ig-bg`, divisor superior 1px (ou nenhum).
- Inativo: ícone de **traço**; ativo: ícone **preenchido** (mesma cor `--ig-text`). Sem cor de destaque.
- Última aba: **avatar do usuário** 24–26px; ativo ganha anel de 1,5–2px `--ig-text`.
- Badge: ponto vermelho 4–6px abaixo do ícone, ou contador vermelho com borda do fundo.
- Ordem atual de referência: Início · Reels/Vídeos · Mensagens/Criar · Buscar/Explorar · Perfil.
  Adapte ao domínio no plano (ver `04-screens-patterns.md`).

## 6. Header (top bar)
- Altura 44px. Início: **logo/wordmark** à esquerda (pode abrir seletor "Seguindo/Favoritos"),
  ícones à direita (notificações ♡, mensagens). Telas internas: voltar `‹` à esquerda, título
  centralizado 16px/700, ação à direita (texto azul "Concluir" ou ícone).
- Perfil: nome de usuário com cadeado/selo + chevron ▾ (troca de conta) à esquerda, "+" e menu ☰ à direita.
- Sem fundo colorido; em rolagem pode ganhar divisor 1px.

## 7. Listas (seguidores, notificações, configurações)
- Linha: avatar 44px · bloco de texto (nome 14/600, subtítulo 14/400 cinza) · ação à direita
  (botão compacto "Seguir"/"Seguindo" ou miniatura 44px do post).
- Notificações agrupadas por "Hoje", "Esta semana", "Este mês" (títulos 16px/700).
- Configurações: ícone 24px de traço + rótulo 14–16px + chevron cinza, seções com título cinza 14px/600.

## 8. Campo de busca e inputs
- Busca: altura 36px, raio 8–10px, fundo `--ig-bg-tertiary`, ícone lupa 16px cinza, placeholder
  "Pesquisar" cinza. Ao focar aparece botão texto "Cancelar".
- Input de formulário (login/cadastro): altura 44–56px, fundo `--ig-bg-secondary` (light) / `--ig-bg-tertiary` (dark),
  borda 1px `--ig-separator`, raio 6–12px, label flutuante 12px cinza ao digitar, ícone "Mostrar" senha.
- Erro: texto 12–14px `--ig-error` abaixo; ícone de alerta no campo.
- Compositor de comentário/DM: avatar 32px + campo pílula (raio full, borda 1px) + "Publicar" azul
  (desabilitado até digitar) ou ícones (microfone, galeria, sticker). Linha de reações rápidas com emojis acima.

## 9. Bottom sheet e menus
- Sheet: fundo `--ig-bg-elevated`, cantos superiores 12–16px, "alça" (36×4px, cinza, raio full)
  no topo, título opcional 16/700 centrado com divisor.
- Itens: ícone 24px + texto 16px, altura 48–56px; destrutivos em `--ig-error`.
- Ações rápidas no topo do sheet de opções: 2–4 botões circulares/quadrados (Salvar, Remixar, QR code).
- Modal de confirmação (estilo "action sheet" centralizado): largura ~270–400px, raio 12px,
  título 18/700, texto 14 cinza, botões empilhados ocupando a largura com divisores 1px:
  ação principal em `--ig-blue`/`--ig-error` 700, "Cancelar" em `--ig-text` 400.

## 10. Abas internas (segmented)
- Perfil: ícones (grade, reels, marcados) centralizados, indicador **linha 1px preta** sob a aba
  ativa (largura total da aba); inativo em cinza.
- Texto (ex.: "Seguidores | Seguindo"): 14–15px/600, ativo `--ig-text`, inativo cinza, indicador 1px.

## 11. Destaques (highlights)
- Círculos 64px com anel cinza 1px e espaço branco, capa interna; nome 12px abaixo; primeiro item
  "Novo" com "+" em círculo vazio.

## 12. Grade de perfil / explorar
- 3 colunas, gap 1–2px, miniaturas 3:4 (perfil) ou 1:1/mista (explorar: mosaico com um item 1×2
  a cada bloco de 5).
- Ícones sobrepostos no canto superior direito (branco com sombra): carrossel, vídeo/reel, fixado.
- Reels na grade mostram contagem de visualizações ▶ 12,3 mil no canto inferior esquerdo.

## 13. Bolhas de mensagem (DM)
- Enviadas: à direita, fundo gradiente azul-roxo (ou `--ig-blue`/cor do tema da conversa), texto branco.
- Recebidas: à esquerda, fundo `--ig-bg-tertiary`, texto `--ig-text`, avatar 24–28px no último bloco.
- Raio ~20px, mensagens consecutivas reduzem o raio no lado "colado" (4–6px).
- Reações como emoji pequeno sobreposto na borda inferior da bolha; "Visto" 12px cinza.

## 14. Toast / snackbar
- Faixa escura (`#262626` no light, `#363636` no dark) com texto branco 14px, raio 8–12px,
  ação em texto azul claro ("Desfazer", "Ver"), aparece embaixo acima da tab bar por 3–4s.

## 15. Badges e selos
- Verificado: selo azul `--ig-blue` com check branco (12–14px). Use um selo **próprio** para o produto.
- Contador: pílula vermelha `--ig-red`, texto branco 11px/700, borda 2px da cor do fundo.
- "Novo": ponto azul 8px ao lado do item.

## 16. Skeletons e carregamento
- Blocos `--ig-bg-tertiary` (círculos para avatares, retângulos para texto/mídia) com shimmer suave.
- Spinner: estilo iOS de 12 traços ou anel girando cinza, 24–32px.
- Pull-to-refresh: spinner no topo; nunca bloquear a tela inteira.

## 17. Estados vazios
- Ícone grande de traço em círculo com borda 2px (~62–96px), título 24–30px/700, texto 14px cinza,
  link/ação azul. Ex.: "Compartilhar fotos" → "Quando você compartilhar fotos, elas aparecerão no seu perfil."
