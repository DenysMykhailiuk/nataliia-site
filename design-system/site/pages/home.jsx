// The / page, built from nataliia-ds components. Generated once from the live page by
// the conversion in design-system/site/README.md; edit this file, not the HTML, from now on.
import { Button, CtaBand, Hero, InlineLink, Lede, Quote, QuoteWall, Section, SectionHead, Stat, StatRow, Step, StepList, TileGrid, TopicTile, TwoCol } from 'nataliia-ds';

export const meta = {
  "path": "/",
  "title": "Психотерапевт Наталія Михайлюк | Київ, Україна",
  "description": "Наталія Михайлюк — сертифікований гештальт-терапевт з 18-річним досвідом. Індивідуальна, сімейна та групова терапія у Києві та онлайн.",
  "preloadHero": true,
  "scripts": ["assets/js/moon-path.js"],
  "jsonLd": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.nataliiamykhailiuk.com/#person",
        "name": "Наталія Михайлюк",
        "jobTitle": "Гештальт-терапевт, психотерапевт",
        "url": "https://www.nataliiamykhailiuk.com/",
        "image": "https://www.nataliiamykhailiuk.com/assets/images/bio.jpg",
        "telephone": "+380675069911",
        "email": "natalia.mihayluk@gmail.com",
        "knowsLanguage": [
          "uk",
          "ru"
        ],
        "sameAs": [
          "https://www.facebook.com/natalia.mihayluk",
          "https://t.me/nataliiamykhailiuk"
        ],
        "worksFor": {
          "@id": "https://www.nataliiamykhailiuk.com/#practice"
        }
      },
      {
        "@type": [
          "ProfessionalService",
          "MedicalBusiness"
        ],
        "@id": "https://www.nataliiamykhailiuk.com/#practice",
        "name": "Психотерапевт Наталія Михайлюк",
        "description": "Приватна практика гештальт-терапії у Києві та онлайн: індивідуальна, сімейна та групова терапія.",
        "url": "https://www.nataliiamykhailiuk.com/",
        "image": "https://www.nataliiamykhailiuk.com/assets/images/bio.jpg",
        "telephone": "+380675069911",
        "email": "natalia.mihayluk@gmail.com",
        "priceRange": "від 1400 грн",
        "currenciesAccepted": "UAH",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Берестейський проспект, 90а",
          "addressLocality": "Київ",
          "postalCode": "03062",
          "addressCountry": "UA"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Київ"
          },
          {
            "@type": "Country",
            "name": "Україна"
          }
        ],
        "availableLanguage": [
          "uk"
        ],
        "founder": {
          "@id": "https://www.nataliiamykhailiuk.com/#person"
        },
        "foundingDate": "2008",
        "makesOffer": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Індивідуальна психотерапія"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Сімейна та парна терапія"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Групова терапія"
            }
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.nataliiamykhailiuk.com/#website",
        "url": "https://www.nataliiamykhailiuk.com/",
        "name": "Наталія Михайлюк — психотерапевт",
        "inLanguage": "uk",
        "publisher": {
          "@id": "https://www.nataliiamykhailiuk.com/#person"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.nataliiamykhailiuk.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Чи підходить мені терапія?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Якщо ви відчуваєте, що не справляєтесь самі — цього вже достатньо, щоб прийти. Діагноз не потрібен."
            }
          },
          {
            "@type": "Question",
            "name": "Чи працюєте ви з підлітками?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Так, з підлітками від 14 років."
            }
          },
          {
            "@type": "Question",
            "name": "Що таке гештальт-терапія?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Підхід, у якому ми досліджуємо ваш досвід тут і зараз — почуття, тілесні реакції, спосіб будувати контакт з іншими."
            }
          }
        ]
      }
    ]
  }
};

