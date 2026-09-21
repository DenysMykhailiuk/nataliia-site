// The /services/ page, built from nataliia-ds components. Generated once from the live page by
// the conversion in design-system/site/README.md; edit this file, not the HTML, from now on.
import { Button, CtaBand, Intro, Lede, Section, ServiceList, ServiceRow } from 'nataliia-ds';

export const meta = {
  "path": "/services/",
  "title": "Мої послуги | Наталія Михайлюк",
  "description": "Індивідуальна, сімейна та групова психотерапія у Києві та онлайн. Сесія 60 хвилин, вартість від 1400 грн.",
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
        "name": "Мої послуги",
        "item": "https://www.nataliiamykhailiuk.com/services/"
      }
    ]
  }
};

export default function Page({ assetBase }) {
  return (
    <>
      <Section spacing="tight">
        <Intro title="Три формати роботи">
          <Lede>Індивідуальні та сімейні сесії проходять як у кабінеті у Києві на Нивках, так і відеодзвінком. Групові — лише офлайн.</Lede>
          <p>Кожна сесія триває 60 хвилин. Якщо ви не впевнені, який формат вам підходить — напишіть, і ми оберемо разом.</p>
        </Intro>
      </Section>
      <Section spacing="flushSm">
        <ServiceList>
          <ServiceRow image={`${assetBase}/tile-personal-growth.jpg`} imageAlt="Індивідуальна терапія" reverse={false} number="01" title="Індивідуальна терапія" items={["стрес, тривога, емоційне виснаження;","травматичні події та кризові стани;","труднощі у стосунках;","пошук сенсу, робота над самооцінкою."]} price="1400 грн" priceNote="за сесію 60 хвилин" availability="Онлайн або в кабінеті">Уся увага зосереджена на вас — на ваших переживаннях, потребах і темпі. Разом ми досліджуємо внутрішні конфлікти й шукаємо шляхи до змін.</ServiceRow>
          <ServiceRow image={`${assetBase}/tile-divorce.jpg`} imageAlt="Сімейна терапія" reverse number="02" title="Сімейна терапія" items={["труднощі у взаєминах між членами родини;","конфлікти, непорозуміння, емоційна напруга;","бажання покращити спілкування в сім’ї;","кризові стани: розлучення, зміни, втрата."]} price="1900 грн" priceNote="за сесію 60 хвилин" availability="Онлайн або в кабінеті">Робота з тим, що відбувається між людьми: конфлікти, мовчання, накопичена напруга. Ми вчимося чути одне одного й говорити так, щоб бути почутими.</ServiceRow>
          <ServiceRow image={`${assetBase}/tile-stress-anxiety.jpg`} imageAlt="Групова терапія" reverse={false} number="03" title="Групова терапія" items={["стрес, тривога, емоційні труднощі;","підтримка після травматичних подій;","розуміння власних реакцій у контакті з іншими;","відчуття спільноти, яка розуміє."]} price="2400 грн" priceNote="за зустріч 3 години" availability="Лише офлайн, у кабінеті">Кілька людей зі схожим досвідом у безпечному колі. Тут можна побачити, як інші проживають те саме, і отримати зворотний зв’язок, якого немає більше ніде.</ServiceRow>
        </ServiceList>
      </Section>
      <CtaBand spaced title="Готові почати?"
        actions={
          <>
            <Button href="https://t.me/nataliiamykhailiuk">Написати в Telegram</Button>
            <Button href="tel:+380675069911" variant="ghost">+38 067 506 9911</Button>
          </>
        }
      >
        Напишіть мені — домовимось про зручний час і формат.
      </CtaBand>
    </>
  );
}
