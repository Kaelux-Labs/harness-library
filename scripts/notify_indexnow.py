"""Notify participating engines of a published content update; never claims indexing.

Protocol: https://www.indexnow.org/documentation
Only the public project URLs are sent. No webmaster credentials are needed.
"""
import argparse
import json
import re
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
from xml.etree import ElementTree as ET
from catalog import ROOT, SITE

ENDPOINT = 'https://api.indexnow.org/indexnow'
KEY_FILE = 'indexnow-key.txt'

def payload(sitemap, key):
    if not re.fullmatch(r'[A-Za-z0-9-]{8,128}', key):
        raise ValueError('Invalid IndexNow ownership key')
    urls = list(dict.fromkeys(el.text for el in ET.fromstring(sitemap).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')))
    if not 1 <= len(urls) <= 10000:
        raise ValueError('IndexNow needs 1–10,000 changed URLs')
    for url in urls:
        parts = urlsplit(url)
        if not url.startswith(SITE) or parts.query or parts.fragment or '%' in parts.path or any(segment in {'.','..'} for segment in parts.path.split('/')):
            raise ValueError('Only canonical URLs inside this project may be notified')
    return {'host':urlsplit(SITE).hostname,'key':key,'keyLocation':SITE+KEY_FILE,'urlList':urls}

def notify(data):
    # The CDN must serve the exact ownership file before notifications are sent.
    with urlopen(data['keyLocation'],timeout=20) as response:
        if response.read(256).decode('utf-8').strip() != data['key']:
            raise ValueError('Published ownership file does not match')
    request = Request(ENDPOINT,data=json.dumps(data).encode('utf-8'),headers={'Content-Type':'application/json; charset=utf-8'},method='POST')
    with urlopen(request,timeout=30) as response:
        status=response.status
    if status not in {200,202}:
        raise ValueError(f'IndexNow returned HTTP {status}')
    state='received; key validation pending' if status==202 else 'received'
    print(f'IndexNow HTTP {status}: {len(data["urlList"])} URLs {state}. This is a crawl notification, not proof of indexing.')

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dry-run',action='store_true',help='Print the public URL list without making a network request')
    args=parser.parse_args()
    data=payload((ROOT/'dist/sitemap.xml').read_text(encoding='utf-8'),(ROOT/'site'/KEY_FILE).read_text(encoding='utf-8').strip())
    if args.dry_run:print('\n'.join(data['urlList']))
    else:notify(data)

if __name__=='__main__':main()
