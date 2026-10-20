import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
const root = process.cwd();
for (const locale of ['es', 'en'])
  for (const version of ['clasico', 'editorial']) {
    test(`Static export ${locale}/${version}: semantics, content and local assets`, () => {
      const html = readFileSync(path.join(root, 'out', locale, version, 'index.html'), 'utf8');
      assert.equal((html.match(/<h1\b/g) || []).length, 1);
      assert.ok(html.includes(`<html lang="${locale}"`));
      for (const id of ['inicio', 'contenido', 'sobre-mi', 'experiencia', 'formacion', 'contacto'])
        assert.ok(html.includes(`id="${id}"`));
      for (const name of ['T-SYSTEMS', 'TRAGSATEC', 'MENSOFT', 'ENTEL', 'ARELANCE', 'Sopra'])
        assert.ok(html.includes(name));
      for (const match of html.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/g)) {
        assert.ok(match[0].includes('alt='));
        assert.ok(existsSync(path.join(root, 'public', match[1])));
      }
      assert.equal(html.includes('datocms-assets.com'), false);
      assert.equal(html.includes('http://localhost:3000'), false);
    });
  }
