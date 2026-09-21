import { Section, SectionHead, StepList } from 'nataliia-ds';

export const Default = () => (
  <Section>
    <SectionHead eyebrow="Перша зустріч" title="Як усе відбувається" />
    <StepList />
  </Section>
);

export const Alt = () => (
  <Section alt>
    <SectionHead title="Теми, з якими до мене приходять найчастіше" />
  </Section>
);

export const Tight = () => (
  <Section spacing="tight">
    <SectionHead title="Три формати роботи" />
  </Section>
);
