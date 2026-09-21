import type { ReactNode } from 'react';
import { IMAGE_BASE, imageSize } from './primitives';

export interface TopicTileProps {
  /** The topic, as an `h3` at 1.45rem. */
  title?: ReactNode;
  /** One sentence in muted type. */
  children?: ReactNode;
  /** 220px-tall cover photograph. */
  image?: string;
  imageAlt?: string;
  /** The whole tile is the link. */
  href?: string;
}

/** A photograph above a short title and sentence. The entire card is one link. */
export function TopicTile({
  title = 'Стрес і тривога',
  children = 'Емоційна стійкість і повернення відчуття контролю над життям.',
  image = `${IMAGE_BASE}/tile-stress-anxiety.jpg`,
  imageAlt = 'Стрес і тривога',
  href = '/practice/#stres-tryvoha',
}: TopicTileProps) {
  return (
    <a className="tile" href={href}>
      <img src={image} alt={imageAlt} {...imageSize(image, [700, 467])} loading="lazy" decoding="async" />
      <div className="tile-body">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </a>
  );
}

export interface TileGridProps {
  /** `TopicTile`s — six on the homepage. */
  children?: ReactNode;
}

/** Auto-fitting grid of topic tiles from 300px, 32px apart, one column on phones. */
export function TileGrid({ children }: TileGridProps) {
  return (
    <div className="tile-grid">
      {children ?? (
        <>
          <TopicTile
            title="Розвиток особистості"
            image={`${IMAGE_BASE}/tile-personal-growth.jpg`}
            imageAlt="Розвиток особистості"
            href="/practice/#rozvytok-osobystosti"
          >
            Пошук сенсу, робота над самооцінкою та впевненістю в собі.
          </TopicTile>
          <TopicTile
            title="На межі розлучення"
            image={`${IMAGE_BASE}/tile-divorce.jpg`}
            imageAlt="На межі розлучення"
            href="/practice/#rozluchennia"
          >
            Як зберегти стосунки — і як зрозуміти, коли краще відпустити.
          </TopicTile>
          <TopicTile />
        </>
      )}
    </div>
  );
}

export interface StepProps {
  /** Two digits: `01`, `02`. Serif, clay. */
  number?: ReactNode;
  /** What happens at this step — a sans `h3`, not the serif used elsewhere. */
  title?: ReactNode;
  children?: ReactNode;
}

