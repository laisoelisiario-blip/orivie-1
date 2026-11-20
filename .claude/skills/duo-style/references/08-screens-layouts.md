# 08 — Telas e layouts

## Sistema de cabeçalhos (refresh 2026)
Cabeçalhos em **níveis de tamanho conforme o propósito da aba**, com o **título sempre na mesma
posição**. Poucos estilos de texto. Use o espaço em branco para separar blocos em vez de caixas.

## Navegação de referência
```
Mobile (tab bar): [Início/Trilha] [Prática] [Ligas] [Missões] [Perfil] (+ [Mais])
Desktop: sidebar esquerda com os mesmos itens + wordmark; coluna direita com widgets
(liga, missões diárias, convidar amigos, premium).
```
Adapte as abas ao domínio no plano (no máximo 5 no mobile).

## 1. Início / trilha
- Header de status (curso/área, sequência, moedas, vidas).
- Cabeçalho de unidade sticky + trilha em zigue-zague com personagens nos espaços vazios.
- Botão flutuante para voltar à posição atual.
- Desktop: trilha central (~600px) + coluna direita com cards (liga, missões, promoções).

## 2. Lição (tela de tarefa)
```
[✕]  [██████████░░░░░░░░]  [❤ 5]        ← barra de progresso no topo
Título/enunciado (h1, 800)
[personagem]  (balão de fala com o conteúdo / áudio)
[opção 1] [opção 2] [opção 3] [opção 4]   ← tiles selecionáveis
──────────────────────────────────────── divisor 2px
[PULAR]                       [VERIFICAR] ← rodapé fixo
```
- Uma tarefa por tela, coluna máx. 600px. VERIFICAR desabilitado até haver resposta.
- Após verificar: banner de feedback no rodapé (verde/vermelho) com CONTINUAR / ENTENDI.
- Interstício animado a cada N acertos seguidos.
- Tipos de tarefa adaptáveis: múltipla escolha, escolher imagem, montar frase com tiles, completar lacuna,
  ligar pares, ouvir/falar, resposta livre, escala/slider.

## 3. Resultado da lição
Mascote/personagem comemorando (grande), título "Lição concluída!", 2–3 cards de estatística com
borda colorida (XP total amarelo, precisão verde, tempo azul) que animam ao entrar, botão CONTINUAR.
Em seguida, telas encadeadas de recompensas: sequência +1 (animação do número), missão concluída,
baú, subida de liga — cada uma com uma ação.

## 4. Sequência
Número enorme + ícone de sequência laranja, frase motivacional, calendário semanal/mensal, proteções
equipadas, marcos futuros, botão de compartilhar.

## 5. Ligas
Emblemas no topo, título "Liga X", tempo restante, lista ranqueada com zonas de promoção/rebaixamento.

## 6. Missões
Cards de missão com ícone, título, barra amarela de progresso "3/5" e baú; seção de missão com amigo;
badge do mês.

## 7. Perfil
Avatar grande ilustrado, nome, @usuário, data de entrada, seguidores; botão ADICIONAR AMIGOS (outline);
estatísticas em grade 2×2 (sequência, XP total, liga atual, top 3) — cards com borda 2px e ícone colorido;
conquistas em prateleira; amigos.

## 8. Onboarding
- Splash: fundo cor-herói, wordmark branco, mascote animado.
- Boas-vindas: mascote + balão de fala ("Oi! Eu sou o X!"), botão CONTINUAR.
- Perguntas **uma por tela** com o mascote falando em balão e opções em tiles
  (objetivo, motivo, meta diária, nível), barra de progresso no topo.
- **Mostrar valor antes do cadastro**: primeira lição antes de pedir conta; depois "Crie seu perfil
  para salvar seu progresso".
- Pedido de notificação explicando o benefício + preview do lembrete.

## 9. Premium
Mesma estrutura de telas com fundo escuro/iridescente, mascote em versão "power-up", lista de benefícios
com ícones, preço claro, CTA brilhante e teste grátis.

## 10. Configurações
Lista agrupada em cards com borda 2px; títulos de seção em caixa alta cinza; toggles azuis.

## Responsivo
| Faixa | Layout |
|---|---|
| < 700px | Tab bar inferior, conteúdo full-width com 16px de margem |
| 700–1159px | Sidebar compacta (ícones) + conteúdo central |
| ≥ 1160px | Sidebar expandida + conteúdo + coluna direita de widgets |
Na lição, em qualquer largura: coluna central máx. 600px e rodapé fixo com divisor superior 2px.
Desktop aceita atalhos de teclado (1–4 para opções, Enter para verificar).
