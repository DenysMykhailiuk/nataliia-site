import type { ReactNode } from 'react';
import { Eyebrow, IMAGE_BASE, InlineLink, TELEGRAM_URL, imageSize } from './primitives';
import { Container } from './layout';

export interface ServiceRowProps {
  /** Two digits, serif clay, beside the heading. */
  number?: ReactNode;
  /** The format's name, as an `h2` at 2rem. */
  title?: ReactNode;
  /** The opening paragraph. */
  children?: ReactNode;
  /** What this format suits, one clause per line. */
  items?: string[];
  /** The fee, serif and lining-numeralled: `1400 грн`. */
  price?: ReactNode;
  /** What the fee buys — `за сесію 60 хвилин`. */
  priceNote?: ReactNode;
  /** Where it happens, set to the right of the fee. */
  availability?: ReactNode;
  image?: string;
  imageAlt?: string;
  /** Mirrors the row so the photograph sits on the right. Alternate down the page. */
  reverse?: boolean;
}

/**
 * One therapy format as a full-width row: photograph on one side, description and fee on the other.
 *
 * Alternate `reverse` down the list. Below 900px every row stacks with the image on top.
 */
export function ServiceRow({
  number = '01',
  title = 'Індивідуальна терапія',
  children = 'Уся увага зосереджена на вас — на ваших переживаннях, потребах і темпі. Разом ми досліджуємо внутрішні конфлікти й шукаємо шляхи до змін.',
  items = [
    'стрес, тривога, емоційне виснаження;',
    'травматичні події та кризові стани;',
    'труднощі у стосунках;',
    'пошук сенсу, робота над самооцінкою.',
  ],
  price = '1400 грн',
  priceNote = 'за сесію 60 хвилин',
  availability = 'Онлайн або в кабінеті',
  image = `${IMAGE_BASE}/tile-personal-growth.jpg`,
  imageAlt = 'Індивідуальна терапія',
  reverse = false,
}: ServiceRowProps) {
  const picture = <img src={image} alt={imageAlt} {...imageSize(image, [700, 467])} loading="lazy" decoding="async" />;
  const body = (
    <div className="service-body">
      <div className="service-title">
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      <p>{children}</p>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      <div className="price-row">
        <div>
          <div className="price">{price}</div>
          <div className="price-note">{priceNote}</div>
        </div>
        {availability ? <div className="price-note">{availability}</div> : null}
      </div>
    </div>
  );
  return (
    <article className={reverse ? 'service reverse' : 'service'}>
      {reverse ? (
        <>
          {body}
          {picture}
        </>
      ) : (
        <>
          {picture}
          {body}
        </>
      )}
    </article>
  );
}

export interface ServiceListProps {
  /** `ServiceRow`s, alternating `reverse`. */
  children?: ReactNode;
}

/** The service rows stacked 48px apart. */
export function ServiceList({ children }: ServiceListProps) {
  return (
    <div className="service-list">
      {children ?? (
        <>
          <ServiceRow />
          <ServiceRow
            reverse
            number="02"
            title="Сімейна терапія"
            price="1900 грн"
            image={`${IMAGE_BASE}/tile-divorce.jpg`}
            imageAlt="Сімейна терапія"
            items={[
              'труднощі у взаєминах між членами родини;',
              'конфлікти, непорозуміння, емоційна напруга;',
              'бажання покращити спілкування в сім’ї;',
              'кризові стани: розлучення, зміни, втрата.',
            ]}
          >
            Робота з тим, що відбувається між людьми: конфлікти, мовчання, накопичена напруга. Ми вчимося чути одне
            одного й говорити так, щоб бути почутими.
          </ServiceRow>
          <ServiceRow
            number="03"
            title="Групова терапія"
            price="2400 грн"
            priceNote="за зустріч 3 години"
            availability="Лише офлайн, у кабінеті"
            image={`${IMAGE_BASE}/tile-stress-anxiety.jpg`}
            imageAlt="Групова терапія"
            items={[
              'стрес, тривога, емоційні труднощі;',
              'підтримка після травматичних подій;',
              'розуміння власних реакцій у контакті з іншими;',
              'відчуття спільноти, яка розуміє.',
            ]}
          >
            Кілька людей зі схожим досвідом у безпечному колі. Тут можна побачити, як інші проживають те саме, і
            отримати зворотний зв’язок, якого немає більше ніде.
          </ServiceRow>
        </>
      )}
    </div>
  );
}

