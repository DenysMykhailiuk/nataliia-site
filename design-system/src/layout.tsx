import type { ReactNode } from 'react';
import { Eyebrow, imageSize } from './primitives';

export interface ContainerProps {
  children?: ReactNode;
}

/** The 1180px measure with 32px gutters (20px on phones). Every section has exactly one. */
export function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>;
}

export interface SectionProps {
  children?: ReactNode;
  /**
   * Vertical rhythm. `default` is 110px top and bottom; `tight` opens a page (96/72);
   * `flush` and `flushSm` drop the top padding to sit directly under a `tight` section.
   */
  spacing?: 'default' | 'tight' | 'flush' | 'flushSm';
  /** Switches the background from linen to the deeper sand tone, banding the page. */
  alt?: boolean;
  /** Wraps the children in a `Container`. Off when the section needs its own grid. */
  contained?: boolean;
}

const SPACING_CLASS: Record<NonNullable<SectionProps['spacing']>, string> = {
  default: 'section',
  tight: 'section-tight',
  flush: 'section-flush',
  flushSm: 'section-flush-sm',
};

/** A full-width horizontal band. The page is a stack of these, alternating `alt` for rhythm. */
export function Section({ children, spacing = 'default', alt = false, contained = true }: SectionProps) {
  const cls = `${SPACING_CLASS[spacing]}${alt ? ' section-alt' : ''}`;
  return <section className={cls}>{contained ? <Container>{children}</Container> : children}</section>;
}

export interface SectionHeadProps {
  /** The section's `h2`. */
  title?: ReactNode;
  /** Optional uppercase label above it. */
  eyebrow?: ReactNode;
  /** Anything after the heading — usually a paragraph. */
  children?: ReactNode;
}

/** Heading block at the top of a section, held to 640px and followed by 56px of air. */
export function SectionHead({ title = 'Як усе відбувається', eyebrow, children }: SectionHeadProps) {
  return (
    <div className="section-head">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export interface IntroProps {
  /** The page's `h1`. */
  title?: ReactNode;
  /** Paragraphs — the first is usually a `Lede`. */
  children?: ReactNode;
}

/** The opening block of an inner page: `h1` plus a couple of paragraphs, held to 720px. */
export function Intro({ title = 'З чим я працюю', children }: IntroProps) {
  return (
    <div className="intro">
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export interface TwoColProps {
  /** Portrait or illustration — occupies the 280–420px column. */
  image?: string;
  imageAlt?: string;
  /** The text column. */
  children?: ReactNode;
}

/** Image beside text, 80px apart, collapsing to one column below 900px. Used for the bio. */
export function TwoCol({
  image = 'https://www.nataliiamykhailiuk.com/assets/images/bio.jpg',
  imageAlt = 'Наталія Михайлюк',
  children,
}: TwoColProps) {
  return (
    <div className="container two-col">
      <img src={image} alt={imageAlt} {...imageSize(image, [640, 640])} loading="lazy" decoding="async" />
      <div>{children}</div>
    </div>
  );
}

export interface StatProps {
  /** The figure itself — serif, 2.2rem, clay. Short: `18+`, `2008`, `60 хв`. */
  value?: ReactNode;
  /** What it counts, in lower case. */
  label?: ReactNode;
}

/** One figure and its caption. Lives inside `StatRow`. */
export function Stat({ value = '18+', label = 'років практики' }: StatProps) {
  return (
    <div>
      <div className="stat-num">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export interface StatRowProps {
  /** Three `Stat`s — the grid is fixed at three columns, two on phones. */
  children?: ReactNode;
}

/** Three figures between hairline rules. Sits inside the bio column. */
export function StatRow({ children }: StatRowProps) {
  return (
    <div className="stats">
      {children ?? (
        <>
          <Stat />
          <Stat value="2008" label="з початку приватної практики" />
          <Stat value="60 хв" label="триває сесія" />
        </>
      )}
    </div>
  );
}

export interface FactProps {
  value?: ReactNode;
  label?: ReactNode;
}

/** One fact inside `FactGrid`. The value may be a word (`Онлайн`) as readily as a number. */
export function Fact({ value = '60 хв', label = 'триває одна сесія' }: FactProps) {
  return (
    <div>
      <div className="fact-num">{value}</div>
      <div className="fact-label">{label}</div>
    </div>
  );
}

export interface FactGridProps {
  /** `Fact` elements — four fit comfortably. */
  children?: ReactNode;
}

/** A sand panel of practical facts, 56px of padding, auto-fitting from 220px. */
export function FactGrid({ children }: FactGridProps) {
  return (
    <div className="facts">
      {children ?? (
        <>
          <Fact />
          <Fact value="Онлайн" label="відеодзвінок — для індивідуальних і сімейних сесій" />
          <Fact value="Офлайн" label="кабінет на Нивках — усі формати, зокрема групи" />
          <Fact value="14+" label="вік, з якого працюю з підлітками" />
        </>
      )}
    </div>
  );
}
