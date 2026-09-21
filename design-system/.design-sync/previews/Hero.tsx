import { Hero, Button } from 'nataliia-ds';

export const Homepage = () => <Hero />;

export const ShortHeadline = () => (
  <Hero title="Простір, де можна видихнути" eyebrow="Гештальт-терапія · Київ">
    Індивідуальні, сімейні та групові сесії — у кабінеті на Нивках або відеодзвінком.
  </Hero>
);

export const SingleAction = () => (
  <Hero
    title="Зцілення починається з розуміння себе"
    actions={<Button variant="light">Написати в Telegram</Button>}
  >
    Простір, де можна говорити чесно — про тривогу, стосунки, втому й те, що давно нікому не розповідали.
  </Hero>
);