export interface QuoteProps {
  /** The client's words, in guillemets, serif italic. Verbatim — never edited for style. */
  children?: ReactNode;
  /** First name and age: `Олена, 34 роки`. */
  attribution?: ReactNode;
}

/** A short testimonial for the dark band. Inside `QuoteWall`, never on its own. */
export function Quote({
  children = '«Уперше за багато років я змогла говорити про те, що зі мною відбувається, без страху бути осудженою.»',
  attribution = 'Олена, 34 роки',
}: QuoteProps) {
  return (
    <figure>
      <blockquote>{children}</blockquote>
      <figcaption>{attribution}</figcaption>
    </figure>
  );
}

export interface QuoteWallProps {
  /** `Quote`s — three fit the row. */
  children?: ReactNode;
  eyebrow?: ReactNode;
  /** The link to the full reviews page. Pass `null` to drop it. */
  moreHref?: string | null;
  moreLabel?: ReactNode;
}

/** The dark bark-coloured testimonial band — the one inverted section on the homepage. */
export function QuoteWall({
  children,
  eyebrow = 'Відгуки клієнтів',
  moreHref = '/reviews/',
  moreLabel = 'Усі відгуки',
}: QuoteWallProps) {
  return (
    <section className="quotes">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <div className="quote-grid">
          {children ?? (
            <>
              <Quote />
              <Quote attribution="Ігор та Марина, 41 і 39 років">
                «Ми прийшли парою на межі розлучення. Не всі відповіді були простими, але ми нарешті почули одне
                одного.»
              </Quote>
              <Quote attribution="Катерина, 28 років">
                «Тривога не зникла за один день, але я навчилася з нею жити й більше не боюся власних емоцій.»
              </Quote>
            </>
          )}
        </div>
        {moreHref ? (
          <InlineLink href={moreHref} onDark>
            {moreLabel}
          </InlineLink>
        ) : null}
      </Container>
    </section>
  );
}

export interface ReviewCardProps {
  /** The testimonial, one or more paragraphs. Client words, formatted only. */
  children?: ReactNode;
  /** `Name, NN років` — the caption below the rule. */
  attribution?: ReactNode;
}

/** A long testimonial on paper, for the reviews page. Never splits across columns. */
export function ReviewCard({
  children = (
    <p>
      Після роботи з Наталією я зміг розібратися у своїх побоюваннях, зрозуміти, у яких стосунках перебував і яких хочу
      надалі. Кожен етап роботи допоміг мені краще зрозуміти себе, відчути впевненість і отримати сили та натхнення
      рухатися далі.
    </p>
  ),
  attribution = 'Борис, 37 років',
}: ReviewCardProps) {
  return (
    <figure className="review">
      <blockquote>{children}</blockquote>
      <figcaption>{attribution}</figcaption>
    </figure>
  );
}

export interface ReviewListProps {
  /** `ReviewCard`s — long ones first, short ones last. */
  children?: ReactNode;
}

/**
 * The reviews page's masonry: a CSS column flow from 420px wide, so testimonials of
 * very different lengths pack without leaving ragged gaps.
 */
export function ReviewList({ children }: ReviewListProps) {
  return (
    <div className="review-list">
      {children ?? (
        <>
          <ReviewCard />
          <ReviewCard attribution="Наталія, 42 роки">
            <p>
              Проходила терапію у Наталії Михайлюк. Професійна, уважна й дуже підтримувальна. Минув майже рік після
              завершення нашої роботи, але її запитання та поради й досі допомагають мені самостійно знаходити вихід зі
              складних ситуацій. Дякую за роботу, результат якої залишається зі мною й надалі.
            </p>
          </ReviewCard>
        </>
      )}
    </div>
  );
}

