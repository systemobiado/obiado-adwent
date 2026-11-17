/* ============================================================
   USTAWIENIA KALENDARZA — tu zmieniasz rzeczy "techniczne"
   ============================================================ */
window.ADWENT = {
  rok: 2026,
  miesiac: 12,          // grudzień
  liczbaDni: 24,
  strefa: 'Europe/Warsaw',

  // O której godzinie (czas warszawski) odblokowuje się okienko danego dnia.
  godzinaOdblokowania: 8,

  // Odliczanie do Wigilii (24.12) na stronie kalendarza — do tej godziny czasu warszawskiego.
  // Grudzień = czas zimowy (UTC+1), więc 16:00 w Polsce to 15:00 UTC.
  godzinaWigilii: 16,

  // TRYB TESTOWY: true = wszystkie 24 okienka są odblokowane dla każdego, kto ma dostęp do kalendarza.
  // PRZED STARTEM (najpóźniej 30 listopada) ZMIEŃ NA false — wtedy okienka otwierają się wg dat.
  odblokujWszystko: false,

  // Link z maila ma postać:  .../kalendarz.html?k=adwent2026
  // Bez tego parametru (i bez wcześniejszej wizyty) strona pokaże ekran "zapisz się".
  // To miękka bramka, nie zabezpieczenie — patrz README.
  kluczDostepu: 'adwent2026',

  // Tryb podglądu dla Ciebie:  .../kalendarz.html?podglad=obiado-test
  //   odblokowuje wszystkie okienka i pokazuje brakujące linki.
  //   Dodaj &dzien=12 żeby zasymulować 12 grudnia.
  kluczPodgladu: 'obiado-test',

  // Formularz HubSpot na stronie startowej (index.html).
  // HubSpot → Marketing → Formularze → Udostępnij → "Kod osadzania" — stamtąd portalId i formId.
  // region: 'na1' (konto Obiado, wg kodu osadzania), dla UE 'eu1'.
  hubspot: { portalId: '48913423', formId: '50e66db5-7bd9-455a-b5c8-d38cc6ed71cb', region: 'na1' },

  // Parametry UTM doklejane do KAŻDEGO linku z okienek (żeby w HubSpocie widać było, co klikano).
  utm: { source: 'kalendarz', medium: 'adwent', campaign: 'adwent-2026' },

  // Adres strony głównej obiado.pl — do stopki
  stronaObiado: 'https://obiado.pl',
  polityka: 'https://obiado.pl/polityka-prywatnosci/'   // polityka prywatności Obiado
};
