# 01 — Princípios e filosofia

## A essência em uma frase
**"Uma moldura neutra para momentos vívidos."** A interface é discreta, monocromática e previsível
para que fotos, vídeos e pessoas sejam o centro. A marca aparece em poucos pontos de alto impacto
(o gradiente) e no movimento (gestos fluidos, animações curtas e satisfatórias).

## Pilares

| Pilar | Significado | Na interface |
|---|---|---|
| **Content-first** | A UI recua, o conteúdo avança | Mídia full-bleed, chrome preto/branco, ícones de traço |
| **Familiaridade** | Padrões que o usuário já conhece | Tab bar de 5 abas, stories no topo, grade de perfil 3 colunas |
| **Expressão** | Ferramentas para o usuário se expressar | Criação de stories com texto, stickers, filtros |
| **Conexão** | Pessoas acima de tudo | Avatares em todo lugar, curtidas, menções, DMs |
| **Fluidez** | Tudo responde ao toque instantaneamente | Gestos, transições contínuas, feedback otimista |
| **Consistência** | Um sistema só em todas as plataformas | Mesmos tokens light/dark, mesma iconografia |

## A identidade visual da marca (refresh de 2022)
- **Gradiente**: o elemento mais reconhecível da marca. Em 2022 foi redesenhado para parecer
  "iluminado por dentro" (mais vivo, com transições suaves entre amarelo, laranja, rosa/magenta,
  roxo e azul). É usado como **acento**, não como fundo de UI.
- **Glifo**: câmera simplificada (quadrado arredondado + círculo + ponto). *Proibido replicar.*
- **Tipografia de marca**: Instagram Sans (Regular, Headline, Condensed), geométrica com
  detalhes arredondados e alfabetos globais. Usada em marketing, stories e marca, **não** no corpo da UI,
  que usa fontes do sistema. *Proprietária: usar substitutas (ver `02-tokens.md`).*
- **Composição de marketing**: fotos reais de pessoas, cortes ousados, texto grande e curto,
  blocos de cor do gradiente, recortes e camadas tipo story/sticker.

## Hierarquia de cor por significado

| Significado | Cor | Exemplo |
|---|---|---|
| Conteúdo / estrutura | Preto, branco, cinzas | Textos, ícones, fundos |
| Ação primária, links de ação, verificado | Azul `#0095F6` | "Seguir", "Entrar", "Publicar", selo |
| Curtida / erro / ao vivo / notificação | Vermelho `#FF3040` / `#ED4956` | Coração preenchido, badge, erro de formulário |
| Sucesso | Verde `#58C322` | Confirmações discretas |
| Marca / novidade / criação | Gradiente | Anel de stories, logo, splash, botão "AO VIVO" |
| Amigos próximos | Verde `#1CD14F` | Anel e selo de "melhores amigos" |

## Antipadrões (o que NÃO é Insta Style)
- Fundos coloridos ou gradientes em telas comuns; cards com sombra; neumorphism; glassmorphism pesado.
- Muitas cores de ação; botões com cores diferentes por contexto.
- Cantos muito arredondados em tudo (raio grande é só para sheets, modais e alguns cards).
- Ícones preenchidos e coloridos na navegação; ícones ilustrados ou com várias cores.
- Mídia com margens e bordas no feed mobile; molduras decorativas ao redor de fotos.
- Texto em CAIXA ALTA em botões; fontes decorativas na interface; títulos enormes em telas de uso.
- Rótulos de texto embaixo dos ícones da tab bar.
- Excesso de confirmações e modais; interfaces que bloqueiam o conteúdo.

## Propriedade intelectual
Replicar estilo é permitido; copiar marca não. Proibido:
- Nome "Instagram"/"Insta" na marca do produto, o glifo de câmera ou qualquer quadrado
  arredondado com círculo no centro como logo, o logotipo manuscrito.
- A fonte Instagram Sans, ícones extraídos do app, stickers, filtros, sons ou animações deles.
- Reproduzir o gradiente exato **como logo**. Para o anel de stories e acentos, use um gradiente
  **próprio** (pode seguir a mesma técnica: multicor, quente → frio, vibrante). Ver `02-tokens.md`.
- Nomes de recursos com marca ("Reels", "Stories" com o mesmo nome e visual idêntico em contexto
  comercial). Prefira nomes próprios (ex.: Orivie → "Momentos", "Clipes", "Reflexões").

### Regras oficiais de uso da marca (Meta Brand Resource Center)
Fonte: `meta.com/brand/resources/instagram/instagram-brand/` (lida em 20/11/2026). A página trata de
uso da marca, não de design de interface. O que se aplica a este projeto:
- **Não combine "Insta" ou "gram" com a sua marca** (nome do app, recursos, domínio, hashtag).
  O nome interno desta skill (`insta-style`) nunca deve aparecer na interface do produto.
- Não combine nenhuma parte da marca Instagram com nome de empresa, outras marcas ou termos genéricos.
- Não dê a entender parceria, patrocínio ou endosso do Instagram.
- Se o produto integrar com o Instagram (ex.: "compartilhar no Instagram"), use o nome só de forma
  descritiva ("para Instagram", "no Instagram"), com "I" maiúsculo, mesma fonte e tamanho do texto ao
  redor, sem traduzir nem abreviar, e use apenas os logos oficiais do pacote de marca, sem alterá-los.
- Capturas de tela da interface do Instagram em publicidade/vídeo exigem permissão da Meta.
- Não use nem registre marcas da Meta (ou nomes confusamente parecidos) como marca, nome de
  empresa, nome de usuário ou domínio.
