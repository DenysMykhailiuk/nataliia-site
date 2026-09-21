import type { ReactNode } from 'react';
import { Button, ButtonRow, Eyebrow, IMAGE_BASE, PHONE_HREF, PHONE_LABEL, TELEGRAM_URL } from './primitives';
import { Container } from './layout';

export interface NavItem {
  label: string;
  href: string;
}

/** The five items, in their fixed order. A sixth breaks the phone layout — see PRODUCT.md. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Головна', href: '/' },
  { label: 'Моя діяльність', href: '/practice/' },
  { label: 'Мої послуги', href: '/services/' },
  { label: 'Відгуки', href: '/reviews/' },
  { label: 'Контакти', href: '/contacts/' },
];

export interface SiteHeaderProps {
  /** Defaults to the site's five sections. */
  items?: NavItem[];
  /** `href` of the current page — marks it `aria-current` and underlines it. */
  current?: string;
  /** The English word under the wordmark. An open brand decision — may become `Психотерапія`. */
  logoDescription?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Where the site's images live. The pages use `assets/images` or `../assets/images`. */
  assetBase?: string;
}

/**
 * Sticky translucent header: wordmark, five links, and a compact booking pill.
 *
 * The menu is at its width limit — on phones it becomes a 3 + 2 grid, and in narrow
 * landscape the CTA is hidden because the floating one is always reachable.
 */
export function SiteHeader({
  items = NAV_ITEMS,
  current = '/',
  logoDescription = 'Psychotherapy',
  ctaLabel = 'Записатися',
  ctaHref = TELEGRAM_URL,
  assetBase = IMAGE_BASE,
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Container>
        <a className="logo" href="/">
          <img
            src={`${assetBase}/wordmark-dark.png`}
            alt="Наталія Михайлюк"
            width={693}
            height={133}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <span className="logo-desc" lang="en">
            {logoDescription}
          </span>
        </a>
        <nav className="site-nav">
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} {...(item.href === current ? { 'aria-current': 'page' as const } : {})}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={ctaHref} size="sm">
            {ctaLabel}
          </Button>
        </nav>
      </Container>
    </header>
  );
}

export interface HeroProps {
  /** The `h1`, at 3.4rem over the photograph. */
  title?: ReactNode;
  /** Uppercase label above it, in a lighter tone than elsewhere. */
  eyebrow?: ReactNode;
  /** One sentence, held to 520px. */
  children?: ReactNode;
  /** Buttons — `light` and `outlineLight` are the pair that reads on the image. */
  actions?: ReactNode;
}

/**
 * The homepage opener: a photograph darkened left-to-right with white text over it.
 *
 * 560px tall on desktop, height-driven on phones. Only the homepage has one.
 */
export function Hero({
  title = 'Зцілення починається з розуміння себе',
  eyebrow = 'Психотерапія · Київ офлайн та онлайн',
  children = 'Простір, де можна говорити чесно — про тривогу, стосунки, втому й те, що давно нікому не розповідали.',
  actions,
}: HeroProps) {
  return (
    <section className="hero">
      <Container>
        <div className="hero-inner">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1>{title}</h1>
          <p>{children}</p>
          <div className="btn-row">
            {actions ?? (
              <>
                <Button variant="light">Написати в Telegram</Button>
                <Button variant="outlineLight" href={PHONE_HREF}>
                  {PHONE_LABEL}
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export interface CtaBandProps {
  /** The invitation, as an `h2` at 2.7rem. */
  title?: ReactNode;
  /** One supporting sentence, held to 54 characters' measure. */
  children?: ReactNode;
  /** Defaults to Telegram plus the phone number. */
  actions?: ReactNode;
  /** Adds 70px above — used when the band follows a flush section. */
  spaced?: boolean;
}

/** The centred sand band that closes every page with an invitation to write. */
export function CtaBand({
  title = 'Зробити перший крок буває найважче',
  children = 'Напишіть мені кілька рядків — і ми домовимось про зручний час.',
  actions,
  spaced = false,
}: CtaBandProps) {
  return (
    <section className={spaced ? 'cta cta-spaced' : 'cta'}>
      <Container>
        <h2>{title}</h2>
        <p>{children}</p>
        <ButtonRow>{actions}</ButtonRow>
      </Container>
    </section>
  );
}

export interface FaqItemProps {
  /** The question, as the `summary`. */
  question?: ReactNode;
  /** The answer, revealed on open. */
  children?: ReactNode;
  /** Renders already expanded. The footer leaves every question closed. */
  open?: boolean;
}

/** One collapsible question. Native `details` — the footer holds three. */
export function FaqItem({
  question = 'Чи підходить мені терапія?',
  children = 'Якщо ви відчуваєте, що не справляєтесь самі — цього вже достатньо, щоб прийти. Діагноз не потрібен.',
  open = false,
}: FaqItemProps) {
  return (
    <details open={open}>
      <summary>{question}</summary>
      <p>{children}</p>
    </details>
  );
}

export interface SiteFooterProps {
  /** Replaces the three default columns. */
  children?: ReactNode;
  /** The line on the left of the bottom rule. */
  copyright?: ReactNode;
  /** Where the site's images live. The pages use `assets/images` or `../assets/images`. */
  assetBase?: string;
}

/**
 * The dark closing band: logo and one line about the practice, contacts with social icons,
 * and three FAQ disclosures. Identical on every page.
 */
export function SiteFooter({
  children,
  copyright = '© 2008–2026 Наталія Михайлюк',
  assetBase = IMAGE_BASE,
}: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          {children ?? (
            <>
              <div>
                <img src={`${assetBase}/logo.png`} alt="Наталія Михайлюк" width={400} height={276} loading="lazy" decoding="async" />
                <p className="dim">Сертифікований гештальт-терапевт. Приватна практика з 2008 року.</p>
              </div>
              <div>
                <div className="footer-head">Контакти</div>
                <p>
                  <a href={PHONE_HREF}>{PHONE_LABEL}</a>
                </p>
                <p>
                  <a href="mailto:natalia.mihayluk@gmail.com">natalia.mihayluk@gmail.com</a>
                </p>
                <p className="dim">
                  Київ, Берестейський проспект, 90а
                  <br />
                  станція метро Нивки, 03062
                </p>
                <div className="social">
                  <a href={TELEGRAM_URL} target="_blank" rel="noopener">
                    <img src={`${assetBase}/telegram-icon.png`} alt="Telegram" width={201} height={201} loading="lazy" decoding="async" />
                  </a>
                  <a href="https://www.facebook.com/natalia.mihayluk" target="_blank" rel="noopener">
                    <img src={`${assetBase}/facebook-icon.png`} alt="Facebook" width={200} height={200} loading="lazy" decoding="async" />
                  </a>
                </div>
              </div>
              <div>
                <div className="footer-head">Часті запитання</div>
                <FaqItem />
                <FaqItem question="Чи працюєте ви з підлітками?">Так, з підлітками від 14 років.</FaqItem>
                <FaqItem question="Що таке гештальт-терапія?">
                  Підхід, у якому ми досліджуємо ваш досвід тут і зараз — почуття, тілесні реакції, спосіб будувати
                  контакт з іншими.
                </FaqItem>
              </div>
            </>
          )}
        </div>
        <div className="footer-bottom">
          <div>{copyright}</div>
          <div>Усі права захищені</div>
        </div>
      </Container>
    </footer>
  );
}
