# 09 — Checklist de QA (rode antes de entregar)

Marque cada item. Qualquer "não" deve ser corrigido ou justificado ao usuário.

## Processo
- [ ] Houve descoberta com o usuário e o plano foi aprovado (ou o usuário dispensou explicitamente).
- [ ] O que foi construído corresponde às telas e prioridades do plano.

## Cor
- [ ] A interface é monocromática; a cor vem do conteúdo.
- [ ] Só existe **uma** cor de ação (azul) para primários e links de ação.
- [ ] O gradiente aparece apenas em momentos de marca (anel, logo, criação, onboarding, selos).
- [ ] Vermelho só para curtida, notificação, erro e ações destrutivas.
- [ ] Todas as cores vêm de tokens; nenhum HEX solto no código dos componentes.

## Tipografia
- [ ] Fonte do sistema na interface; fonte de marca só em marca/marketing.
- [ ] Base de 14px; pesos 400/600/700; hierarquia por peso e cor secundária.
- [ ] Sentence case em todos os botões, títulos e menus; sem CAIXA ALTA (exceto seletor de modo da câmera e selos).
- [ ] Nomes de usuário em 600 seguidos de texto 400 na mesma linha.

## Layout e componentes
- [ ] Mídia de ponta a ponta no mobile, sem raio; proporções 1:1, 4:5, 9:16 respeitadas.
- [ ] Botões com raio 8px, altura 32/44px, sem sombra.
- [ ] Avatares circulares; anel de 2px + espaço da cor do fundo quando houver conteúdo novo.
- [ ] Tab bar com 5 ícones sem rótulo, traço inativo / preenchido ativo, avatar na última aba.
- [ ] Separadores de 1px ou espaço; nenhuma sombra decorativa.
- [ ] Margem lateral de 16px para texto; alvos de toque ≥ 44px.

## Estados
- [ ] Default, pressed, ativo, disabled, loading (skeleton), vazio e erro implementados.
- [ ] Curtir/salvar/seguir com atualização otimista e microanimação.
- [ ] Estados vazios com ícone em círculo, título, texto curto e ação.

## Dark mode
- [ ] Funciona trocando apenas tokens; fundo `#000`, elevados `#262626`/`#121212`.
- [ ] Nenhum texto/ícone fica invisível; o espaço do anel do avatar segue a cor do fundo.

## Movimento
- [ ] Durações 150–400ms; double tap com coração grande; sheets arrastáveis.
- [ ] `prefers-reduced-motion` respeitado.

## Texto
- [ ] Português do Brasil, frases curtas, "você", verbos nos botões, sem culpa.
- [ ] Tempos relativos e números abreviados no padrão ("há 2 h", "1,2 mil").

## Acessibilidade
- [ ] Contraste AA para textos (secundário `#737373` no light, `#A8A8A8` no dark).
- [ ] `aria-label` em botões de ícone; `alt` em mídias; foco visível na web.
- [ ] Estado nunca indicado só por cor (traço → preenchido).

## Propriedade intelectual
- [ ] Nenhum uso de nome, logo, glifo de câmera, Instagram Sans ou ícones copiados.
- [ ] Gradiente, logo, selos e nomes de recursos são próprios do produto.
