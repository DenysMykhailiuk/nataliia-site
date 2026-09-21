import { InlineLink } from 'nataliia-ds';

export const InProse = () => (
  <p style={{ margin: 0, maxWidth: 520 }}>
    Працюю з кризовими й тривожними станами, психосоматикою та стосунками.{' '}
    <InlineLink href="/practice/">Докладніше про мою діяльність</InlineLink>
  </p>
);

export const OnDarkBand = () => (
  <div className="quotes" style={{ padding: 32, borderRadius: 4 }}>
    <InlineLink href="/reviews/" onDark>
      Усі відгуки
    </InlineLink>
  </div>
);
