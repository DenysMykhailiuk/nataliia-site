// The /practice/ page, built from nataliia-ds components. Generated once from the live page by
// the conversion in design-system/site/README.md; edit this file, not the HTML, from now on.
import { Button, CtaBand, Intro, Lede, PracticeCard, PracticeGrid, Section } from 'nataliia-ds';

export const meta = {
  "path": "/practice/",
  "title": "Моя діяльність | Наталія Михайлюк",
  "description": "Напрямки роботи психотерапевта Наталії Михайлюк: тривога і стрес, стосунки, травма і психосоматика, робота з підлітками від 14 років.",
  "preloadHero": false,
  "jsonLd": {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Головна",
        "item": "https://www.nataliiamykhailiuk.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Моя діяльність",
        "item": "https://www.nataliiamykhailiuk.com/practice/"
      }
    ]
  }
};

export default function Page({ assetBase }) {
  return (
    <>
      <Section spacing="tight">
        <Intro title="З чим я працюю">
          <Lede>У своїй практиці я створюю простір, де можна не поспішати. Працюю з різними життєвими ситуаціями — від щоденної тривоги до наслідків важкого досвіду.</Lede>
          <p>Спираюся на сучасні методи психотерапії, засновані на наукових дослідженнях, і поєдную їх з увагою до конкретної людини.</p>
        </Intro>
      </Section>
      <Section spacing="flush">
        <PracticeGrid>
          <PracticeCard image={`${assetBase}/tile-personal-growth.jpg`} imageAlt="Розвиток особистості" id="rozvytok-osobystosti" number="01" title="Розвиток особистості" items={["вам складно знайти сенс у щоденних справах;","самооцінка постійно коливається;","ви прагнете зрозуміти свої справжні бажання й цілі;","хочете відновити впевненість у собі."]} meta="Формат: індивідуальна терапія">Пошук сенсу в житті та робота над самооцінкою — це те, що допомагає знайти внутрішній баланс і будувати стосунки з інших позицій.</PracticeCard>
          <PracticeCard image={`${assetBase}/tile-divorce.jpg`} imageAlt="На межі розлучення" id="rozluchennia" number="02" title="На межі розлучення" items={["стоїте перед вибором: працювати над стосунками чи завершувати їх;","відчуваєте, що підтримки та взаєморозуміння більше немає;","шукаєте способи покращити комунікацію з партнером;","хочете зрозуміти, як діяти в кризі."]} meta="Формат: сімейна терапія, індивідуальна терапія">Бувають моменти, коли здається, що стосунки добігають кінця. Терапія допомагає розібратися, чи можливо відновити зв’язок — і що робити, якщо ні.</PracticeCard>
          <PracticeCard image={`${assetBase}/tile-stress-anxiety.jpg`} imageAlt="Стрес і тривога" id="stres-tryvoha" number="03" title="Стрес і тривога" items={["часто відчуваєте постійний стрес і тривогу;","стикаєтесь із емоційним виснаженням;","хочете навчитися управляти своїми емоціями;","прагнете відновити відчуття контролю над життям."]} meta="Формат: групова терапія, індивідуальна терапія">Стрес і тривога є в житті кожного, але коли вони стають надмірними, це виснажує. Емоційна стійкість — це те, що можна розвинути.</PracticeCard>
          <PracticeCard image={`${assetBase}/tile-parent-child.jpg`} imageAlt="Батьки і діти" id="batky-i-dity" number="04" title="Батьки і діти" items={["стикаєтеся з труднощами у вихованні або спілкуванні з дитиною;","відчуваєте, що стосунки з дітьми потребують уваги;","шукаєте способи вирішувати конфлікти в родині."]} meta="Формат: сімейна терапія, індивідуальна терапія · від 14 років">Взаємини між батьками та дітьми бувають джерелом і радості, і напруги. Робота над цією системою допомагає почути потреби одне одного.</PracticeCard>
          <PracticeCard image={`${assetBase}/tile-work-stress.jpg`} imageAlt="Робота і вигорання" id="robota-vyhorannia" number="05" title="Робота і вигорання" items={["відчуваєте втрату мотивації або сенсу в роботі;","часто стикаєтесь із професійним стресом;","шукаєте баланс між роботою та особистим життям."]} meta="Формат: групова терапія, індивідуальна терапія">Коли робота стає джерелом стресу або втрачає сенс, це впливає на все інше. Важливо знайти баланс і повернути інтерес до того, що робиш.</PracticeCard>
          <PracticeCard image={`${assetBase}/tile-trauma.jpg`} imageAlt="Травма і психосоматика" id="travma-psykhosomatyka" number="06" title="Травма і психосоматика" items={["переживаєте наслідки травматичних подій;","маєте симптоми, які важко пояснити фізіологічними причинами;","шукаєте шлях до гармонії між тілом і психікою."]} meta="Формат: індивідуальна терапія">Травматичний досвід залишає слід і в емоціях, і в тілі. Психосоматичні прояви — це спосіб тіла говорити про те, для чого ще не знайшлося слів.</PracticeCard>
        </PracticeGrid>
      </Section>
      <CtaBand title="Не знаєте, що з цього ваше?"
        actions={
          <>
            <Button href="https://t.me/nataliiamykhailiuk">Написати в Telegram</Button>
            <Button href="/services/" variant="ghost">Мої послуги та ціни</Button>
          </>
        }
      >
        Це нормально. Напишіть кілька рядків про те, що вас турбує — розберемося разом.
      </CtaBand>
    </>
  );
}