export default function Page({ assetBase }) {
  return (
    <>
      <Hero eyebrow="Психотерапія · Київ офлайн та онлайн" title="Зцілення починається з розуміння себе"
        actions={
          <>
            <Button href="https://t.me/nataliiamykhailiuk" variant="light">Написати в Telegram</Button>
            <Button href="tel:+380675069911" variant="outlineLight">+38 067 506 9911</Button>
          </>
        }
      >
        Простір, де можна говорити чесно — про тривогу, стосунки, втому й те, що давно нікому не розповідали.
      </Hero>
      <Section contained={false}>
        <TwoCol image={`${assetBase}/bio.jpg`} imageAlt="Наталія Михайлюк">
          <h2>Наталія Михайлюк</h2>
          <Lede>Магістр клінічної психології та сертифікований гештальт-терапевт. Веду приватну практику з 2008 року — це вже понад вісімнадцять років щоденної роботи з людьми.</Lede>
          <p>Працюю з кризовими й тривожними станами, психосоматикою, а також зі стосунками — партнерськими та дитячо-батьківськими. Багато часу присвячую підтримці людей, які проживають наслідки травматичного досвіду.</p>
          <p>Моя ціль — допомогти вам відновити зв’язок із собою, знайти внутрішню опору й будувати стосунки, у яких є взаєморозуміння та підтримка.</p>
          <StatRow>
            <Stat value="18+" label="років практики" />
            <Stat value="2008" label="з початку приватної практики" />
            <Stat value="60 хв" label="триває сесія" />
          </StatRow>
          <InlineLink href="/practice/">Докладніше про мою діяльність</InlineLink>
        </TwoCol>
      </Section>
      <Section alt>
        <SectionHead title="Теми, з якими до мене приходять найчастіше" />
        <TileGrid>
          <TopicTile image={`${assetBase}/tile-personal-growth.jpg`} imageAlt="Розвиток особистості" href="/practice/#rozvytok-osobystosti" title="Розвиток особистості">Пошук сенсу, робота над самооцінкою та впевненістю в собі.</TopicTile>
          <TopicTile image={`${assetBase}/tile-divorce.jpg`} imageAlt="На межі розлучення" href="/practice/#rozluchennia" title="На межі розлучення">Як зберегти стосунки — і як зрозуміти, коли краще відпустити.</TopicTile>
          <TopicTile image={`${assetBase}/tile-stress-anxiety.jpg`} imageAlt="Стрес і тривога" href="/practice/#stres-tryvoha" title="Стрес і тривога">Емоційна стійкість і повернення відчуття контролю над життям.</TopicTile>
          <TopicTile image={`${assetBase}/tile-parent-child.jpg`} imageAlt="Батьки і діти" href="/practice/#batky-i-dity" title="Батьки і діти">Взаєморозуміння в родині, конфлікти й емоційний зв’язок з дитиною.</TopicTile>
          <TopicTile image={`${assetBase}/tile-work-stress.jpg`} imageAlt="Робота і вигорання" href="/practice/#robota-vyhorannia" title="Робота і вигорання">Втрата сенсу в професії та управління робочим стресом.</TopicTile>
          <TopicTile image={`${assetBase}/tile-trauma.jpg`} imageAlt="Травма і психосоматика" href="/practice/#travma-psykhosomatyka" title="Травма і психосоматика">Проживання травматичного досвіду та тілесні реакції на нього.</TopicTile>
        </TileGrid>
      </Section>
      <Section>
        <SectionHead eyebrow="Перша зустріч" title="Як усе відбувається" />
        <StepList>
          <Step number="01" title="Ви пишете мені">У Telegram або іншому месенджері. Коротко описуєте, що вас турбує — детально розповідати одразу не потрібно.</Step>
          <Step number="02" title="Домовляємось про час">Обираємо формат: особиста зустріч у кабінеті у Києві на Нивках або відеодзвінок.</Step>
          <Step number="03" title="Перша сесія — 60 хвилин">Знайомимось, ви розповідаєте свою історію в комфортному для вас темпі. Разом формулюємо запит.</Step>
          <Step number="04" title="Усе залишається між нами">Конфіденційність — основа роботи. Ніщо зі сказаного не виходить за межі кабінету.</Step>
        </StepList>
      </Section>
      <QuoteWall eyebrow="Відгуки клієнтів" moreHref="/reviews/" moreLabel="Усі відгуки">
        <Quote attribution="Олена, 34 роки">«Уперше за багато років я змогла говорити про те, що зі мною відбувається, без страху бути осудженою.»</Quote>
        <Quote attribution="Ігор та Марина, 41 і 39 років">«Ми прийшли парою на межі розлучення. Не всі відповіді були простими, але ми нарешті почули одне одного.»</Quote>
        <Quote attribution="Катерина, 28 років">«Тривога не зникла за один день, але я навчилася з нею жити й більше не боюся власних емоцій.»</Quote>
      </QuoteWall>
      <CtaBand title="Зробити перший крок буває найважче"
        actions={
          <>
            <Button href="https://t.me/nataliiamykhailiuk">Написати в Telegram</Button>
            <Button href="tel:+380675069911" variant="ghost">+38 067 506 9911</Button>
          </>
        }
      >
        Напишіть мені кілька рядків — і ми домовимось про зручний час.
      </CtaBand>
    </>
  );
}
