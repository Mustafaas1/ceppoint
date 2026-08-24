# JetCP CepPoint — Web Sitesi

Statik (sunucusuz) bir tanıtım sitesi. Framework, build adımı ve dış kaynak (Google Fonts,
CDN, analytics) yok — dosyaları bir hosting'e kopyalamak yeterli.

## Dosyalar

```
index.html         Ana sayfa (hero, adımlar, servisler, süre tablosu, aksesuar, SSS)
servisler.html     12 hizmetin detayı + süre/garanti tablosu
aksesuar.html      Aksesuar kategorileri (her kartın kendi çapası var: #kilif, #sarj ...)
blog.html          9 yazı (ana sayfadaki SSS'lerin uzun cevapları + pratik konular)
hakkimizda.html    Çalışma prensibi, parça politikası, garanti kapsamı
iletisim.html      İletişim bilgileri, harita alanı, randevu formu
assets/css/style.css   Tek stil dosyası (numaralı bölümler halinde)
assets/js/main.js      Mobil menü, form → WhatsApp, footer yılı
                       (kaydırma animasyonu JS'te değil, CSS'te)
assets/img/logo.svg    Yatay logo (tabela logosunun sadeleştirilmiş hâli)
assets/img/favicon.svg Sekme ikonu
```

## Doldurulması gereken yerler

Aşağıdakiler bilinmediği için **boş bırakıldı**, uydurulmadı:

| Ne | Nerede |
|---|---|
| E-posta adresi | `iletisim.html` |
| Alan adı | `index.html` içindeki `<link rel="canonical">` |
| Çalışma saatleri | Doğruysa dokunmayın; değilse topbar + footer + `iletisim.html` |

Telefon numarası tabeladan alındı: **0545 469 79 79** (`tel:+905454697979`, `wa.me/905454697979`).
Değişirse hepsini bulmak için: `grep -r "905454697979" .`

## Adres ve harita

Adres, Google Haritalar kaydından alındı:
**Esentepe Mah., Büyükdere Cd. No: 171, Metrocity AVM, Kapı No: 2, 34260 Şişli / İstanbul**

Üç yerde geçiyor: tüm sayfaların footer'ı, `iletisim.html` "Adres" kutusu ve
`index.html` içindeki JSON-LD yapısal verisi.

`iletisim.html` içindeki harita, Google Haritalar'ın gömme (embed) adresini
kullanan bir `<iframe>`. API anahtarı gerekmiyor. **Not:** bu, sitenin tek
üçüncü taraf isteği; harita yüklendiğinde ziyaretçinin tarayıcısı Google'a
bağlanır ve Google çerez yerleştirebilir. KVKK aydınlatma metni eklerken bunu
belirtmek gerekir. İstenirse harita "tıklayınca yüklenen" hâle getirilebilir.

## Blog

`blog.html` tek sayfada dokuz yazı barındırıyor; ayrı dosyalara bölünmedi çünkü
yazılar kısa ve tek sayfada arama motoru açısından daha güçlü duruyor. Üstteki
kart listesi sayfa içi çapalara gidiyor (`#sure`, `#fiyat`, `#parca`, `#garanti`,
`#veri`, `#sivi`, `#batarya`, `#sarj`, `#randevu`).

İlk beş yazı, ana sayfadaki sık sorulan soruların uzun cevapları; kalan dördü
(sıvı teması, pil, şarj, randevu) pratik konular. Ana sayfadaki SSS bölümünün
altına bloga giden bir buton eklendi.

Yeni yazı eklemek için mevcut bir `<article class="card reveal" id="...">`
bloğunu kopyalayıp üstteki kart listesine de bir bağlantı ekleyin.

## Randevu formu nasıl çalışıyor?

`iletisim.html` içindeki form sunucuya bir şey göndermez; girilen bilgileri hazır bir
WhatsApp mesajına çevirip WhatsApp'ı açar. Böylece hosting'de PHP/backend gerekmez ve
gelen talep doğrudan telefona düşer.

Gerçek bir e-posta formu istenirse Formspree veya Netlify Forms gibi bir servis
eklenebilir (bu durumda KVKK aydınlatma metni de gerekir).

## Renkler

