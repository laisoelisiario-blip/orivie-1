# Orivie — Reels publicitário (30 s, 1080×1920)

Vídeo final: `output/orivie_reels_30s.mp4` · Legenda da publicação: `output/legenda_publicacao.txt` · Legendas: `output/orivie_reels_30s.srt`

## Como é feito
| Etapa | Script | Resultado |
|---|---|---|
| Narração (voz feminina pt-BR, modelo Kokoro `pf_dora`, offline) | `scripts/tts.py <pasta_modelo>` | `build/vo_*.wav` |
| Legendas alinhadas às pausas da fala | `scripts/timeline.py` | `build/timeline.json` |
| Trilha original (piano + pad, crescendo) | `scripts/music.py` | `build/music.wav` |
| Cenas, textos e legendas, quadro a quadro | `node scripts/render.cjs` (`scripts/reel.html`) | `build/frames/` |
| Mixagem com ducking, grão de filme, color grade, MP4 | `scripts/assemble.py` | `output/` |

Texto e tempos da narração: `scripts/narration.json`.

## Telas do app e marca
A cena 4 usa capturas reais do app publicado (iPhone), em `assets/app-real/`: Hoje, Combina, Checklist,
Board, Aprender e Eu — com a barra do Safari removida e o e-mail desfocado na tela "Eu".
O encerramento usa o logo oficial `marca/orivie-logo-horizontal.png` e as fontes/cores do app
(Playfair Display, DM Sans, creme #F7F3EE, terra #D9A08B, sálvia #A8B8A0).

## Trocar pelas imagens reais da campanha
As cenas 1, 2, 3 e 5 usam ambientações cinematográficas (luz de janela, espelho, diário/café, sol).
Para usar fotos/filmagem da atriz, coloque `assets/scenes/scene1.jpg`, `scene2.jpg`, `scene3.jpg`, `scene5.jpg`
e rode de novo `node scripts/render.cjs` e `python3 scripts/assemble.py`.

Modelo de voz: `kokoro-v1.0.onnx` e `voices-v1.0.bin` (github.com/thewh1teagle/kokoro-onnx, releases `model-files-v1.0`).
