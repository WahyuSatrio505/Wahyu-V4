import requests
from bs4 import BeautifulSoup
import json

# URL live webmu (satu file index.html)
url = 'https://wahyusatrio505.github.io/Wahyu-V4/'  # Ganti sama URL aslimu setelah deploy

def scrape_page(url):
    print(f"Mencoba akses URL: {url}")
    try:
        response = requests.get(url)
        response.raise_for_status()
        print("Sukses akses URL!")
        soup = BeautifulSoup(response.text, 'html.parser')
        print("Sukses parse HTML!")
        data = {
            'home': {
                'title': soup.title.string if soup.title else 'No Title',
                'content': ' '.join([p.get_text() for p in soup.select('#home p, #home h2, #home h3, #home li')])
            },
            'about': {
                'content': ' '.join([p.get_text() for p in soup.select('#about p, #about h2, #about h3, #about li')])
            },
            'skills': {
                'content': ' '.join([p.get_text() for p in soup.select('#skills p, #skills h2, #skills h3, #skills li')])
            },
            'projects': {
                'content': ' '.join([p.get_text() for p in soup.select('#projects p, #projects h2, #projects h3, #projects li')])
            },
            'certificates': {
                'content': ' '.join([p.get_text() for p in soup.select('#certificates p, #certificates h2, #certificates h3, #certificates li')])
            },
            'blogs': {
                'content': ' '.join([p.get_text() for p in soup.select('#blogs p, #blogs h2, #blogs h3, #blogs li')])
            },
            'learning': {
                'content': ' '.join([p.get_text() for p in soup.select('#learning p, #learning h2, #learning h3, #learning li')])
            },
            'contact': {
                'content': ' '.join([p.get_text() for p in soup.select('#contact p, #contact h2, #contact h3, #contact li')])
            }
        }
        print("Sukses kumpulin data!")
        return data
    except requests.RequestException as e:
        print(f"Error saat akses URL: {e}")
        return None

# Kumpulin data
print("Memulai proses scrape...")
pages = scrape_page(url)

if pages:
    print("Mencoba simpan data ke file...")
    with open('website_data.json', 'w', encoding='utf-8') as f:
        json.dump(pages, f, ensure_ascii=False, indent=4)
    print("Selesai belajar webmu! Data disimpan di website_data.json")
else:
    print("Gagal menyimpan data karena error sebelumnya.")
