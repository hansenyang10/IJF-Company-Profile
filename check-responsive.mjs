import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('public/check', { recursive: true });

const PAGES = ['', 'about', 'services', 'insights', 'career', 'contact'];

async function capture(ctx, slug, label) {
  const page = await ctx.newPage();
  const url = `http://localhost:4200/${slug}`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `public/check/${label}-${slug || 'home'}-viewport.png` });
  await page.close();
}

const browser = await chromium.launch();

// Mobile 390px — all pages
const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
for (const slug of PAGES) await capture(mCtx, slug, 'mobile');
await mCtx.close();

// iPad 768px — all pages
const tCtx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
for (const slug of PAGES) await capture(tCtx, slug, 'ipad');
await tCtx.close();

await browser.close();
console.log('Screenshots saved to public/check/');
