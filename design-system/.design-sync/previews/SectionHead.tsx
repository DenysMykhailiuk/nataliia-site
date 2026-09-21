import { SectionHead } from 'nataliia-ds';

export const TitleOnly = () => <SectionHead title="Теми, з якими до мене приходять найчастіше" />;

export const WithEyebrow = () => <SectionHead eyebrow="Перша зустріч" title="Як усе відбувається" />;

export const WithParagraph = () => (
  <SectionHead eyebrow="Відгуки клієнтів" title="Що кажуть люди після терапії">
    <p style={{ margin: 0, color: 'var(--muted)' }}>
      Усі відгуки публікуються дослівно, з дозволу авторів.
    </p>
  </SectionHead>
);
