/* Wspólne funkcje dla obu stron (index.html i kalendarz.html) */
(function () {
  const C = window.ADWENT;

  /* ---------- typy okienek ---------- */
  const IKONY = {
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor"/>',
    file: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M8 16h2M12 16h2"/>',
    gift: '<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M3 9h18V6H3zM12 6v14M12 6c-2-3-6-3-5 0M12 6c2-3 6-3 5 0"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8L21.5 18.5l-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
    star: '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  const TYPY = {
    webinar:     { nazwa: 'Webinar',                ikona: 'play',  liczba: 'webinarów' },
    material:    { nazwa: 'Materiał do pobrania',   ikona: 'file',  liczba: 'materiałów do pobrania' },
    narzedzie:   { nazwa: 'Narzędzie',              ikona: 'calc',  liczba: 'kalkulatory' },
    pakiet:      { nazwa: 'Pakiet szkoleń',         ikona: 'gift',  liczba: 'pakiety szkoleń' },
    nowosc:      { nazwa: 'Nowość tylko dla zapisanych', ikona: 'spark', liczba: 'materiały na wyłączność' },
    konsultacja: { nazwa: 'Darmowa konsultacja',    ikona: 'chat',  liczba: 'konsultacja' }
  };
  function svg(nazwa, klasa) {
    return '<svg class="ico ' + (klasa || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IKONY[nazwa] + '</svg>';
  }

  /* ---------- czas: zawsze według Warszawy ---------- */
  function warszawa() {
    const f = new Intl.DateTimeFormat('en-GB', {
      timeZone: C.strefa, year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23'
    });
    const o = {};
    f.formatToParts(new Date()).forEach(function (p) { o[p.type] = +p.value; });
    return { r: o.year, m: o.month, d: o.day, h: o.hour, min: o.minute, s: o.second };
  }

  /* "efektywna" data: przed godziną odblokowania liczy się jeszcze poprzedni dzień */
  function efektywna() {
    const t = warszawa();
    const e = new Date(Date.UTC(t.r, t.m - 1, t.d, t.h, t.min, t.s) - C.godzinaOdblokowania * 3600000);
    return { r: e.getUTCFullYear(), m: e.getUTCMonth() + 1, d: e.getUTCDate() };
  }

  /* ile okienek jest już dostępnych (0–24) */
  function dostepneDo(symulowanyDzien) {
    if (symulowanyDzien) return Math.min(symulowanyDzien, C.liczbaDni);
    const t = efektywna();
    if (t.r > C.rok) return C.liczbaDni;
    if (t.r < C.rok) return 0;
    if (t.m > C.miesiac) return C.liczbaDni;
    if (t.m < C.miesiac) return 0;
    return Math.min(t.d, C.liczbaDni);
  }

  /* czy kalendarz jest "w trakcie" (od pierwszego odblokowania do końca dnia 24.) */
  function trwa() {
    const t = efektywna();
    return t.r === C.rok && t.m === C.miesiac && t.d >= 1 && t.d <= C.liczbaDni;
  }

  function dniDoStartu() {
    const t = warszawa();
    const dzis = Date.UTC(t.r, t.m - 1, t.d);
    const start = Date.UTC(C.rok, C.miesiac - 1, 1);
    return Math.max(0, Math.round((start - dzis) / 86400000));
  }

  /* sekundy do najbliższej godziny odblokowania (np. 8:00) */
  function sekundDoOdblokowania() {
    const t = warszawa();
    let s = C.godzinaOdblokowania * 3600 - (t.h * 3600 + t.min * 60 + t.s);
    if (s <= 0) s += 86400;
    return s;
  }

  function odmiana(n, jeden, kilka, wiele) {
    if (n === 1) return jeden;
    const d10 = n % 10, d100 = n % 100;
    if (d10 >= 2 && d10 <= 4 && !(d100 >= 12 && d100 <= 14)) return kilka;
    return wiele;
  }

  /* ---------- UTM na linkach wychodzących ---------- */
  function zUtm(url, dzien) {
    if (!url) return '';
    try {
      const u = new URL(url, location.href);
      if (!/^https?:$/.test(u.protocol)) return url;
      const p = u.searchParams;
      if (!p.has('utm_source')) p.set('utm_source', C.utm.source);
      if (!p.has('utm_medium')) p.set('utm_medium', C.utm.medium);
      if (!p.has('utm_campaign')) p.set('utm_campaign', C.utm.campaign);
      if (dzien && !p.has('utm_content')) p.set('utm_content', 'dzien-' + String(dzien).padStart(2, '0'));
      return u.toString();
    } catch (e) { return url; }
  }

  /* ---------- bezpieczny localStorage ---------- */
  const mag = {
    czytaj: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    zapisz: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* tryb prywatny */ } }
  };

  /* ---------- padający śnieg (kropki z brandu) ---------- */
  function snieg(kontener, ile) {
    if (!kontener || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const kolory = ['#FFFFFF', '#FFE5C2', '#F9B023', '#FFFFFF'];
    for (let i = 0; i < ile; i++) {
      const el = document.createElement('i');
      const rozmiar = 4 + Math.random() * 9;
      el.style.cssText =
        'left:' + (Math.random() * 100).toFixed(1) + '%;' +
        'width:' + rozmiar.toFixed(1) + 'px;height:' + rozmiar.toFixed(1) + 'px;' +
        'background:' + kolory[i % kolory.length] + ';' +
        'opacity:' + (0.35 + Math.random() * 0.5).toFixed(2) + ';' +
        'animation-duration:' + (9 + Math.random() * 12).toFixed(1) + 's,' + (3 + Math.random() * 3).toFixed(1) + 's;' +
        'animation-delay:-' + (Math.random() * 18).toFixed(1) + 's,-' + (Math.random() * 5).toFixed(1) + 's;';
      kontener.appendChild(el);
    }
  }

  /* ---------- dzielenie się ---------- */
  function udostepnij(przycisk, url) {
    if (!przycisk) return;
    const etykieta = przycisk.querySelector('span');
    przycisk.addEventListener('click', function () {
      const dane = { title: 'Adwent z Obiado', text: '24 okienka z wiedzą i prezentami dla firm cateringowych. Zajrzyj:', url: url };
      if (navigator.share) { navigator.share(dane).catch(function () {}); return; }
      const ok = function () {
        if (etykieta) { const stare = etykieta.textContent; etykieta.textContent = 'Link skopiowany!'; setTimeout(function () { etykieta.textContent = stare; }, 2200); }
      };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(ok, function () { prompt('Skopiuj link:', url); });
      else prompt('Skopiuj link:', url);
    });
  }

  window.AdwentUtil = { C: C, IKONY: IKONY, TYPY: TYPY, svg: svg, warszawa: warszawa, dostepneDo: dostepneDo, trwa: trwa, dniDoStartu: dniDoStartu, sekundDoOdblokowania: sekundDoOdblokowania, odmiana: odmiana, zUtm: zUtm, mag: mag, snieg: snieg, udostepnij: udostepnij };
})();
