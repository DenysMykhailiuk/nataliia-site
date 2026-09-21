import type { ReactNode } from 'react';

/** Where the practice's own links point. Used as defaults so a card never renders a dead control. */
export const TELEGRAM_URL = 'https://t.me/nataliiamykhailiuk';
export const PHONE_HREF = 'tel:+380675069911';
export const PHONE_LABEL = '+38 067 506 9911';
export const IMAGE_BASE = 'https://www.nataliiamykhailiuk.com/assets/images';

// Intrinsic sizes the site's own <img> tags declare, keyed by file name. Components look
// their width/height up here so the attributes match the live markup for every image,
// instead of one hard-coded size per component.
const IMAGE_SIZES: Record<string, [number, number]> = {
  'bio.jpg': [640, 640],
  'tile-personal-growth.jpg': [700, 467],
  'tile-divorce.jpg': [700, 466],
  'tile-stress-anxiety.jpg': [700, 419],
  'tile-parent-child.jpg': [700, 466],
  'tile-work-stress.jpg': [700, 466],
  'tile-trauma.jpg': [700, 466],
  'telegram-icon.png': [201, 201],
  'facebook-icon.png': [200, 200],
  'logo.png': [400, 276],
  'wordmark-dark.png': [693, 133],
};

/** Width and height for a site image, falling back when the file is not one of the site's. */
export function imageSize(src: string, fallback: [number, number]): { width: number; height: number } {
  const name = src.split('/').pop()?.split('?')[0] ?? '';
  const [width, height] = IMAGE_SIZES[name] ?? fallback;
  return { width, height };
}

export interface ButtonProps {
  /** Link text. */
  children?: ReactNode;
  /** Destination. Every button on this site is a link — there are no form submits. */
  href?: string;
  /**
   * `solid` is the clay pill used on light backgrounds; `ghost` is its outlined twin.
   * `light` and `outlineLight` are the pair used over the hero photograph.
   */
  variant?: 'solid' | 'ghost' | 'light' | 'outlineLight';
  /** `sm` is the compact size used in the header. */
  size?: 'md' | 'sm';
  /** Opens in a new tab with `rel="noopener"`. */
  external?: boolean;
}

const VARIANT_CLASS: Record<NonNullable<ButtonProps['variant']>, string> = {
  solid: '',
  ghost: ' btn-ghost',
  light: ' btn-light',
  outlineLight: ' btn-outline-light',
};

/**
 * The site's only button: a fully rounded pill, clay by default.
 *
 * Always an anchor. Use `light`/`outlineLight` over the hero image, `solid`/`ghost` everywhere else.
 */
export function Button({
  children = 'Написати в Telegram',
  href = TELEGRAM_URL,
  variant = 'solid',
  size = 'md',
  external = false,
}: ButtonProps) {
  const cls = `btn${VARIANT_CLASS[variant]}${size === 'sm' ? ' btn-sm' : ''}`;
  return (
    <a className={cls} href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
      {children}
    </a>
  );
}

export interface ButtonRowProps {
  /** Two `Button`s, as a rule. Below 480px they stack to full width. */
  children?: ReactNode;
  /** Centres the row — what the CTA band does. */
  centered?: boolean;
}

/** Lays buttons side by side with a 14px gap, wrapping and then stacking on narrow screens. */
export function ButtonRow({ children, centered = false }: ButtonRowProps) {
  return (
    <div className="btn-row" style={centered ? { justifyContent: 'center' } : undefined}>
      {children ?? (
        <>
          <Button />
          <Button variant="ghost" href={PHONE_HREF}>
            {PHONE_LABEL}
          </Button>
        </>
      )}
    </div>
  );
}

export interface EyebrowProps {
  /** A short label — two or three words. */
  children?: ReactNode;
}

/** The small uppercase clay label that sits above a heading. Letter-spaced, 0.8rem. */
export function Eyebrow({ children = 'Перша зустріч' }: EyebrowProps) {
  return <div className="eyebrow">{children}</div>;
}

export interface InlineLinkProps {
  children?: ReactNode;
  href?: string;
  /** Use on the dark testimonial band, where the underline and text go light. */
  onDark?: boolean;
}

/** A text link with a hairline underline — the site's "read more" affordance. */
export function InlineLink({ children = 'Докладніше', href = '#', onDark = false }: InlineLinkProps) {
  return (
    <a className={onDark ? 'inline-link quotes-more' : 'inline-link'} href={href}>
      {children}
    </a>
  );
}

export interface LedeProps {
  children?: ReactNode;
}

/** The oversized opening paragraph (1.18rem) that follows an `h1`. One per page. */
export function Lede({ children }: LedeProps) {
  return <p className="lede">{children}</p>;
}

export interface SkipLinkProps {
  children?: ReactNode;
  /** Target id, `#main` on every page. */
  href?: string;
}

/** Keyboard-only jump to the main content. Clipped until focused. */
export function SkipLink({ children = 'Перейти до основного вмісту', href = '#main' }: SkipLinkProps) {
  return (
    <a className="skip-link" href={href}>
      {children}
    </a>
  );
}

export interface StickyCtaProps {
  children?: ReactNode;
  href?: string;
  /** Where the site's images live. The pages use `assets/images` or `../assets/images`. */
  assetBase?: string;
}

/** The floating Telegram pill, fixed bottom-right on every page. Only ever one. */
export function StickyCta({ children = 'Написати мені', href = TELEGRAM_URL, assetBase = IMAGE_BASE }: StickyCtaProps) {
  return (
    <a className="sticky-cta" href={href}>
      <img src={`${assetBase}/telegram-icon.png`} alt="" width={201} height={201} loading="lazy" decoding="async" />
      {children}
    </a>
  );
}
