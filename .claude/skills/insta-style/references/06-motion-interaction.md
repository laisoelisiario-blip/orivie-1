# 06 — Movimento, gestos e feedback

## Princípios
- **Rápido e físico**: animações de 150–300ms, curvas suaves de desaceleração e springs leves.
- **Contínuo**: elementos se transformam no lugar em vez de cortar (miniatura → tela cheia).
- **Otimista**: a ação reflete na UI imediatamente (curtiu = coração já vermelho), sincroniza depois.
- **Discreto**: a animação reforça a ação; não vira espetáculo. A exceção é o momento de curtir.

## Curvas e durações (tokens)
```css
--ig-ease-out: cubic-bezier(0.2, 0, 0, 1);       /* entrada de telas e sheets */
--ig-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);  /* trocas de estado */
--ig-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* "pop" do coração, badges */
--ig-dur-fast: 150ms;   /* pressed, troca de ícone */
--ig-dur-base: 250ms;   /* sheets, modais, transições */
--ig-dur-slow: 400ms;   /* coração grande do double tap */
```

## Microinterações assinatura
| Interação | Comportamento |
|---|---|
| **Curtir (ícone)** | Coração troca para preenchido vermelho com escala 1 → 1,2 → 1 (spring, ~250ms) + haptic leve |
| **Double tap na mídia** | Coração branco grande (~80–100px) aparece no centro: escala 0 → 1,1 → 1, fica ~400ms, sobe e some com fade; ícone de curtir também é ativado |
| **Salvar** | Marcador preenche; toast "Salvo na coleção" com ação "Salvar em…" |
| **Seguir** | Botão azul troca para secundário "Seguindo" sem atraso; sugestões relacionadas deslizam abaixo |
| **Abrir story** | Anel do avatar gira enquanto carrega; story cresce a partir do avatar (zoom) |
| **Trocar de usuário no story** | Transição de cubo 3D no swipe horizontal |
| **Fechar story/mídia** | Arrastar para baixo encolhe a mídia acompanhando o dedo e volta à origem |
| **Barras de progresso** | Preenchimento linear contínuo (5s foto; duração do vídeo); pausa ao segurar |
| **Pull-to-refresh** | Spinner no topo com spring ao soltar |
| **Tab bar** | Troca traço → preenchido instantânea; tocar de novo na aba ativa rola ao topo |
| **Bottom sheet** | Sobe de baixo (250ms ease-out), arrastável, backdrop com fade |
| **Long press em miniatura** | "Peek": prévia ampliada com desfoque de fundo e ações ao arrastar |
| **Reações em DM** | Duplo toque na bolha = ❤️; segurar = barra de emojis com pop |

## Gestos padrão
- Toque: abrir. Duplo toque: curtir. Pressionar e segurar: prévia/pausar/opções.
- Swipe horizontal: carrossel, próximo story, abas, câmera (deslizar da esquerda no início).
- Swipe vertical: rolagem; arrastar para baixo fecha visualizadores em tela cheia.
- Pinça: zoom em fotos do feed (a mídia se solta sobre a interface e volta ao soltar).

## Haptics (mobile)
- Leve (`impactLight`): curtir, selecionar filtro, alcançar o fim de um slider.
- Médio: captura de foto, início de gravação.
- Sucesso (`notificationSuccess`): publicação concluída.
- Nunca vibrar em rolagem comum.

## Carregamento e feedback de sistema
- Skeleton com shimmer em vez de spinners de tela cheia.
- Upload de post: barra fina no topo do feed com miniatura e progresso; "Pronto" com check.
- Erros: toast escuro com ação "Tentar novamente"; nunca alert nativo para erro de rede.

## Acessibilidade de movimento
- Respeite `prefers-reduced-motion`: troque zooms/cubos por fade de 150ms e remova o coração grande
  animado (mantenha a mudança de estado do ícone).
