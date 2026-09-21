import { ServiceRow } from 'nataliia-ds';

export const Individual = () => <ServiceRow />;

export const Reversed = () => (
  <ServiceRow
    reverse
    number="02"
    title="Сімейна терапія"
    price="1900 грн"
    image="https://www.nataliiamykhailiuk.com/assets/images/tile-divorce.jpg"
    imageAlt="Сімейна терапія"
    items={[
      'труднощі у взаєминах між членами родини;',
      'конфлікти, непорозуміння, емоційна напруга;',
      'бажання покращити спілкування в сім’ї;',
      'кризові стани: розлучення, зміни, втрата.',
    ]}
  >
    Робота з тим, що відбувається між людьми: конфлікти, мовчання, накопичена напруга. Ми вчимося чути одне одного й
    говорити так, щоб бути почутими.
  </ServiceRow>
);

export const GroupOfflineOnly = () => (
  <ServiceRow
    number="03"
    title="Групова терапія"
    price="2400 грн"
    priceNote="за зустріч 3 години"
    availability="Лише офлайн, у кабінеті"
    image="https://www.nataliiamykhailiuk.com/assets/images/tile-stress-anxiety.jpg"
    imageAlt="Групова терапія"
    items={[
      'стрес, тривога, емоційні труднощі;',
      'підтримка після травматичних подій;',
      'розуміння власних реакцій у контакті з іншими;',
      'відчуття спільноти, яка розуміє.',
    ]}
  >
    Кілька людей зі схожим досвідом у безпечному колі. Тут можна побачити, як інші проживають те саме, і отримати
    зворотний зв’язок, якого немає більше ніде.
  </ServiceRow>
);
