# 05 — Movimento, som e haptics

## Princípios
- **Bouncy**: movimentos com spring e overshoot leve; tudo parece de borracha.
- **Movimento atrai o olhar**: use animação para guiar a atenção para a próxima ação.
- **Recompensa proporcional**: acerto simples = microanimação; sequência de acertos = interstício
  animado; marco (7, 30, 100, 365 dias) = celebração de tela cheia com transformação do mascote.
- **Timing é tudo**: faça passes de animação grosseira, ajuste ritmo e energia antes de polir.
- Personagens têm **estado ocioso** (piscar, respirar, balançar) e **reações** a acerto/erro.

## Tokens
```css
--duo-spring: cubic-bezier(.34,1.56,.64,1);  /* pop, barras, balões */
--duo-ease-out: cubic-bezier(.2,0,0,1);
--duo-dur-press: 80ms;   /* afundar botão */
--duo-dur-fast: 150ms;   /* troca de estado */
--duo-dur-base: 250ms;   /* sheets, banners */
--duo-dur-celebrate: 600–1500ms;
```

## Microinterações assinatura
| Momento | Comportamento |
|---|---|
| Pressionar botão/opção | afunda `translateY(4px)` e o lábio some (80ms); volta ao soltar |
| Selecionar opção | borda/fundo azul + leve pop (scale 1 → 1.03 → 1) |
| Verificar correto | banner verde sobe (200ms), ícone ✓ com pop, **som de acerto**, haptic de sucesso, personagem comemora |
| Verificar errado | banner vermelho sobe, leve "shake" horizontal na opção (±6px, 300ms), som suave de erro, coração perde 1 com animação de quebra |
| Barra de progresso | preenche com spring; brilho percorre a barra em combos |
| Combo (ex.: 5 seguidas) | label animado + **interstício de meio de lição** com personagem (1–2s, pulável) |
| Nó atual na trilha | balão "COMEÇAR" flutuando (bounce vertical lento, 2s loop) |
| Fim da lição | tela de resultados: mascote comemorando, contadores de XP/precisão/tempo subindo um a um, confete |
| Marco de sequência | transformação "power-up" do mascote em tela cheia + número gigante + cartão compartilhável |
| Ganhar recompensa | baú balança, abre com explosão de partículas, item voa para o contador do header |
| Subir de liga | emblema da nova liga cai/gira e brilha |

## Ferramentas
- **Rive** (preferido): animações vetoriais leves com **State Machine** para controlar estados
  (ocioso → falando → acertou/errou) por código e até **lip-sync** com visemas sincronizados ao áudio.
- Alternativas: Lottie, CSS/Framer Motion/Reanimated para microinterações.

## Som
- Pacote curto e característico: acerto (tom ascendente brilhante), erro (tom grave suave, não punitivo),
  fim de lição (fanfarra curta), combo, recompensa, toque de botão opcional.
- Sons ≤ 1s, mixagem suave, **com opção de desligar** nas configurações.
- Personagens podem ter **vozes próprias** (TTS personalizado) coerentes com a personalidade.

## Haptics
Leve ao pressionar opções; sucesso ao acertar; erro (2 pulsos curtos) ao errar; forte em celebrações.

## Acessibilidade
Respeite `prefers-reduced-motion`: troque shakes, confetes e transformações por fade/estado estático,
mantendo a mudança de cor/ícone. Toda celebração deve ser pulável.
