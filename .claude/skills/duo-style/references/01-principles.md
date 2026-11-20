# 01 — Princípios e filosofia

## A essência em uma frase
**"Um jogo de celular disfarçado de app sério."** Formas simples e gordinhas, cores de brinquedo,
recompensas constantes e personagens que se importam com você (às vezes até demais).

## O que o próprio Duolingo diz sobre o seu design
Resumo dos artigos do time de design no blog oficial (ver `sources.md`):

### Evolução do estilo
- Antes de 2018: formas estáticas, pontudas, cores apagadas, fundo cinza-claro.
- 2018: o time de arte, trabalhando no Duolingo ABC/KIDS, passou a fazer ilustrações **mais vivas,
  redondas e amigáveis**. O estilo migrou para o app principal junto com um redesign da UI:
  **cores vibrantes e botões arredondados sobre fundo branco**.
- Resultado: estética **"bold, bouncy and bright"** (ousada, saltitante e vibrante), **minimalista e
  lúdica**, que precisa ser **rápida de produzir, clara de entender e divertida**.

### Os pilares da arte (artigo "Shape language")
| Pilar | Regra prática |
|---|---|
| **Rápido de produzir** | Estilo minimalista vetorial; poucas formas; escala para qualquer tela. |
| **Claro de entender** | Use o **mínimo de detalhes** necessário para ler o objeto. Silhueta clara, cercada de espaço branco. "Nossa falha vira a falha do aluno." |
| **Divertido** | **Exagero, humor e narrativa**. Transforme um conteúdo neutro em uma pequena história curiosa. |
| **Contexto cultural** | Comida, festas, objetos e pessoas de culturas diversas, com respeito. |
| **Exagero e ritmo** | Exagere detalhes-chave quase até a caricatura; varie formas e tamanhos com ritmo. |
| **Guiar a atenção** | Linhas e ângulos da arte apontam para a UI/texto; **movimento atrai o olhar** (ícones animados aumentam o tempo de atenção). |

### Craft e sistema (artigo "Core tabs refresh", 2026)
- **Craft** é o que transforma um bom produto em um produto encantador: "não é só como parece, é como
  aprender **se sente**".
- Problemas que eles corrigiram e você deve evitar: cabeçalhos de tamanhos diferentes, tipografia sem
  hierarquia, espaçamentos inconsistentes.
- Direções exploradas: *Punchy* (cabeçalhos sólidos e vibrantes), *Soft* (gradientes calmos),
  *Modular* (cards), *Flat* (mínimo, muito espaço). A solução equilibrou:
  - **Consistência × propósito**: não force ilustração em todo cabeçalho se ela não comunica nada.
  - **Simplicidade × clareza**: saiba o que remover e o que manter.
- Sistema resultante: **cabeçalhos em níveis de tamanho conforme o propósito da tela, com o título
  sempre na mesma posição**; **poucos estilos de texto**; **usar o espaço em branco em vez de forçar
  containers ao redor de tudo**.
- QA com sobreposição do design ("design overlays") e testes internos em vários idiomas/dispositivos.

### Personagens (artigos "Building character", "Vikram redesign", "How to draw Duo")
- O mascote é o **elemento visual mais importante** da marca. O elenco humano foi desenhado para
  **parecer do mesmo mundo do mascote**: geometria simples, **olhos grandes e cativantes**, formato de
  corpo único e **pés destacados/soltos do corpo**.
- Personagens são **humanos modernos com personalidades bem peculiares** ("quirk is key"), diversos em
  idade, etnia e temperamento, em **pares de opostos** (extrovertida × introvertida, relaxada × ansiosa).
- **Formas comunicam personalidade**: círculos = amigável, mas excesso pode virar "bonachão/preguiçoso";
  blocos = forte, mas também rígido. Revise estereótipos com consultoria cultural.
- Personagens aparecem **onde o usuário passa mais tempo** (nas lições), falam o conteúdo, reagem a acertos
  e erros e têm **animações de meio de lição** como recompensa por sequências de acertos.

### Motivação (artigos sobre sequência, ligas, widget e conquistas)
- O produto só funciona se a pessoa **quiser voltar todo dia**. Gamificação existe para criar hábito.
- **Baixe a barreira do hábito**: estender a sequência exige só 1 lição (separada da meta diária),
  o que aumentou a retenção. Dê **flexibilidade** (proteção/congelamento de sequência).
- **Celebre marcos de forma exagerada**: o marco de sequência virou uma transformação do mascote
  ("power-up" de videogame) com animação + **cartão compartilhável**.
- **Teste tudo** (A/B), inclusive textos por idioma.

## Hierarquia de cor por significado
| Significado | Token | Exemplos |
|---|---|---|
| Avançar, correto, concluído, ação primária | `--duo-green` | CONTINUAR, resposta certa, nó concluído |
| Selecionado, informação, link, ação secundária | `--duo-blue` | Opção selecionada, links, botão secundário |
| Erro, vidas, perigo | `--duo-red` | Resposta errada, corações |
| Sequência, energia, urgência amigável | `--duo-orange` | Chama/ícone da sequência |
| XP, conquistas, ouro, concluído "lendário" | `--duo-yellow` | XP, troféus, níveis dourados |
| Premium, especial | `--duo-purple` (+ iridescente) | Assinatura, itens raros |
| Neutro, bloqueado, desabilitado | `--duo-gray-*` | Nós bloqueados, botões desabilitados |

## Antipadrões (o que NÃO é Duo Style)
- Sombras difusas (`0 10px 30px rgba…`), glassmorphism, neumorphism, texturas.
- Gradientes na UI comum (só em premium, com moderação).
- Preto puro em textos; bordas de 1px; cantos retos ou de 2–4px em botões.
- Fontes finas, serifadas ou condensadas; títulos abaixo de 700.
- Ícones de linha fina estilo outline 1,5px; ilustrações detalhadas/realistas; fotos como elemento principal.
- Várias ações primárias competindo na mesma tela.
- Tom corporativo, frio ou que envergonha ("Você falhou").
- Gamificação que pune pesadamente; pressão que impede começar.

## Propriedade intelectual
Replicar estilo é permitido; copiar marca não. **Proibido**:
- Nome "Duolingo"/"Duo", a coruja verde (ou qualquer coruja verde parecida), o logotipo.
- Personagens deles (Lily, Zari, Bea, Eddy, Junior, Oscar, Lin, Vikram, Lucy, Falstaff), visuais ou nomes.
- Fontes proprietárias **Feather Bold** e **Duolingo Sans**; ilustrações, ícones, sons, animações Rive, textos.
- Nomes de recursos com a marca deles ("Super Duolingo", "Duolingo Max", "Streak Society", "Diamond League"
  com o mesmo visual). Crie nomes próprios.
**Crie**: mascote original (outro animal, objeto ou criatura), elenco próprio, nomes de moedas e ligas,
cor-herói própria (ver `02-tokens.md#escolhendo-a-cor-heroi`).
