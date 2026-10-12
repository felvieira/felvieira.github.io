#!/usr/bin/env python3
"""Atualiza data/*.json (YouTube + blog) e, com --screenshots, as capturas dos produtos."""
import json, re, sys, os, subprocess, urllib.request, html
from xml.etree import ElementTree as ET
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = {"User-Agent": "felvieira.github.io-updater"}
def get(url, headers=None):
    h = dict(UA); h.update(headers or {})
    with urllib.request.urlopen(urllib.request.Request(url, headers=h), timeout=30) as r:
        return r.read()
def save(name, data):
    p = os.path.join(ROOT, "data", name)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2); f.write("\n")

def youtube():
    ns = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015", "m": "http://search.yahoo.com/mrss/"}
    x = ET.fromstring(get("https://www.youtube.com/feeds/videos.xml?channel_id=UClX8duF1EEuwHImhTigFHEA"))
    out = []
    for e in x.findall("a:entry", ns)[:8]:
        vid = e.find("yt:videoId", ns).text
        out.append({"id": vid, "title": e.find("a:title", ns).text, "published": e.find("a:published", ns).text[:10],
                    "url": f"https://www.youtube.com/watch?v={vid}", "thumb": f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg"})
    save("youtube.json", out)

def blog():
    gh = {"Accept": "application/vnd.github+json"}
    if os.environ.get("GITHUB_TOKEN"): gh["Authorization"] = "Bearer " + os.environ["GITHUB_TOKEN"]
    files = json.loads(get("https://api.github.com/repos/felvieira/blog/contents/posts", gh))
    names = sorted([f["name"] for f in files if re.match(r"^\d{4}-\d\d-\d\d-.*\.html$", f["name"])], reverse=True)[:6]
    out = []
    for n in names:
        raw = get(f"https://raw.githubusercontent.com/felvieira/blog/main/posts/{n}").decode("utf-8", "replace")
        t = re.search(r"<title>(.*?)</title>", raw, re.S)
        title = html.unescape(t.group(1)).split(" — ")[0].strip() if t else n
        img = re.search(r'<meta property="og:image" content="([^"]+)"', raw)
        desc = re.search(r'<meta name="description" content="([^"]*)"', raw)
        out.append({"title": title, "date": n[:10], "url": f"https://felvieira.github.io/blog/posts/{n}",
                    "cover": img.group(1) if img else None, "excerpt": html.unescape(desc.group(1)) if desc else ""})
    save("blog.json", out)

ONLY = None
PRODUCTS = {"memra": "https://memrabiblia.org/", "cadeodinheiro": "https://www.cadeodinheiro.online/",
            "visalab": "https://visalab.com.br/", "posterflix": "https://posterflix.net/", "mentalist": "https://mentalistai.com.br/"}
def screenshots():
    from PIL import Image
    chrome = next(c for c in ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"] if subprocess.call(["which", c], stdout=subprocess.DEVNULL) == 0)
    for slug, url in PRODUCTS.items():
        png = f"/tmp/{slug}.png"
        try:
            base = [chrome, "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--mute-audio",
                    "--window-size=1280,800", f"--screenshot={png}"]
            try:
                subprocess.run(base + ["--virtual-time-budget=12000", url], timeout=60, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            except subprocess.TimeoutExpired:  # sites que nunca ficam "idle": tempo real
                subprocess.run(base + ["--timeout=15000", url], timeout=60, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            im = Image.open(png).convert("RGB"); im.thumbnail((960, 600))
            im.save(os.path.join(ROOT, "img/products", f"{slug}.webp"), "WEBP", quality=78, method=6)
            print("ok", slug)
        except Exception as ex:
            print("falhou", slug, ex, file=sys.stderr)  # mantém a imagem anterior

if __name__ == "__main__":
    for fn in (youtube, blog):
        try: fn()
        except Exception as ex: print("falhou", fn.__name__, ex, file=sys.stderr)
    if "--screenshots" in sys.argv: screenshots()
