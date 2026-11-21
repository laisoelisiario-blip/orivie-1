// Renderiza o reel quadro a quadro (1080x1920, 30 fps) com Playwright.
// Uso: node scripts/render.js [--stills 2,8,14,...]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), FPS = 30, DUR = 30;
const tl = JSON.parse(fs.readFileSync(path.join(ROOT, 'build/timeline.json'), 'utf8'));
tl.captions[tl.captions.length - 1].last = true;
// Mídia própria opcional: assets/scenes/scene1.jpg ... scene5.jpg substitui a cena ilustrativa
const media = {};
for (let n = 1; n <= 5; n++) for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
  const f = path.join(ROOT, `assets/scenes/scene${n}.${ext}`);
  if (fs.existsSync(f)) { media[n] = 'file://' + f; break; }
}
(async () => {
  const args = process.argv.slice(2);
  const stills = args[0] === '--stills' ? args[1].split(',').map(Number) : null;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.addInitScript(([t, m]) => { window.TIMELINE = t; window.MEDIA = m; }, [tl, media]);
  await page.goto('file://' + path.join(ROOT, 'scripts/reel.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const outDir = path.join(ROOT, stills ? 'build/stills' : 'build/frames');
  fs.mkdirSync(outDir, { recursive: true });
  const times = stills || Array.from({ length: FPS * DUR }, (_, i) => i / FPS);
  for (let i = 0; i < times.length; i++) {
    await page.evaluate(t => window.render(t), times[i]);
    const name = stills ? `t${String(times[i]).padStart(5, '0')}.jpg` : `f${String(i).padStart(4, '0')}.jpg`;
    await page.screenshot({ path: path.join(outDir, name), type: 'jpeg', quality: 94 });
    if (!stills && i % 150 === 0) console.log('frame', i);
  }
  await browser.close();
})();
