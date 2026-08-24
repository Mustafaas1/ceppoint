/* CepPoint - kucuk arayuz betikleri (bagimliliksiz) */
(function () {
  'use strict';

  /* Mobil menu ------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // menude bir baglantiya tiklaninca kapat
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    // ESC ile kapat
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* Not: kaydirma animasyonu tamamen CSS ile yapiliyor
     (style.css icindeki .reveal / animation-timeline blogu). */

  /* Iletisim formu -> WhatsApp mesaji --------------------------
     Sunucu gerekmesin diye form, girilen bilgileri hazir bir
     WhatsApp mesajina cevirir. Gercek bir e-posta formu istenirse
     README icindeki nota bakin. */
  var form = document.getElementById('randevu-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var lines = [
        'Merhaba, randevu/fiyat bilgisi almak istiyorum.',
        '',
        'Ad Soyad: ' + (d.get('ad') || '-'),
        'Telefon: ' + (d.get('telefon') || '-'),
        'Cihaz: ' + (d.get('cihaz') || '-'),
        'Islem: ' + (d.get('islem') || '-'),
        'Not: ' + (d.get('mesaj') || '-')
      ];
      var url = 'https://wa.me/905454697979?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }

  /* Footer yili ------------------------------------------------ */
  var y = document.getElementById('yil');
  if (y) { y.textContent = new Date().getFullYear(); }
})();
