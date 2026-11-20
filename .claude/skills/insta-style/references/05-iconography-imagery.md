# 05 — Iconografia, imagens e marca própria

## Ícones de interface
- **Estilo**: linha (outline) de traço uniforme ~2px em grade de 24px, terminações e junções
  arredondadas, formas geométricas simples, cantos levemente arredondados.
- **Ativo/selecionado = preenchido**: Início (casa), curtida (coração vermelho), salvo (marcador),
  abas da tab bar. Mesmo desenho, só que sólido.
- Cor única: `--ig-text` (preto/branco). Exceções: coração curtido `--ig-red`, verificado azul.
- Sobre mídia: ícones brancos com sombra sutil (`drop-shadow(0 0 2px rgba(0,0,0,.4))`).
- Conjunto mínimo: casa, lupa, + em quadrado arredondado, vídeo (claquete arredondada),
  avião de papel, coração, balão de comentário, marcador, "…", câmera, sino/coração de atividade,
  engrenagem, ☰, voltar ‹, ×, cadeado, globo, nota musical, pin de local, pessoas (marcados), grade.
- **Bibliotecas próximas** (livres) para não copiar os ícones originais: **Phosphor** (pesos
  "regular" e "fill" — o melhor encaixe), Tabler, Lucide (aumentar `stroke-width` para 2). Mantenha
  uma só biblioteca no produto.
- Proibido: ícones coloridos/ilustrados na navegação, ícones duotone, misturar estilos.

## Fotografia e mídia
- A mídia do usuário é o herói. Mostre-a grande, sem molduras, sem bordas decorativas.
- Placeholders e conteúdo de demonstração: fotos reais, luz natural, pessoas autênticas, cores
  vibrantes. Evite banco de imagens com cara corporativa. Em protótipos, use serviços de imagem
  livres (ex.: Unsplash/Picsum) com proporções corretas (4:5, 1:1, 9:16).
- Texto sobre mídia: branco, com gradiente escuro de base ou sombra; nunca caixa colorida opaca grande.
- Filtros: o estilo histórico tem filtros "analógicos" (contraste, calor, vinheta). Opcional.

## Ilustração
- Usada pouco: estados vazios, onboarding, telas de permissão. Estilo: formas planas simples,
  traço igual ao dos ícones, ou ilustrações coloridas com o **gradiente da marca** e formas orgânicas.
- Marketing: colagens de fotos recortadas, stickers, blocos de cor do gradiente e tipografia grande.

## Construindo a marca própria no estilo
1. **Glifo**: forma geométrica simples, contorno arredondado com traço grosso, preenchida com o
   gradiente da marca (ou branco sobre gradiente para o ícone do app). Não usar câmera/quadrado com círculo.
2. **Wordmark**: um nome curto, em script próprio ou na fonte de marca 700–800, cor `--ig-text`
   no header (o gradiente fica no glifo).
3. **Ícone do app**: fundo com o gradiente da marca + glifo branco, raio padrão da plataforma.
4. **Selo de verificado/premium próprio**: forma diferente (ex.: estrela arredondada) com a cor da marca.
5. **Stickers e emojis de reação**: emojis nativos do sistema; stickers próprios em estilo plano.

## Acessibilidade de imagens
- `alt` gerado/editável em todas as mídias ("Foto de ana: pôr do sol na praia").
- Ícones tocáveis com `aria-label` ("Curtir", "Comentar", "Compartilhar", "Salvar").
- Nunca dependa só da cor: coração curtido também muda de traço para preenchido.
