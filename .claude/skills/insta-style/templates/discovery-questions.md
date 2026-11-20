# Perguntas de descoberta (Etapa 1)

Use antes de desenhar qualquer coisa. Pergunte em rodadas de 4–8 perguntas, com opções sugeridas.
Se o usuário já respondeu algo no pedido, não repita: confirme e pergunte só o que falta.

## Rodada 1 — Produto e foco (obrigatória)
1. **O que você quer construir?** Descreva o app em uma frase.
2. **Qual é o foco principal?** O que o usuário mais faz no app?
   _Opções: compartilhar conteúdo · registrar/diário · descobrir/consumir · aprender · comprar · conversar/comunidade_
3. **Qual é a unidade de conteúdo (o "post")?**
   _Ex.: foto, vídeo curto, texto/reflexão, resultado de teste, hábito/check-in, produto, receita_
4. **Social ou pessoal?**
   _Opções: social (seguir, curtir, comentar) · pessoal (só o usuário vê) · misto (privado por padrão, compartilhar opcional)_

## Rodada 2 — Formatos e escopo
5. **Quais formatos do estilo você quer usar?** (múltipla escolha)
   _Feed · Stories/efêmero · Vídeos curtos verticais · Perfil em grade · Explorar/busca · Mensagens · Notificações · Criação com câmera/edição_
6. **Quais telas são prioridade na primeira entrega?** (até 5)
7. **Plataforma e stack**: iOS, Android, web responsivo, PWA? React, React Native, Flutter, Next.js, outro?

## Rodada 3 — Público e marca
8. **Quem é o público?** Faixa etária, contexto de uso (rápido no celular? momentos de calma?).
9. **Marca**: já existe nome, logo, cor ou gradiente? Ou devo propor?
10. **Tom**: mais leve/divertido ou mais calmo/acolhedor? Alguma palavra que defina a sensação do app?
11. **Light, dark ou ambos?** (padrão: ambos)

## Rodada 4 — Restrições (se relevante)
12. Requisitos de acessibilidade, idiomas além do PT-BR, conteúdo sensível (saúde, menores),
    monetização (assinatura, anúncios, loja), integração com câmera/galeria.

## Exemplo de chamada com AskUserQuestion
- Pergunta: "Qual é o foco principal do app?" · cabeçalho "Foco" · opções:
  "Compartilhar conteúdo", "Diário pessoal", "Descobrir conteúdo", "Comunidade/conversa".
- Pergunta: "Qual unidade de conteúdo aparece no feed?" · cabeçalho "Post" · opções sugeridas
  conforme o domínio informado.
