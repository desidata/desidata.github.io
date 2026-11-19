#!/usr/bin/env python3
"""Generate maps/<slug>.html and maps.js from maps_metadata.csv.
Run from the repo root: python3 build_maps.py

datasets column uses | to separate multiple files, e.g.:
  child_marriage.csv|child_marriage_archive.zip
"""
import csv, html, json, re, sys
from pathlib import Path
from urllib.parse import quote as urlquote

ROOT = Path(__file__).resolve().parent

PAGE_TEMPLATE = """\
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>TITLE | DesiData</title>
  <meta name="description" content="DESCRIPTION">
  <meta property="og:title" content="TITLE | DesiData">
  <meta property="og:description" content="DESCRIPTION">
  <meta property="og:image" content="https://desidata.github.io/maps_images/IMAGE">
  <meta property="og:url" content="https://desidata.github.io/maps/SLUG.html">
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <header>
    <a class="logo" href="../index.html"><img src="../LOGO.jpg" alt="">Desi<span>Data</span></a>
    <nav aria-label="Main"><a href="../index.html#collection">Map gallery</a><a href="../data.html">Data</a><a href="../about.html">About me</a><a class="follow" aria-label="Follow on Instagram" href="https://www.instagram.com/desidata.info/"><span class="label-full">Follow on Instagram</span><span class="label-short">Instagram</span></a></nav>
  </header>
  <main class="info-page map-page">
    <h1>TITLE</h1>
PERIOD_LINE    <figure class="map-figure">
      <img src="../maps_images/IMAGE" alt="ALT">
    </figure>
    <p class="intro-copy map-takeaway">TAKEAWAY</p>
META_BLOCK  </main>
  <footer><strong>Follow the next map.</strong><a href="https://www.instagram.com/desidata.info/">@desidata.info</a></footer>
</body>
</html>
"""

def e(s):
    return html.escape(s, quote=True)

def build_meta_block(source_name, source_url, datasets_raw, image):
    source_name  = (source_name  or '').strip()
    source_url   = (source_url   or '').strip()
    datasets_raw = (datasets_raw or '').strip()
    rows = []
    if source_name:
        link = f'<a href="{e(source_url)}">{e(source_name)}</a>' if source_url else e(source_name)
        rows.append(f'      <div>\n        <dt>Source</dt>\n        <dd>{link}</dd>\n      </div>')
    for fname in (f.strip() for f in datasets_raw.split('|') if f.strip()):
        rows.append(
            f'      <div>\n        <dt>Download data</dt>\n'
            f'        <dd><a href="../datasets/{urlquote(fname)}" download="{e(fname)}">{e(fname)} ↓</a></dd>\n      </div>'
        )
    rows.append(
        f'      <div>\n        <dt>Download map</dt>\n'
        f'        <dd><a href="../maps_images/{urlquote(image)}" download="{e(image)}">{e(image)} ↓</a></dd>\n      </div>'
    )
    return '    <dl class="sources map-meta">\n' + '\n'.join(rows) + '\n    </dl>\n'

def build_js_entry(row):
    d = {}
    d['topic'] = row['topic']
    if row['question'].strip():
        d['question'] = row['question']
    if row['teaser'].strip():
        d['teaser'] = row['teaser']
    d['title'] = row['title']
    d['image'] = 'maps_images/' + row['image']
    d['alt']   = row['alt']
    d['post']  = row['post']
    d['page']  = f"maps/{row['slug']}.html"
    lines = ['  {']
    for k, v in d.items():
        lines.append(f'    {k}: {json.dumps(v, ensure_ascii=False)},')
    lines.append('  }')
    return '\n'.join(lines)

def extract_js_logic(maps_js_text):
    """Return everything in maps.js after the closing ]; of the maps array."""
    m = re.search(r'\];\n', maps_js_text)
    if not m:
        sys.exit('ERROR: could not find end of maps array in maps.js')
    return maps_js_text[m.end():]

def main():
    csv_path  = ROOT / 'maps_metadata.csv'
    maps_dir  = ROOT / 'maps'
    maps_dir.mkdir(exist_ok=True)

    js_logic = extract_js_logic((ROOT / 'maps.js').read_text(encoding='utf-8'))

    js_entries = []
    errors = False

    with open(csv_path, newline='', encoding='utf-8') as f:
        for row in csv.DictReader(f):
            slug  = row['slug'].strip()
            image = row['image'].strip()

            img_path = ROOT / 'maps_images' / image
            if not img_path.exists():
                print(f'WARNING: image not found, skipping page for {slug}: maps_images/{image}')
                js_entries.append(build_js_entry(row))
                errors = True
                continue

            # Build period line
            period = (row.get('period') or '').strip()
            period_line = f'    <p class="map-period">{e(period)}</p>\n' if period else ''

            # Build takeaway
            takeaway_raw = (row.get('takeaway') or '').strip()
            takeaway     = e(takeaway_raw) if takeaway_raw else '[TODO: add 2–3 line takeaway]'
            description  = e(takeaway_raw.split('.')[0] + '.') if takeaway_raw else '[TODO: add description]'

            meta_block = build_meta_block(row['source_name'], row['source_url'], row['datasets'], image)

            page = (PAGE_TEMPLATE
                .replace('TITLE',       e(row['title']))
                .replace('DESCRIPTION', description)
                .replace('IMAGE',       image)
                .replace('SLUG',        slug)
                .replace('ALT',         e(row['alt']))
                .replace('PERIOD_LINE', period_line)
                .replace('TAKEAWAY',    takeaway)
                .replace('META_BLOCK',  meta_block))

            out = maps_dir / f'{slug}.html'
            out.write_text(page, encoding='utf-8')
            print(f'  wrote {out.relative_to(ROOT)}')

            js_entries.append(build_js_entry(row))

    new_maps_js = ('const maps = [\n'
                   + ',\n'.join(js_entries)
                   + '\n];\n'
                   + js_logic)
    (ROOT / 'maps.js').write_text(new_maps_js, encoding='utf-8')
    print(f'  wrote maps.js  ({len(js_entries)} entries)')

    if errors:
        sys.exit(1)

if __name__ == '__main__':
    main()
