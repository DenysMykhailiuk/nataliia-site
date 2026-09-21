import { PracticeCard } from 'nataliia-ds';

export const Default = () => <PracticeCard />;

export const PersonalGrowth = () => (
  <PracticeCard
    number="01"
    title="Розвиток особистості"
    image="https://www.nataliiamykhailiuk.com/assets/images/tile-personal-growth.jpg"
    imageAlt="Розвиток особистості"
    items={[
      'вам складно знайти сенс у щоденних справах;',
      'самооцінка постійно коливається;',
      'ви прагнете зрозуміти свої справжні бажання й цілі;',
      'хочете відновити впевненість у собі.',
    ]}
    meta="Формат: індивідуальна терапія"
  >
    Пошук сенсу в житті та робота над самооцінкою — це те, що допомагає знайти внутрішній баланс і будувати стосунки з
    інших позицій.
  </PracticeCard>
);

export const WithAgeNote = () => (
  <PracticeCard
    number="04"
    title="Батьки і діти"
    image="https://www.nataliiamykhailiuk.com/assets/images/tile-parent-child.jpg"
    imageAlt="Батьки і діти"
    items={[
      'стикаєтеся з труднощами у вихованні або спілкуванні з дитиною;',
      'відчуваєте, що стосунки з дітьми потребують уваги;',
      'шукаєте способи вирішувати конфлікти в родині.',
    ]}
    meta="Формат: сімейна терапія, індивідуальна терапія · від 14 років"
  >
    Взаємини між батьками та дітьми бувають джерелом і радості, і напруги. Робота над цією системою допомагає почути
    потреби одне одного.
  </PracticeCard>
);
