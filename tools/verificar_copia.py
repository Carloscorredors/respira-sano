from pathlib import Path
import json,hashlib
root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/'documentacion/MANIFEST_APLICACION.json').read_text(encoding='utf-8'))['files']
errors=[]
for rel,item in manifest.items():
    p=root/'respira-sano-interactiva'/rel
    if not p.is_file(): errors.append(rel+' ausente'); continue
    h=hashlib.sha256()
    with p.open('rb') as f:
        for block in iter(lambda:f.read(1024*1024),b''):h.update(block)
    if h.hexdigest()!=item['sha256']:errors.append(rel+' distinto')
print(json.dumps({'verified':not errors,'expected_files':len(manifest),'errors':errors},ensure_ascii=False))
raise SystemExit(1 if errors else 0)