/** One numbered step of the first-meeting explainer. No card, no rule — just type. */
export function Step({
  number = '01',
  title = 'Ви пишете мені',
  children = 'У Telegram або іншому месенджері. Коротко описуєте, що вас турбує — детально розповідати одразу не потрібно.',
}: StepProps) {
  return (
    <div>
      <div className="step-num">{number}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export interface StepListProps {
  /** `Step`s — four describe the first meeting. */
  children?: ReactNode;
}

/** The numbered steps laid out in an auto-fitting grid from 240px, 48px apart. */
export function StepList({ children }: StepListProps) {
  return (
    <div className="steps">
      {children ?? (
        <>
          <Step />
          <Step number="02" title="Домовляємось про час">
            Обираємо формат: особиста зустріч у кабінеті у Києві на Нивках або відеодзвінок.
          </Step>
          <Step number="03" title="Перша сесія — 60 хвилин">
            Знайомимось, ви розповідаєте свою історію в комфортному для вас темпі. Разом формулюємо запит.
          </Step>
          <Step number="04" title="Усе залишається між нами">
            Конфіденційність — основа роботи. Ніщо зі сказаного не виходить за межі кабінету.
          </Step>
        </>
      )}
    </div>
  );
}

export interface PracticeCardProps {
  /** Two digits, in serif clay beside the heading. */
  number?: ReactNode;
  /** The area of work, as an `h2` at 1.65rem. */
  title?: ReactNode;
  /** The opening paragraph. */
  children?: ReactNode;
  /** "Come if you…" lines. Each ends with a semicolon, the last with a full stop. */
  items?: string[];
  /** The footnote pinned to the bottom of the card by a hairline rule. */
  meta?: ReactNode;
  image?: string;
  imageAlt?: string;
  /** Anchor id — the homepage tiles link straight to it. */
  id?: string;
}

/**
 * The full description of one area of work: photograph, numbered heading, paragraph,
 * a list of "come if you…" lines, and the format footnote.
 *
 * Cards in a row stretch to equal height, and `meta` stays pinned to the bottom.
 */
export function PracticeCard({
  number = '03',
  title = 'Стрес і тривога',
  children = 'Стрес і тривога є в житті кожного, але коли вони стають надмірними, це виснажує. Емоційна стійкість — це те, що можна розвинути.',
  items = [
    'часто відчуваєте постійний стрес і тривогу;',
    'стикаєтесь із емоційним виснаженням;',
    'хочете навчитися управляти своїми емоціями;',
    'прагнете відновити відчуття контролю над життям.',
  ],
  meta = 'Формат: групова терапія, індивідуальна терапія',
  image = `${IMAGE_BASE}/tile-stress-anxiety.jpg`,
  imageAlt = 'Стрес і тривога',
  id,
}: PracticeCardProps) {
  return (
    <article className="practice-card" id={id}>
      <img src={image} alt={imageAlt} {...imageSize(image, [700, 419])} loading="lazy" decoding="async" />
      <div className="body">
        <div className="head">
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
        {meta ? <div className="meta">{meta}</div> : null}
      </div>
    </article>
  );
}

export interface PracticeGridProps {
  /** `PracticeCard`s — six fill the practice page. */
  children?: ReactNode;
}

/** Auto-fitting grid of practice cards from 340px, 40px apart. */
export function PracticeGrid({ children }: PracticeGridProps) {
  return (
    <div className="practice-grid">
      {children ?? (
        <>
          <PracticeCard
            number="01"
            title="Розвиток особистості"
            image={`${IMAGE_BASE}/tile-personal-growth.jpg`}
            imageAlt="Розвиток особистості"
            items={[
              'вам складно знайти сенс у щоденних справах;',
              'самооцінка постійно коливається;',
              'ви прагнете зрозуміти свої справжні бажання й цілі;',
              'хочете відновити впевненість у собі.',
            ]}
            meta="Формат: індивідуальна терапія"
          >
            Пошук сенсу в житті та робота над самооцінкою — це те, що допомагає знайти внутрішній баланс і будувати
            стосунки з інших позицій.
          </PracticeCard>
          <PracticeCard
            number="02"
            title="На межі розлучення"
            image={`${IMAGE_BASE}/tile-divorce.jpg`}
            imageAlt="На межі розлучення"
            items={[
              'стоїте перед вибором: працювати над стосунками чи завершувати їх;',
              'відчуваєте, що підтримки та взаєморозуміння більше немає;',
              'шукаєте способи покращити комунікацію з партнером;',
              'хочете зрозуміти, як діяти в кризі.',
            ]}
            meta="Формат: сімейна терапія, індивідуальна терапія"
          >
            Бувають моменти, коли здається, що стосунки добігають кінця. Терапія допомагає розібратися, чи можливо
            відновити зв’язок — і що робити, якщо ні.
          </PracticeCard>
          <PracticeCard />
          <PracticeCard
            number="04"
            title="Батьки і діти"
            image={`${IMAGE_BASE}/tile-parent-child.jpg`}
            imageAlt="Батьки і діти"
            items={[
              'стикаєтеся з труднощами у вихованні або спілкуванні з дитиною;',
              'відчуваєте, що стосунки з дітьми потребують уваги;',
              'шукаєте способи вирішувати конфлікти в родині.',
            ]}
            meta="Формат: сімейна терапія, індивідуальна терапія · від 14 років"
          >
            Взаємини між батьками та дітьми бувають джерелом і радості, і напруги. Робота над цією системою допомагає
            почути потреби одне одного.
          </PracticeCard>
        </>
      )}
    </div>
  );
}
