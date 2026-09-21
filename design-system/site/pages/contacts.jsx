// The /contacts/ page, built from nataliia-ds components. Generated once from the live page by
// the conversion in design-system/site/README.md; edit this file, not the HTML, from now on.
import { ContactGrid, ContactList, ContactRow, Fact, FactGrid, MapEmbed, OfficeCard, Section } from 'nataliia-ds';

export const meta = {
  "path": "/contacts/",
  "title": "Контакти | Наталія Михайлюк",
  "description": "Записатися на консультацію до психотерапевта Наталії Михайлюк: Telegram, телефон, пошта. Кабінет у Києві біля метро Нивки.",
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
        "name": "Контакти",
        "item": "https://www.nataliiamykhailiuk.com/contacts/"
      }
    ]
  }
};

export default function Page({ assetBase }) {
  return (
    <>
      <Section spacing="tight" contained={false}>
        <ContactGrid
          aside={
            <>
              <MapEmbed src="https://www.google.com/maps?q=50.45863528280929,30.400617977274504&z=17&output=embed" title="Кабінет на Берестейському проспекті, 90а" />
              <OfficeCard eyebrow="Кабінет" address="Київ, Берестейський проспект, 90а" meta="Станція метро «Нивки», 03062">Кабінет за п’ять хвилин пішки від метро. Точну адресу входу й час зустрічі я надішлю після того, як ми домовимось.</OfficeCard>
            </>
          }
        >
          <h1>Напишіть мені</h1>
          <p className="lede contact-lede">Не потрібно одразу пояснювати все. Кількох рядків про те, що вас турбує, достатньо, щоб почати розмову.</p>
          <ContactList>
            <ContactRow icon={`${assetBase}/telegram-icon.png`} title="Telegram" href="https://t.me/nataliiamykhailiuk">@nataliiamykhailiuk — найшвидший спосіб</ContactRow>
            <ContactRow title="+38 067 506 9911" href="tel:+380675069911" external={false} icon="" glyph="☏">Телефон і Viber</ContactRow>
            <ContactRow title="natalia.mihayluk@gmail.com" href="mailto:natalia.mihayluk@gmail.com" external={false} icon="" glyph="✉">Пошта — для розгорнутих листів</ContactRow>
            <ContactRow icon={`${assetBase}/facebook-icon.png`} title="Facebook" href="https://www.facebook.com/natalia.mihayluk">Дописи про практику</ContactRow>
          </ContactList>
        </ContactGrid>
      </Section>
      <Section spacing="flush">
        <FactGrid>
          <Fact value="60 хв" label="триває одна сесія" />
          <Fact value="Онлайн" label="відеодзвінок — для індивідуальних і сімейних сесій" />
          <Fact value="Офлайн" label="кабінет на Нивках — усі формати, зокрема групи" />
          <Fact value="14+" label="вік, з якого працюю з підлітками" />
        </FactGrid>
      </Section>
    </>
  );
}
