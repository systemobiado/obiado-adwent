(function () {
  const U = window.AdwentUtil, C = U.C, DNI = window.DNI;
  const qs = new URLSearchParams(location.search);

  /* ---------- dostęp ---------- */
  const podglad = qs.get('podglad') === C.kluczPodgladu;
  if (qs.get('k') === C.kluczDostepu) U.mag.zapisz('obiado-adwent-dostep', '1');
  const maDostep = podglad || U.mag.czytaj('obiado-adwent-dostep') === '1';

  if (!maDostep) {
    document.getElementById('brama').hidden = false;
    U.snieg(document.getElementById('snieg-brama'), 22);
    return;
  }
  document.getElementById('app').hidden = false;
  U.snieg(document.getElementById('snieg'), 26);

  /* ---------- stan ---------- */
  const KLUCZ_OTWARTE = 'obiado-adwent-' + C.rok + '-otwarte';
  const symulowany = podglad ? parseInt(qs.get('dzien'), 10) || 0 : 0;
  const trybTestowy = !!C.odblokujWszystko && !symulowany;      // flaga z config.js
  const wszystkieOdblokowane = (podglad && !symulowany) || trybTestowy;
  const miesiace = ['stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia'];
  const godz = C.godzinaOdblokowania + ':00';
  const dataOkienka = function (n) { return n + ' ' + miesiace[C.miesiac - 1]; };
  const dataZGodzina = function (n) { return dataOkienka(n) + ' o ' + godz; };

  let otwarte = [];
  try { otwarte = JSON.parse(U.mag.czytaj(KLUCZ_OTWARTE) || '[]'); } catch (e) { otwarte = []; }
  const czyOtwarte = function (n) { return otwarte.indexOf(n) !== -1; };
  const zapamietaj = function (n) { if (!czyOtwarte(n)) { otwarte.push(n); U.mag.zapisz(KLUCZ_OTWARTE, JSON.stringify(otwarte)); } };

  const dostepne = function () { return wszystkieOdblokowane ? C.liczbaDni : U.dostepneDo(symulowany); };
  const WARIANTY = ['orange', 'amber', 'coral', 'dark', 'teal'];
  const wariant = function (n) { return n === C.liczbaDni ? 'amber' : WARIANTY[(n * 2 + Math.floor(n / 5)) % WARIANTY.length]; };
  const KOLOR_MODALA = { orange: '', amber: 'modal--amber', coral: 'modal--coral', dark: 'modal--dark', teal: 'modal--teal' };

  /* ---------- rysowanie drzwi ---------- */
  const lista = document.getElementById('drzwi');
  const gwiazdka = '<svg class="door__gwiazdka" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.3L12 16.5 5.8 21l2.4-7.3L2 9.2h7.6z"/></svg>';

  function narysuj() {
    const ile = dostepne();
    const dzis = (!wszystkieOdblokowane && czyTrwa() && ile >= 1) ? ile : 0;
    lista.innerHTML = '';
    DNI.forEach(function (d) {
      const n = d.dzien, odblok = n <= ile, otw = odblok && czyOtwarte(n), v = wariant(n);
      const t = U.TYPY[d.typ];
      const li = document.createElement('li');
      li.className = 'door v-' + v + (n === C.liczbaDni ? ' door--final' : '') + (odblok ? '' : ' is-locked') + (otw ? ' is-open' : '') + (n === dzis ? ' is-today' : '');
      li.dataset.dzien = n;
      const wnetrze = odblok
        ? '<span class="door__inside">' + U.svg(t.ikona) + '<span class="dzien">' + t.nazwa + '</span><span class="t">' + esc(d.tytul) + '</span></span>'
        : '<span class="door__inside"></span>';
      li.innerHTML =
        '<button class="door__btn" type="button" aria-label="' + etykieta(d, odblok, otw) + '">' +
        wnetrze +
        '<span class="door__front">' + (n === C.liczbaDni ? '' : gwiazdka) +
        '<span class="door__num">' + n + '</span><span class="door__knob"></span>' +
        (odblok ? '' : U.svg('lock', 'door__lock')) + '</span></button>';
      li.querySelector('button').addEventListener('click', function () { klik(d, li); });
      lista.appendChild(li);
    });
  }

  function czyTrwa() {
    if (symulowany) return true;
    return U.trwa();
  }
  function etykieta(d, odblok, otw) {
    if (!odblok) return 'Okienko ' + d.dzien + ', zamknięte. Otworzy się ' + dataZGodzina(d.dzien) + '.';
    return 'Okienko ' + d.dzien + (otw ? ', otwarte: ' : ', otwórz: ') + d.tytul;
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- klik ---------- */
  function klik(d, li) {
    if (d.dzien > dostepne()) {
      li.classList.remove('is-shake'); void li.offsetWidth; li.classList.add('is-shake');
      pokazKomunikat('To okienko otworzy się ' + dataZGodzina(d.dzien) + '.');
      return;
    }
    const pierwszy = !czyOtwarte(d.dzien);
    if (pierwszy) {
      zapamietaj(d.dzien);
      li.classList.add('is-open');
      li.classList.remove('is-today');
      konfetti(li);
      odswiezStatus();
      setTimeout(function () { pokazModal(d, li); }, 520);
    } else {
      pokazModal(d, li);
    }
  }

  /* ---------- modal ---------- */
  const modal = document.getElementById('modal');
  let ostatniPrzycisk = null;
  function pokazModal(d, li) {
    const t = U.TYPY[d.typ];
    ostatniPrzycisk = li.querySelector('button');
    modal.className = 'modal ' + KOLOR_MODALA[wariant(d.dzien)];
    document.getElementById('m-dzien').textContent = d.dzien;
    document.getElementById('m-data').textContent = dataOkienka(d.dzien);
    document.getElementById('m-chip').innerHTML = U.svg(t.ikona) + esc(t.nazwa);
    document.getElementById('m-tytul').textContent = d.tytul;
    const autor = document.getElementById('m-autor');
    autor.textContent = d.autor ? '— ' + d.autor : ''; autor.hidden = !d.autor;
    document.getElementById('m-opis').textContent = d.opis;
    document.getElementById('m-korzysci').innerHTML = (d.korzysci || []).map(function (k) { return '<li>' + esc(k) + '</li>'; }).join('');

    const akcje = document.getElementById('m-akcje');
    if (d.linki && d.linki.length) {
      akcje.innerHTML = '<ul class="modal__linki">' + d.linki.map(function (l, i) {
        return '<li><a target="_blank" rel="noopener" href="' + esc(U.zUtm(l.url, d.dzien)) + '"><span class="modal__play">' + U.svg('play') + '</span><span><b>' + esc(l.tytul) + '</b><small>' + esc([l.autor, l.czas].filter(Boolean).join(' · ')) + '</small></span></a></li>';
      }).join('') + '</ul>';
    } else if (d.url) {
      akcje.innerHTML = '<a class="btn" target="_blank" rel="noopener" href="' + esc(U.zUtm(d.url, d.dzien)) + '">' + esc(d.cta || 'Otwórz') + U.svg('arrow') + '</a>';
    } else {
      akcje.innerHTML = '<a class="btn" aria-disabled="true" role="link">Link wkrótce</a>' + (podglad ? '<span class="brak-linku">brak linku</span>' : '');
    }
    const nota = document.getElementById('m-notatka');
    if (podglad && d.notatka) { nota.textContent = 'Notatka (widoczna tylko w podglądzie): ' + d.notatka; nota.hidden = false; } else nota.hidden = true;

    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
  }
  document.getElementById('m-zamknij').addEventListener('click', function () { modal.close(); });
  modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
  modal.addEventListener('close', function () { if (ostatniPrzycisk) ostatniPrzycisk.focus(); });

  /* ---------- komunikat (zamknięte okienko) ---------- */
  let timerKomunikatu;
  function pokazKomunikat(tekst) {
    let el = document.getElementById('toast');
    if (!el) {
      el = document.createElement('div'); el.id = 'toast'; el.setAttribute('role', 'status');
      el.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translate(-50%,20px);background:#1F2229;color:#fff;padding:12px 20px;border-radius:99px;font:700 .95rem Sen,sans-serif;z-index:1200;opacity:0;transition:.25s;box-shadow:0 10px 30px rgba(0,0,0,.35);max-width:90vw;text-align:center';
      document.body.appendChild(el);
    }
    el.textContent = tekst;
    requestAnimationFrame(function () { el.style.opacity = 1; el.style.transform = 'translate(-50%,0)'; });
    clearTimeout(timerKomunikatu);
    timerKomunikatu = setTimeout(function () { el.style.opacity = 0; el.style.transform = 'translate(-50%,20px)'; }, 2600);
  }

  /* ---------- konfetti z kropek ---------- */
  function konfetti(li) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = document.getElementById('konfetti');
    const r = li.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const kolory = ['#F54E29', '#F9B023', '#FFFFFF', '#FF7459', '#80CBC9'];
    for (let i = 0; i < 22; i++) {
      const el = document.createElement('i');
      const kat = Math.random() * Math.PI * 2, dyst = 70 + Math.random() * 130, rozm = 6 + Math.random() * 9;
      el.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + rozm + 'px;height:' + rozm + 'px;background:' + kolory[i % kolory.length] +
        ';--dx:' + (Math.cos(kat) * dyst).toFixed(0) + 'px;--dy:' + (Math.sin(kat) * dyst + 40).toFixed(0) + 'px';
      box.appendChild(el);
      setTimeout(function () { el.remove(); }, 1200);
    }
  }

  /* ---------- status, pasek, licznik ---------- */
  const statusEl = document.getElementById('status');
  const akcjeEl = document.getElementById('akcje');
  const pasekLewy = document.getElementById('pasek-lewy');

  function odswiezStatus() {
    const ile = dostepne();
    const dniStart = U.dniDoStartu();
    const trwa = czyTrwa();
    const policzoneOtwarte = otwarte.filter(function (n) { return n <= ile; }).length;
    document.getElementById('postep-tekst').textContent = 'Otwarte: ' + policzoneOtwarte + ' z ' + C.liczbaDni;
    document.getElementById('postep-pasek').style.width = (policzoneOtwarte / C.liczbaDni * 100) + '%';

    if (!wszystkieOdblokowane && ile === 0) {
      statusEl.innerHTML = (dniStart > 0
        ? 'Kalendarz startuje 1 grudnia, czyli za ' + dniStart + ' ' + U.odmiana(dniStart, 'dzień', 'dni', 'dni') + '.'
        : 'Kalendarz startuje dziś o ' + godz + '.') +
        '<small>Pierwsze okienko otworzy się ' + dataZGodzina(1) + '. W dniu startu wyślemy Ci przypomnienie mailem.</small>';
      akcjeEl.innerHTML = '';
    } else if (trwa && ile >= 1 && !wszystkieOdblokowane) {
      const dzis = ile;
      const dzisOtwarte = czyOtwarte(dzis);
      statusEl.innerHTML = dzisOtwarte
        ? 'Dzisiejsze okienko (nr ' + dzis + ') masz już otwarte. Kolejne jutro o ' + godz + '.'
        : 'Dziś czeka na Ciebie okienko nr ' + dzis + '.';
      const brakujace = [];
      for (let i = 1; i <= ile; i++) if (!czyOtwarte(i)) brakujace.push(i);
      akcjeEl.innerHTML = '';
      if (brakujace.length) {
        const cel = brakujace[brakujace.length - 1];
        const b = document.createElement('button');
        b.className = 'btn btn--amber'; b.type = 'button';
        b.textContent = cel === dzis ? 'Otwórz dzisiejsze okienko' : 'Otwórz okienko nr ' + cel;
        b.addEventListener('click', function () {
          const li = lista.querySelector('[data-dzien="' + cel + '"]');
          li.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(function () { li.querySelector('button').click(); }, 450);
        });
        akcjeEl.appendChild(b);
      }
    } else {
      statusEl.innerHTML = trybTestowy
        ? ''   // tryb testowy: bez żadnych dopisków, kalendarz wygląda jak docelowy
        : wszystkieOdblokowane && podglad
        ? 'Tryb podglądu: wszystkie okienka odblokowane.<small>Odwiedzający zobaczą tylko okienka z datą ≤ dzisiejszej.</small>'
        : 'Wszystkie okienka są już otwarte.<small>Jeśli któreś Cię ominęło, możesz do niego wrócić w każdej chwili. Zajrzyj też do okienka nr 24.</small>';
      akcjeEl.innerHTML = '';
    }
    odswiezLicznik();
  }

  function odswiezLicznik() {
    if (trybTestowy) { pasekLewy.textContent = ''; return; }
    if (!czyTrwa() || dostepne() >= C.liczbaDni || wszystkieOdblokowane) {
      pasekLewy.textContent = czyTrwa() && !wszystkieOdblokowane && dostepne() >= C.liczbaDni
        ? 'Dziś ostatnie okienko. Dziękujemy, że byliście z nami w tym Adwencie.'
        : dostepne() >= C.liczbaDni ? 'Dziękujemy, że byliście z nami w tym Adwencie.' : 'Pierwsze okienko: ' + dataZGodzina(1);
      return;
    }
    const s = U.sekundDoOdblokowania();
    const p = function (x) { return String(x).padStart(2, '0'); };
    pasekLewy.innerHTML = 'Następne okienko za <span class="licznik">' + p(Math.floor(s / 3600)) + ':' + p(Math.floor(s % 3600 / 60)) + ':' + p(s % 60) + '</span>';
    if (s <= 1) setTimeout(function () { narysuj(); odswiezStatus(); }, 1500);
  }

  /* ---------- odliczanie do Wigilii ---------- */
  const odlBox = document.getElementById('odliczanie');
  function odswiezOdliczanie() {
    // Grudzień = czas zimowy (UTC+1): godzina w Polsce minus 1 = godzina UTC
    const cel = Date.UTC(C.rok, C.miesiac - 1, C.liczbaDni, C.godzinaWigilii - 1, 0, 0);
    let ms = cel - Date.now();
    odlBox.hidden = false;
    const kafle = odlBox.querySelector('.odliczanie__kafle');
    if (ms <= 0) {
      document.getElementById('odl-etykieta').textContent = 'Wesołych Świąt od całego zespołu Obiado!';
      kafle.hidden = true;
      return;
    }
    kafle.hidden = false;
    document.getElementById('odl-etykieta').textContent = 'Do Wigilii zostało';
    const s = Math.floor(ms / 1000);
    const p = function (x) { return String(x).padStart(2, '0'); };
    document.getElementById('odl-d').textContent = Math.floor(s / 86400);
    document.getElementById('odl-g').textContent = p(Math.floor(s % 86400 / 3600));
    document.getElementById('odl-m').textContent = p(Math.floor(s % 3600 / 60));
    document.getElementById('odl-s').textContent = p(s % 60);
  }

  /* ---------- start ---------- */
  narysuj();
  odswiezStatus();
  odswiezOdliczanie();
  setInterval(function () { odswiezLicznik(); odswiezOdliczanie(); }, 1000);

  /* stopka + udostępnianie */
  document.getElementById('stopka-linki').innerHTML =
    '<a href="' + C.stronaObiado + '">obiado.pl</a>' + (C.polityka ? ' · <a href="' + C.polityka + '">Polityka prywatności</a>' : '');
  const urlLanding = new URL('index.html', location.href);
  urlLanding.search = '?utm_source=polecenie&utm_medium=udostepnienie&utm_campaign=' + C.utm.campaign;
  U.udostepnij(document.getElementById('udostepnij'), urlLanding.toString());
})();