Tabeladaki renkler esas alındı: siyaha yakın zemin + beyaz + parlak yeşil.
Yeşil; birincil butonlarda (üstünde siyah yazı), logo noktasında, etiketlerde,
aktif menü çizgisinde ve tik işaretlerinde kullanılıyor. Üst şerit, footer ve
alt bant antrasit. Hepsi `assets/css/style.css` en üstteki `:root` bloğunda:

- `--dark: #17191d` — başlık şeridi, footer, koyu bant
- `--dark-2: #0f1113` — üst şerit ve footer zemini
- `--lime: #4fd420` — tabeladaki parlak yeşil (vurgu)
- `--lime-ink: #3a8f14` — beyaz üzerinde okunur yeşil (yazı için)
- `--ink: #15171b` — metin
- Zemin beyaz + `--bg-soft: #f5f6f7` — açık ve ferah tema

Tek bir satırı değiştirerek tüm siteyi başka bir tona çevirebilirsiniz.
Butonları tekrar koyu yapmak isterseniz HTML'de `btn-primary` yerine `btn-dark`
yazmanız yeterli.

## Yazı boyutları

Sayfa dosyalarında tek tek `font-size` yazılmıyor; hepsi `:root` içindeki dört
değere bağlı: `--fs-xs`, `--fs-sm`, `--fs-md`, `--fs-lg`. Başlıklar `h1`-`h4`,
giriş cümleleri `.lead`, küçük notlar `.t-sm` / `.t-xs` sınıflarıyla yazılıyor.
Yazı ağırlığı olarak sadece 400/600/700 kullanılıyor — sistem yazı tipleri ara
değerleri düzgün basmıyor ve yazılar birbirine uymuyor gibi görünüyordu.

## Logo

Sitede kullanılan logo, gönderdiğiniz 3D render'ın arka planı temizlenmiş hâli.
Siyah zemin taşma (flood fill) yöntemiyle silindi. Eşik değeri, render'ın yumuşak
dış gölgesi de silinecek şekilde yüksek tutuldu (72) — böylece kenarlar keskin
çıkıyor; yarı saydam kenar bandı toplam pikselin yalnızca %1,6'sı. 420 piksel
yüksekliğe indirilip hafif netlik filtresi uygulandı (ekranda 40 piksel
gösteriliyor, yüksek çözünürlüklü ekranlarda da net kalsın diye fazlası duruyor).

- `assets/img/logo3d.png` — orijinal gümüş sürüm. **Başlıkta, footer'da** ve
  sosyal medya paylaşım görseli olarak kullanılıyor. Gümüş logo beyaz zeminde
  okunmadığı için (kontrast 1,26) başlık şeridi koyu yapıldı; koyu zeminde
  kontrast 10,9.
- `assets/img/logo3d-dark.png` — koyu sürüm, şu an kullanılmıyor. Tonlar
  düz karartılmadı; logonun gerçek parlaklık aralığı (70-245) koyu bir aralığa
  (6-84) yeniden yayıldı, böylece gövde siyaha yakın kalırken 3D kenar hatları
  ve soket halkası seçilebiliyor. Beyazla kontrast oranı 3,7.
- `assets/img/favicon.svg` — arka planı yok. İçinde iki sürüm de gömülü:
  tarayıcı açık temadaysa koyu logo, koyu temadaysa gümüş logo gösteriliyor
  (`prefers-color-scheme` sorgusu).
- `assets/img/logo3d-orijinal.jpg` — gönderdiğiniz dosyanın kendisi (arşiv).

Logonun yanındaki "JETCP" yazısı görsel değil, metin (`.brand-name`, "JET" yeşil
+ "CP" siyah); altında "CepPoint". Böylece her ekranda net çıkıyor ve arama
motorları okuyabiliyor.

Artık kullanılmayan eski dosyalar (silebilirsiniz): `logo.svg`, `logo.png`,
`logo_trans.png`, `logo-mark.png`, `logo-mark-dark.png`, `logo-mark.svg`,
`logo-mark-light.svg`.

## Yayına alma

Herhangi bir statik hosting yeterli: Netlify, Cloudflare Pages, GitHub Pages, Vercel
veya klasik cPanel `public_html`. Dosyaları olduğu gibi yükleyin.

Yerelde denemek için klasörde:

```bash
python -m http.server 8000
```
