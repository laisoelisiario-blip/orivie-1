# 04 — Telas e padrões

Cada tela abaixo descreve a estrutura de referência e **como adaptá-la a outro domínio**.
No plano (Etapa 2), mapeie quais telas o produto usa e como elas mudam.

## Mapa de navegação de referência
```
Tab bar: [Início] [Vídeos] [Criar ou Mensagens] [Buscar/Explorar] [Perfil]
Início ──► Stories (tela cheia) · Post · Comentários (sheet) · Notificações · Mensagens
Explorar ──► Busca · Post/Vídeo em lista contínua
Perfil ──► Editar perfil · Seguidores · Configurações · Destaques · Post
Criar ──► Galeria → Edição → Legenda/Publicar  (Post | Story | Vídeo | Ao vivo)
```

## 1. Início (feed)
- Header com logo + notificações + mensagens.
- Tray de stories no topo (rola junto com o feed).
- Lista vertical de posts (`03-components.md#4-post`), com sugestões intercaladas
  ("Sugestões para você": carrossel horizontal de cards 150–180px, raio 8–12px, borda 1px,
  avatar 54–88px, nome, motivo cinza, botão "Seguir" azul, "×" para dispensar).
- Fim do feed: "Você está em dia" com ícone de check em círculo gradiente + "Ver publicações antigas".
- **Adaptação**: o "post" vira a unidade de conteúdo do domínio (no Orivie: reflexão, resultado de
  teste, check-in de humor/hábito com foto). Mantenha a estrutura cabeçalho → mídia → ações → texto.

## 2. Stories (visualizador em tela cheia)
- Fundo preto, mídia 9:16 com raio 8–12px no topo/base em telas altas.
- Topo: **barras de progresso segmentadas** (uma por story, 2px, branco 35% com preenchimento
  branco animado, gap 4px), avatar 32px + nome + tempo ("2 h") + "…" + "×".
- Toque direita = próximo, esquerda = anterior, segurar = pausar (esconde a UI), arrastar para
  baixo = fechar, swipe lateral = próximo usuário (transição em cubo 3D).
- Rodapé: campo "Enviar mensagem" pílula com borda branca translúcida + ♡ + avião.
- Stickers interativos: enquete, pergunta, quiz, slider de emoji, contagem regressiva, link, menção,
  local. Cards brancos com raio 12–16px, títulos com gradiente ou cor sólida.
- **Adaptação**: ótimo para conteúdo efêmero/diário (ex.: "momento do dia", dica diária, check-in).
  Stickers viram mecânicas do domínio (enquete de humor, pergunta de autoconhecimento).

## 3. Criação (câmera / composer)
- Câmera em tela cheia: botão de captura circular branco grande (~72–80px, anel externo),
  galeria em miniatura à esquerda, virar câmera à direita, ferramentas na lateral esquerda
  (texto "Aa", filtros, música, layout), seletor de modo embaixo (POST · STORY · VÍDEO · AO VIVO)
  em texto 14px caps/600 com o ativo em branco e os demais em cinza.
- Edição: filtros em carrossel de miniaturas com nome; ferramentas de ajuste como ícones de traço + slider.
- Publicar: miniatura + campo de legenda, linhas de opções (Marcar pessoas, Adicionar local, Áudio,
  Público) com chevrons, botão "Compartilhar" azul largo no rodapé.
- **Adaptação**: fluxo em 3 passos (selecionar → editar → descrever/publicar) com "Avançar" em
  texto azul no header.

## 4. Vídeos curtos (reels)
- Tela cheia 9:16, rolagem vertical com snap (um vídeo por vez), header transparente com título
  "Reels" 22px/700 branco e ícone de câmera.
- Coluna direita de ações (ícones brancos 26–28px + contagem 12px/600 abaixo): ♡, 💬, ↻ (repost),
  ✈ e "…", capa do áudio (quadrado raio 6px) por último.
- Rodapé esquerdo: avatar 32px + nome 14/600 + botão "Seguir" com borda branca 1px raio 8px,
  legenda com "… mais", linha do áudio com ícone de nota musical e texto rolando.
- Gradiente escuro na base da mídia para legibilidade (`linear-gradient(transparent, rgba(0,0,0,.5))`).

## 5. Explorar / busca
- Campo de busca no topo; grade em mosaico de conteúdo recomendado.
- Ao buscar: abas (Para você · Contas · Áudio · Tags · Locais) e lista de resultados com avatar
  44px + nome + subtítulo; recentes com "×" e "Ver tudo" azul.
- Tocar em um item abre lista contínua do mesmo tipo (scroll infinito).

## 6. Perfil
Estrutura:
1. Header: nome de usuário (16–20px/700) + selo/▾ ; "+" e ☰ à direita.
2. Linha de identidade: avatar 77–86px (com anel se tiver story) + 3 estatísticas centralizadas
   ("**128** publicações", "**1,2 mil** seguidores", "**340** seguindo": número 16/600, rótulo 14/400).
3. Nome (14/600), categoria (14 cinza), bio (14, até 150 caracteres, quebras de linha), link (`--ig-link`, 600).
4. Painel profissional (opcional): card cinza raio 8px com métricas.
5. Botões: "Editar perfil" · "Compartilhar perfil" (secundários) + botão de sugestões.
6. Destaques (círculos).
7. Abas com ícones (grade · vídeos · marcados), indicador 1px.
8. Grade 3 colunas.
- **Adaptação**: estatísticas viram métricas do domínio (ex.: "dias de sequência", "testes",
  "reflexões"); destaques viram coleções; a grade é o histórico visual do usuário.

## 7. Notificações (atividade)
- Título "Notificações" 16/700; seções por período; agrupamentos ("ana, joão e outras 12 pessoas
  curtiram sua publicação") com avatares sobrepostos (2 avatares 32px deslocados).
- Linha com miniatura à direita ou botão "Seguir"/"Seguindo".

## 8. Mensagens (inbox e conversa)
- Inbox: header com nome de usuário ▾ + ícones; busca; "Notas" (bolhas de texto acima dos avatares,
  balão branco com raio 16px); lista: avatar 56px (ponto verde se online) + nome 14/400 (600 se não lida)
  + preview cinza "Enviou um reel · 2 h" + ponto azul de não lida + ícone câmera à direita.
- Conversa: header com avatar 24px + nome + ícones de chamada/vídeo; bolhas (`03-components.md#13`);
  compositor fixo no rodapé.

## 9. Onboarding, login e cadastro
- Tela de entrada: logo/glifo próprio centralizado (com gradiente), botões empilhados largos:
  "Entrar" (azul) e "Criar nova conta" (contorno/secundário), seletor de idioma no topo, rodapé com
  marca da empresa-mãe em cinza (opcional: "from Orivie Labs").
- Cadastro em passos curtos, **uma pergunta por tela**: título 24/700 ("Qual é o seu nome?"),
  subtítulo 14 cinza, um campo, botão "Avançar" azul largo, link "Já tenho uma conta" no rodapé.
- Permissões (notificações, contatos, câmera): ilustração/ícone, explicação curta, primário + "Agora não".

## 10. Configurações
- Lista longa agrupada com títulos de seção cinza, busca no topo, linhas com ícone de traço,
  rótulo, valor cinza à direita e chevron. Ação "Sair" em `--ig-error`/azul no fim.