export interface ContactRowProps {
  /** The channel, or the number itself — bold, on the first line. */
  title?: ReactNode;
  /** What to expect from it, in muted type. */
  children?: ReactNode;
  href?: string;
  /** A 28px icon. Leave unset to use the serif glyph instead. */
  icon?: string;
  /** Serif glyph used when there's no icon image: `☏` for phone, `✉` for mail. */
  glyph?: ReactNode;
  external?: boolean;
}

/** One way to get in touch: icon, label, and an arrow. The whole row is the link. */
export function ContactRow({
  title = 'Telegram',
  children = '@nataliiamykhailiuk — найшвидший спосіб',
  href = TELEGRAM_URL,
  icon = `${IMAGE_BASE}/telegram-icon.png`,
  glyph,
  external = true,
}: ContactRowProps) {
  return (
    <a className="contact-row" href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
      {icon ? (
        <img src={icon} alt="" {...imageSize(icon, [28, 28])} loading="lazy" decoding="async" />
      ) : (
        <span className="contact-icon">{glyph}</span>
      )}
      <span className="contact-text">
        <strong>{title}</strong>
        <small>{children}</small>
      </span>
      <span className="contact-arrow">→</span>
    </a>
  );
}

export interface ContactListProps {
  /** `ContactRow`s, most responsive channel first. */
  children?: ReactNode;
}

/** The contact channels stacked with a 2px seam between them. */
export function ContactList({ children }: ContactListProps) {
  return (
    <div className="contact-list">
      {children ?? (
        <>
          <ContactRow />
          <ContactRow
            title="+38 067 506 9911"
            href="tel:+380675069911"
            icon=""
            glyph="☏"
            external={false}
          >
            Телефон і Viber
          </ContactRow>
          <ContactRow
            title="natalia.mihayluk@gmail.com"
            href="mailto:natalia.mihayluk@gmail.com"
            icon=""
            glyph="✉"
            external={false}
          >
            Пошта — для розгорнутих листів
          </ContactRow>
        </>
      )}
    </div>
  );
}

export interface OfficeCardProps {
  eyebrow?: ReactNode;
  /** Street address, at 1.1rem. */
  address?: ReactNode;
  /** Metro and postcode, muted. */
  meta?: ReactNode;
  /** The practical note about finding the door. */
  children?: ReactNode;
}

/** The consulting-room address on paper, sitting directly under the map. */
export function OfficeCard({
  eyebrow = 'Кабінет',
  address = 'Київ, Берестейський проспект, 90а',
  meta = 'Станція метро «Нивки», 03062',
  children = 'Кабінет за п’ять хвилин пішки від метро. Точну адресу входу й час зустрічі я надішлю після того, як ми домовимось.',
}: OfficeCardProps) {
  return (
    <div className="office-card">
      <Eyebrow>{eyebrow}</Eyebrow>
      <p className="office-addr">{address}</p>
      <p className="muted office-meta">{meta}</p>
      <p className="office-note">{children}</p>
    </div>
  );
}

export interface MapEmbedProps {
  /** Embed URL. Defaults to the consulting room on Берестейський проспект. */
  src?: string;
  /** Describes the location for screen readers — required on an iframe. */
  title?: string;
}

/** The 4:3 map frame above `OfficeCard`. */
export function MapEmbed({
  src = 'https://www.google.com/maps?q=50.45863528280929,30.400617977274504&z=17&output=embed',
  title = 'Кабінет на Берестейському проспекті, 90а',
}: MapEmbedProps) {
  return (
    <iframe
      className="map-slot"
      src={src}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}

export interface ContactGridProps {
  /** The left column: heading, lede, `ContactList`. */
  children?: ReactNode;
  /** The right column. Defaults to the map above the office card. */
  aside?: ReactNode;
}

/** Two equal columns 80px apart — contact channels beside the map. Stacks below 900px. */
export function ContactGrid({ children, aside }: ContactGridProps) {
  return (
    <div className="container contact-grid">
      <div>{children}</div>
      <div>
        {aside ?? (
          <>
            <MapEmbed />
            <OfficeCard />
          </>
        )}
      </div>
    </div>
  );
}
