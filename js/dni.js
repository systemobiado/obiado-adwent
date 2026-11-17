/* ============================================================
   ZAWARTOŚĆ 24 OKIENEK
   ------------------------------------------------------------
   typ:  webinar | material | narzedzie | pakiet | nowosc | konsultacja
   RYTM: żadne dwa kolejne okienka nie mają tego samego typu.
         Układ: W X W N M P M W M X M W P M W X M W X P M N X K
         (W=webinar, M=materiał, N=narzędzie, X=nowość na wyłączność, P=pakiet, K=konsultacja)
   ZASADY: webinary z pakietów (1, 3, 4) występują TYLKO w pakietach, nie osobno.
           Z diety planetarnej zostają tylko przepisy (okienko 11) — firmy już ją wdrożyły.
           Webinary na żywo: 1.12 (okienko 1), 3.12 (okienko 3), 8.12 (okienko 8).
   autor: opcjonalnie — mały druk pod tytułem (nie jako powód, żeby oglądać)
   korzysci: 2–3 punkty "co z tego wyniesiesz" — zaczynaj od rezultatu
   url:  PUSTY = okienko pokaże "Link wkrótce" (w trybie podglądu: czerwona etykieta)
         Najlepiej linkuj do STRON Z FORMULARZEM, nie bezpośrednio do PDF.
   linki: tylko dla pakietów — lista nagrań {tytul, autor, czas, url} zamiast jednego przycisku.
   ============================================================ */
