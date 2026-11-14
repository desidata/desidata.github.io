"""Build the Worker. Add files to datasets/ and catalog entries with id, title, filename."""
from pathlib import Path
import base64, json, mimetypes
root = Path(__file__).resolve().parent
assets = {}
def encode(path):
    return [mimetypes.guess_type(path.name)[0] or 'application/octet-stream',
            base64.b64encode(path.read_bytes()).decode()]
for path in (root/'dist').iterdir():
    if path.is_file():
        assets['/'+path.name] = encode(path)
files = {}
for entry in json.loads((root/'datasets/catalog.json').read_text()):
    filename = entry['filename']
    if Path(filename).name != filename or not entry['id'].isascii() or not entry['id'].isalnum() or entry['id'] in files:
        raise ValueError('Use a unique alphanumeric dataset ID and a plain filename.')
    files[entry['id']] = dict(entry, content=encode(root/'datasets'/filename))
output = root/'dist/server/index.js'
output.parent.mkdir(exist_ok=True)
output.write_text('const assets = '+json.dumps(assets)+';\nconst files = '+json.dumps(files)+';\n'+(root/'worker.js').read_text())
