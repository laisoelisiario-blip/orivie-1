# 09 — Checklist de QA (rode antes de entregar)

## Processo
- [ ] Houve descoberta e o plano foi aprovado (ou o usuário dispensou explicitamente).
- [ ] O entregue corresponde às telas e prioridades do plano.

## Cor
- [ ] Fundo branco (ou dark petróleo) e cores usadas pelo **significado** (verde avançar/correto,
      azul selecionado, vermelho erro, laranja sequência, amarelo XP, roxo premium).
- [ ] Sem preto puro em texto (`#4B4B4B`), sem gradiente fora de premium.
- [ ] Todas as cores vêm de tokens.

## Forma e profundidade
- [ ] Botões com raio 12px, borda 2px, lábio sólido `0 4px 0` e afundamento ao pressionar.
- [ ] Cards/opções com borda 2px `#E5E5E5` (opções com borda inferior 4px), raio 16px.
- [ ] Nenhuma sombra com blur (exceto backdrop de modal).

## Tipografia
- [ ] Fonte arredondada; títulos ≥ 700; botões em CAIXA ALTA 700 com letter-spacing.
- [ ] Hierarquia consistente: poucos estilos, cabeçalhos com título sempre na mesma posição.

## Layout
- [ ] Uma ação primária por tela; botão de tarefa fixo no rodapé.
- [ ] Progresso visível (barra de lição, trilha, header de status).
- [ ] Espaço em branco agrupa conteúdo; sem containers desnecessários.
- [ ] Alvos de toque ≥ 48px; margem lateral 16px.

## Estados e feedback
- [ ] Default, pressed, selected, disabled, correto, incorreto, vazio, carregando, erro.
- [ ] Feedback de resposta com cor + ícone + texto + som (desligável) + haptic.
- [ ] Celebração proporcional à conquista; todas puláveis.

## Ilustração e personagens
- [ ] Formas geométricas simples, cores chapadas, poucos detalhes, silhueta clara.
- [ ] Mascote/personagens originais, olhos grandes, reagem nos momentos-chave.
- [ ] Representação diversa e sem estereótipos.

## Texto
- [ ] PT-BR, curto, encorajador; erros sem culpa; humor dosado.
- [ ] Títulos descritivos; pedidos explicam o benefício.

## Gamificação e ética
- [ ] Mecânicas do plano implementadas de forma coerente (sequência, XP, metas…).
- [ ] Competição/social desativável; lembretes configuráveis; sem vergonha ou ameaça real.

## Acessibilidade
- [ ] Contraste AA em textos (`#4B4B4B`/`#777777` sobre branco); texto branco sobre cor só em ≥ 15px/700.
- [ ] Estado nunca só por cor (ícone ✓/✕ + texto).
- [ ] `prefers-reduced-motion` respeitado; `aria-label` em ícones; foco visível.

## Propriedade intelectual
- [ ] Nenhum nome, coruja, personagem, logotipo, fonte, ícone, som ou texto do Duolingo.
- [ ] Mascote, elenco, moedas, ligas e premium com nomes e visuais próprios.