window.DNI = [
  {
    dzien: 1, typ: 'webinar',
    tytul: 'Alergeny w cateringu: jak zbierać informacje od rodziców i zarządzać dokumentacją',
    autor: 'Kasia Wojtowicz',
    opis: 'Webinar na żywo 1 grudnia o 18:00. Dowiesz się, jak zbierać informacje o alergiach od rodziców i prowadzić dokumentację tak, żeby nic nie uciekło między szkołą, rodzicami i kuchnią. Po webinarze ten sam link prowadzi do nagrania.',
    korzysci: ['Dowiesz się, jak zbierać dane o alergiach od rodziców i trzymać je w ryzach', 'Zobaczysz, jak powinna wyglądać dokumentacja, która się broni'],
    cta: 'Oglądaj webinar',
    url: 'https://youtube.com/live/8SoCio3j_ZY',
  },
  {
    dzien: 2, typ: 'nowosc',
    tytul: 'Alergeny: komplet wzorów dla cateringu',
    opis: 'Po webinarze czas na praktykę. Formularz dla rodziców, tabela alergenów i wzór informacji w jadłospisie, które wystarczy dopasować do swojej firmy. Materiał dostępny tylko dla uczestników kalendarza.',
    korzysci: ['Dostaniesz wzory do wpisania własnych danych, bez pisania od zera', 'Będziesz mieć coś, czego nie mają jeszcze nawet osoby, które pobrały wszystkie nasze materiały'],
    cta: 'Odbierz materiał', url: 'https://wiedza.obiado.pl/hubfs/Materia%C5%82y%20do%20pobrania/01-alergeny-wzory.pdf',
  },
  {
    dzien: 3, typ: 'webinar',
    tytul: 'AI w gastronomii: jak go używać i jakich błędów unikać',
    opis: 'Webinar na żywo 3 grudnia o 18:00. Dowiesz się, do czego sztuczna inteligencja naprawdę przydaje się w kuchni i biurze firmy cateringowej oraz jakich błędów lepiej unikać.',
    korzysci: ['Dowiesz się, które zadania warto oddać AI', 'Unikniesz najczęstszych wpadek'],
    cta: 'Oglądaj webinar',
    url: 'https://youtube.com/live/Xp1-mkV4_Cs',
  },
  {
    dzien: 4, typ: 'narzedzie',
    tytul: 'Kalkulator marży cateringowej',
    opis: 'Narzędzie, w którym policzysz, ile naprawdę zostaje Ci z jednego obiadu, zanim podpiszesz umowę ze szkołą.',
    korzysci: ['Zobaczysz realną marżę na jednym obiedzie', 'Sprawdzisz, przy jakiej cenie przestaje się opłacać'],
    cta: 'Otwórz kalkulator', url: 'https://systemobiado.github.io/kalkulator_marzy_cateringowej/',
  },
  {
    dzien: 5, typ: 'material',
    tytul: 'Checklista HACCP dla cateringu szkolnego',
    opis: 'Lista kontrolna, dzięki której w kilkanaście minut sprawdzisz, czy dokumentacja i praktyka w kuchni są ze sobą zgodne. Do wydruku i odhaczania.',
    korzysci: ['Sprawdzisz, czego brakuje w Twojej dokumentacji, zanim zrobi to kontrola', 'Dostaniesz gotowy PDF do wydruku i odhaczania'],
    cta: 'Pobierz checklistę', url: 'https://wiedza.obiado.pl/hubfs/Materia%C5%82y%20do%20pobrania/Checklista%20HACCP%20-%20%20bezpiecze%C5%84stwo%20%C5%BCywno%C5%9Bci%20w%20cateringu%20szkolnym.pdf',
  },
  {
    dzien: 6, typ: 'pakiet',
    tytul: 'Mikołajkowy prezent: Pakiet „Bezpieczeństwo żywności bez błędów"',
    opis: 'Trzy nagrania w jednym zestawie: dokumentacja HACCP, GHP i GMP oraz najczęstsze błędy. Więcej porządku w papierach i spokoju przed kontrolą. Możesz oglądać w dowolnej kolejności.',
    korzysci: ['Zrozumiesz, jak ma wyglądać kompletna dokumentacja HACCP', 'Dowiesz się, co obejmują GHP i GMP w praktyce kuchni', 'Unikniesz błędów, które najczęściej wytykają kontrolerzy'],
    linki: [
      { tytul: 'Dokumentacja, alergeny i HACCP w cateringu szkolnym', autor: 'Marta Teterycz', czas: '50 min', url: 'https://youtube.com/live/DgmZNXhGZkM?feature=share' },
      { tytul: 'GHP i GMP w cateringu: realne wymagania i najczęstsze błędy', autor: 'Marta Teterycz', czas: '54 min', url: 'https://youtube.com/live/Eo58jAJ4Dgk?feature=share' },
      { tytul: 'Najczęstsze błędy HACCP: jak je wyłapać i naprawić', autor: 'Kasia Wojtowicz', czas: '68 min', url: 'https://youtube.com/live/KCquyiEjtcI?feature=share' }
    ],
  },
  {
    dzien: 7, typ: 'material',
    tytul: 'Checklista zgodności jadłospisu z przepisami i normami żywienia',
    opis: 'Lista punktów, po których szybko sprawdzisz, czy jadłospis spełnia wymagania, zanim trafi do szkoły. Mniej poprawek na ostatnią chwilę.',
    korzysci: ['Wyłapiesz niezgodności z normami, zanim zrobi to ktoś inny', 'Zaoszczędzisz czas przy każdej zmianie jadłospisu'],
    cta: 'Pobierz checklistę', url: 'https://wiedza.obiado.pl/hubfs/Materia%C5%82y%20do%20pobrania/Checklista%20zgodno%C5%9Bci%20jad%C5%82ospisu%20z%20przepisami%20%20i%20normami%20%C5%BCywienia.pdf',
  },
  {
    dzien: 8, typ: 'webinar',
    tytul: 'Jak catering szkolny może zdobywać placówki dzięki treściom: co i gdzie publikować',
    autor: 'Patrycja Gnyp',
    opis: 'Webinar na żywo 8 grudnia o 18:00. Dowiesz się, co i gdzie publikować, żeby dyrektorzy szkół i przedszkoli znaleźli Twoją firmę, zanim zaczną szukać oferty.',
    korzysci: ['Dowiesz się, jakie treści przyciągają placówki', 'Zobaczysz, od czego zacząć, gdy nie masz czasu na marketing'],
    cta: 'Oglądaj webinar',
    url: 'https://youtube.com/live/-Lq3RdJUHW0',
  },
  {
    dzien: 9, typ: 'material',
    tytul: 'Jak wygrać przetarg w placówkach oświatowych',
    opis: 'Dowiedz się, jakie błędy eliminują firmy z przetargów na catering szkolny, i sprawdź checklistą, czy Twoja oferta jest gotowa.',
    korzysci: ['Dowiesz się, jakie błędy najczęściej eliminują firmy z przetargów', 'Sprawdzisz checklistą, czy Twoja oferta jest gotowa'],
    cta: 'Pobierz poradnik', url: 'https://wiedza.obiado.pl/hubfs/Materia%C5%82y%20do%20pobrania/Jak%20wygra%C4%87%20przetarg%20w%20plac%C3%B3wkach%20o%C5%9Bwiatowych.pdf',
  },
  {
    dzien: 10, typ: 'nowosc',
    tytul: 'Wzór oferty dla szkoły i przedszkola',
    opis: 'Gotowy szablon oferty dla placówki i lista pytań, które zadają dyrektorzy, razem z podpowiedzią, jak na nie odpowiadać. Materiał dostępny tylko dla uczestników kalendarza.',
    korzysci: ['Przygotujesz ofertę w godzinę, nie w kilka dni', 'Będziesz wiedzieć, jak uzasadnić cenę w rozmowie z dyrektorem'],
    cta: 'Odbierz materiał', url: 'https://wiedza.obiado.pl/hubfs/Materia%C5%82y%20do%20pobrania/02-wzor-oferty.pdf',
  },
  {
    dzien: 11, typ: 'material',
    tytul: '22 przepisy strączkowe gotowe do wdrożenia w Twoim jadłospisie',
    opis: 'Zbiór 22 przepisów na dania ze strączkami, przygotowany dla realizatorów żywienia zbiorowego. Wybierz te, które pasują do Twojego jadłospisu, i wprowadź je od ręki.',
    korzysci: ['Dostaniesz gotowe pomysły na dania ze strączkami do jadłospisu', 'Zaoszczędzisz czas na szukaniu przepisów'],
    cta: 'Pobierz przepisy', url: 'https://wiedza.obiado.pl/hubfs/Materia%C5%82y%20do%20pobrania/Dieta%20planetarna%20-%20przepisy%20(2).pdf',
  },
  {
    dzien: 12, typ: 'webinar',
    tytul: 'Straty surowca w cateringu: jak je wykryć, zmierzyć i ograniczyć',
    opis: 'Nagranie o tym, gdzie w kuchni znika surowiec i jak to policzyć. Dowiesz się, jak wykryć straty, zmierzyć je i zacząć ograniczać.',
    korzysci: ['Dowiesz się, gdzie najczęściej giną pieniądze w produkcji', 'Zobaczysz proste sposoby mierzenia strat'],
    cta: 'Oglądaj nagranie',
    url: 'https://youtube.com/live/Ap0DiWm_95U',
  },
  {
    dzien: 13, typ: 'pakiet',
    tytul: 'Niedzielny prezent: Pakiet „Rozwój firmy cateringowej"',
    opis: 'Trzy nagrania o tym, jak rozwijać firmę cateringową: marketing, stabilny zespół i liczenie kosztów. Wszystko w jednym zestawie, do oglądania w dowolnej kolejności.',
    korzysci: ['Zobaczysz, dlaczego marketing jest potrzebny cateringowi i od czego zacząć', 'Dowiesz się, jak ograniczyć rotację i zatrzymać zespół', 'Nauczysz się liczyć realny food cost'],
    linki: [
      { tytul: 'Marketing w cateringu: dlaczego jest potrzebny', autor: 'Patrycja Gnyp', czas: '56 min', url: 'https://youtube.com/live/6yo-mLS0kNw' },
      { tytul: 'Jak poradzić sobie z rotacją i utrzymać stabilny zespół?', autor: 'Edyta Okroj-Wierzbicka', czas: '62 min', url: 'https://youtube.com/live/kDG8csvvNUI' },
      { tytul: 'Food Cost vs. COS: jak liczyć rzeczywiste koszty w cateringu szkolnym', autor: 'Tomasz Sobczak', czas: '58 min', url: 'https://youtube.com/live/MMUIaXsoM98' }
    ],
  },
  {
    dzien: 14, typ: 'material',
    tytul: 'Karta analizy zwrotów z talerza',
    opis: 'Arkusz do zapisywania, co wraca na talerzach. Po tygodniu zobaczysz, które dania warto poprawić, a które schodzą bez problemu.',
    korzysci: ['Zobaczysz, które dania warto poprawić albo wyrzucić z jadłospisu', 'Zyskasz argumenty do rozmowy ze szkołą i rodzicami'],
    cta: 'Pobierz kartę', url: 'https://wiedza.obiado.pl/hubfs/Materia%C5%82y%20do%20pobrania/Karta%20analizy%20zwrot%C3%B3w%20z%20talerza.pdf',
  },
  {
    dzien: 15, typ: 'webinar',
    tytul: 'Zarządzanie produkcją w kuchni cateringowej: jak organizować pracę i minimalizować straty',
    opis: 'Nagranie o tym, jak ułożyć produkcję tak, żeby zespół nie gonił, a straty malały.',
    korzysci: ['Dowiesz się, jak planować produkcję dnia', 'Zobaczysz, jak ograniczyć chaos na zmianie'],
    cta: 'Oglądaj nagranie',
    url: 'https://youtube.com/live/Jl5FH0LWpNM',
  },
  {
    dzien: 16, typ: 'nowosc',
    tytul: 'Teczka kontroli',
    opis: 'Poradnik i komplet list kontrolnych: jakie dokumenty mieć pod ręką, gdy do firmy przyjdzie kontrola. Materiał dostępny tylko dla uczestników kalendarza.',
    korzysci: ['Dowiesz się, co przygotować, zanim kontrola zapuka', 'Dostaniesz listy dokumentów w jednym miejscu'],
    cta: 'Odbierz materiał', url: 'https://wiedza.obiado.pl/hubfs/Materia%C5%82y%20do%20pobrania/03-teczka-kontroli.pdf',
  },
  {
    dzien: 17, typ: 'material',
    tytul: 'Wzór dokumentacji HACCP dla cateringu szkolnego',
    opis: 'Komplet wzorów dokumentów HACCP, które wystarczy dopasować do swojej kuchni. Nie musisz zaczynać od pustej kartki.',
    korzysci: ['Dostaniesz wzory, które wystarczy dostosować do swojej kuchni', 'Zaoszczędzisz czas na tworzeniu dokumentacji'],
    cta: 'Pobierz wzory', url: 'https://wiedza.obiado.pl/hubfs/Materia%C5%82y%20do%20pobrania/Wz%C3%B3r%20dokumentacji%20HACCP%20-%20Catering%20Szkolny.pdf',
  },
  {
    dzien: 18, typ: 'webinar',
    tytul: 'BDO w cateringu: jakie obowiązki ma Twoja firma i jak uniknąć kar',
    opis: 'Nagranie, które porządkuje obowiązki BDO w firmie cateringowej i pokazuje, co zrobić, żeby uniknąć kar.',
    korzysci: ['Dowiesz się, czy i jak dotyczy Cię BDO', 'Zobaczysz, jak wygląda prowadzenie ewidencji'],
    cta: 'Oglądaj nagranie',
    url: 'https://youtube.com/live/YfwH2aCJpug',
  },
  {
    dzien: 19, typ: 'nowosc',
    tytul: 'Jak wybrać system do obsługi posiłków. Poradnik dla firm cateringowych',
    opis: 'Poradnik napisany dla firm cateringowych: które funkcje systemu do obsługi posiłków naprawdę się liczą, o co pytać dostawcę i jak nie przepłacić. Materiał dostępny tylko dla uczestników kalendarza.',
    korzysci: ['Dowiesz się, jakie funkcje systemu przydają się firmie cateringowej', 'Dostaniesz listę pytań do dostawcy i tabelę do porównania ofert'],
    cta: 'Odbierz materiał', url: 'https://wiedza.obiado.pl/hubfs/Materia%C5%82y%20do%20pobrania/05-system-dla-cateringow.pdf',
  },
  {
    dzien: 20, typ: 'pakiet',
    tytul: 'Niedzielny prezent: Pakiet „Prawo pracy w cateringu"',
    opis: 'Trzy nagrania o kontroli PIP, zatrudnianiu cudzoziemców oraz umowach i czasie pracy. Warto je obejrzeć, zanim zatrudnisz kolejną osobę.',
    korzysci: ['Przygotujesz się na kontrolę PIP', 'Zobaczysz, jak legalnie zatrudniać cudzoziemców', 'Dowiesz się, jak układać umowy i czas pracy w cateringu'],
    linki: [
      { tytul: 'Kontrola PIP w firmie cateringowej: czego się spodziewać i jak się przygotować', autor: 'Mateusz Nafalski', czas: '69 min', url: 'https://youtube.com/live/1ZAxg1moZ68' },
      { tytul: 'Jak zatrudniać cudzoziemców w firmie cateringowej: dokumenty, procedury, zmiany przepisów', autor: 'Katarzyna Klemba', czas: '45 min', url: 'https://youtube.com/live/43JKzei7Id8' },
      { tytul: 'Prawo pracy w firmie cateringowej: umowy, czas pracy i nadgodziny w praktyce', autor: 'Michał Rataj', czas: '96 min', url: 'https://youtube.com/live/VWKMn-gLmHo' }
    ],
  },
  {
    dzien: 21, typ: 'material',
    tytul: 'Instrukcja mrożenia i zamrażania',
    opis: 'Zasady mrożenia i rozmrażania w jednym dokumencie: temperatury, czasy, oznaczanie. Do powieszenia w kuchni.',
    korzysci: ['Będziesz wiedzieć, jak mrozić bezpiecznie i zgodnie z zasadami', 'Dostaniesz instrukcję, którą od razu pokażesz zespołowi'],
    cta: 'Pobierz instrukcję', url: 'https://wiedza.obiado.pl/hubfs/Materia%C5%82y%20do%20pobrania/Instrukcja%20rozmra%C5%BCania%20i%20zamra%C5%BCania.pdf',
  },
  {
    dzien: 22, typ: 'narzedzie',
    tytul: 'Kalkulator ceny obiadu 2026/2027',
    opis: 'Arkusz, w którym policzysz cenę obiadu na nowy rok szkolny z uwzględnieniem kosztów surowca, pracy i marży. Sprawdzisz też, co się stanie, gdy ceny produktów wzrosną.',
    korzysci: ['Policzysz cenę obiadu, która faktycznie się opłaca', 'Przećwiczysz scenariusze: co jeśli surowiec zdrożeje'],
    cta: 'Pobierz kalkulator', url: 'https://wiedza.obiado.pl/hubfs/Materia%C5%82y%20do%20pobrania/Kalkulator_ceny_obiadu_2026_2027_Obiado%20(1).xlsx',
  },
  {
    dzien: 23, typ: 'nowosc',
    tytul: 'Noworoczny audyt firmy cateringowej',
    opis: 'Dwadzieścia pytań i kilka minut, a na końcu plan: gdzie Twoja firma traci czas i pieniądze oraz które trzy zmiany wprowadzić w nowym roku. Wydrukuj go dla zespołu i wypełnijcie razem. Dostępny tylko dla uczestników kalendarza.',
    korzysci: ['Zobaczysz, w którym obszarze firma traci najwięcej czasu i pieniędzy', 'Dostaniesz trzy postanowienia noworoczne dla całego zespołu, nie tylko dla siebie'],
    cta: 'Odbierz audyt', url: 'https://wiedza.obiado.pl/hubfs/Materia%C5%82y%20do%20pobrania/04-audyt-firmy.pdf',
  },
  {
    dzien: 24, typ: 'konsultacja',
    tytul: 'Wigilijny prezent: darmowa konsultacja biznesowa z Obiado',
    opis: 'Ostatnie okienko i prezent od nas. Darmowa rozmowa o Twojej firmie cateringowej: wycena, organizacja produkcji, dokumentacja albo cokolwiek, co chcesz uporządkować w nowym roku.',
    korzysci: ['Omówisz swoją sytuację i dostaniesz konkretne wskazówki', 'Wejdziesz w nowy rok z planem na pierwsze trzy zmiany'],
    cta: 'Umów darmową konsultację', url: 'https://meetings.hubspot.com/pcichocka?uuid=27244a5d-acfe-4b68-91af-0aaa397dbf6a',
  }
];
