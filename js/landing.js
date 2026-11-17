(function () {
  const U = window.AdwentUtil, C = U.C, DNI = window.DNI;

  U.snieg(document.getElementById('snieg'), 26);

  /* licznik do startu */
  const pill = document.getElementById('pill-start');
  const dni = U.dniDoStartu();
  if (dni > 0) pill.innerHTML = 'Start za <b>' + dni + ' ' + U.odmiana(dni, 'dzień', 'dni', 'dni') + '</b>';
  else if (U.dostepneDo() === 0) pill.innerHTML = 'Start dziś o <b>' + C.godzinaOdblokowania + ':00</b>';
  else if (U.trwa()) pill.innerHTML = '<b>Kalendarz już trwa</b>';
  else pill.innerHTML = '<b>Kalendarz zakończony</b>';

  /* trzy "haczyki" pod nagłówkiem */
  document.getElementById('ico-1').innerHTML = U.svg('gift') + 'Darmowy dostęp';
  document.getElementById('ico-2').innerHTML = U.svg('file') + C.liczbaDni + ' dni pełne wiedzy wspierającej Twój biznes';
  document.getElementById('ico-3').innerHTML = U.svg('spark') + 'Ekskluzywne materiały, jakich jeszcze nie było';

  /* liczby biorą się z dni.js */
  const licz = {};
  DNI.forEach(function (d) { licz[d.typ] = (licz[d.typ] || 0) + 1; });
  const NA_ZYWO = 3;   // webinary na żywo (1, 3 i 8 grudnia) — reszta to nagrania

  /* kafle "co za okienkami": ikona + liczba + nazwa w jednej linijce, pod spodem krótki opis */
  const kafle = [
    { typ: 'webinar',     ikona: 'play',  klasa: 'kafel--o', nazwa: function (n) { return U.odmiana(n, 'webinar', 'webinary', 'webinarów'); },
      tekst: function (n) {
        const nagrania = n - NA_ZYWO;
        return 'Webinary prowadzone przez ekspertów z branży: ' + NA_ZYWO + ' na żywo, ' + nagrania + ' ' + U.odmiana(nagrania, 'nagranie', 'nagrania', 'nagrań') +
          '. Do każdego otrzymasz link, który możesz obejrzeć w odpowiednim dla siebie momencie.';
      } },
    { typ: 'material',    ikona: 'file',  klasa: 'kafel--a', nazwa: function (n) { return U.odmiana(n, 'materiał', 'materiały', 'materiałów'); },
      tekst: 'Gotowe materiały do pobrania: checklisty, wzory i instrukcje, które możesz od razu wykorzystać w swojej firmie.' },
    { typ: 'narzedzie',   ikona: 'calc',  klasa: 'kafel--c', nazwa: function (n) { return U.odmiana(n, 'narzędzie', 'narzędzia', 'narzędzi'); },
      tekst: 'Kalkulatory, dzięki którym policzysz cenę obiadu i marżę na jednym obiedzie.' },
    { typ: 'pakiet',      ikona: 'gift',  klasa: 'kafel--t', nazwa: function (n) { return U.odmiana(n, 'pakiet', 'pakiety', 'pakietów') + ' nagrań'; },
      tekst: 'Zestawy po trzy nagrania na jeden temat. Dostajesz je w jednym miejscu i oglądasz, kiedy Ci pasuje.' },
    { typ: 'nowosc',      ikona: 'spark', klasa: 'kafel--p', nazwa: function (n) { return U.odmiana(n, 'materiał', 'materiały', 'materiałów') + ' na wyłączność'; },
      tekst: 'Materiały edukacyjne przygotowane wyłącznie dla uczestników kalendarza. Nie znajdziesz ich nigdzie indziej.' },
    { typ: 'konsultacja', ikona: 'star',  klasa: 'kafel--d', nazwa: function () { return 'niespodzianka na finał'; },
      tekst: 'Na zakończenie kalendarza czeka prezent. Szczegóły poznasz 24 grudnia.' }
  ];
  document.getElementById('kafle').innerHTML = kafle.map(function (k) {
    const n = licz[k.typ] || 0;
    const tekst = typeof k.tekst === 'function' ? k.tekst(n) : k.tekst;
    return '<div class="kafel ' + k.klasa + '"><div class="kafel__glowa">' + U.svg(k.ikona) +
      '<span class="liczba">' + n + '</span><h3>' + k.nazwa(n) + '</h3></div><p>' + tekst + '</p></div>';
  }).join('');

  /* formularz HubSpot */
  const miejsce = document.getElementById('hs-form');
  const h = C.hubspot;
  if (h.portalId && h.formId) {
    const s = document.createElement('script');
    s.charset = 'utf-8';
    s.src = 'https://' + (h.region ? 'js-' + h.region : 'js') + '.hsforms.net/forms/embed/v2.js';
    s.onload = function () {
      window.hbspt.forms.create({ portalId: h.portalId, formId: h.formId, region: h.region || undefined, target: '#hs-form' });
    };
    document.body.appendChild(s);
  } else {
    miejsce.innerHTML =
      '<div class="dem"><b>Tu pojawi się formularz HubSpot.</b><br>' +
      'Wstaw <code>portalId</code> i <code>formId</code> w <code>js/config.js</code>, a ten komunikat zniknie.<br><br>' +
      '<a href="kalendarz.html?podglad=' + encodeURIComponent(C.kluczPodgladu) + '">Zobacz podgląd kalendarza →</a></div>';
  }

  /* udostępnianie */
  const urlLanding = new URL('index.html', location.href);
  urlLanding.search = '?utm_source=polecenie&utm_medium=udostepnienie&utm_campaign=' + C.utm.campaign;
  U.udostepnij(document.getElementById('udostepnij'), urlLanding.toString());

  /* stopka */
  document.getElementById('stopka-linki').innerHTML =
    '<a href="' + C.stronaObiado + '">obiado.pl</a>' + (C.polityka ? ' · <a href="' + C.polityka + '">Polityka prywatności</a>' : '');
})();
