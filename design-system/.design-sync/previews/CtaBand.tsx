import { CtaBand, Button, ButtonRow } from 'nataliia-ds';

export const Homepage = () => <CtaBand />;

export const PracticePage = () => (
  <CtaBand
    title="Не знаєте, що з цього ваше?"
    actions={
      <>
        <Button>Написати в Telegram</Button>
        <Button variant="ghost" href="/services/">
          Мої послуги та ціни
        </Button>
      </>
    }
  >
    Це нормально. Напишіть кілька рядків про те, що вас турбує — розберемося разом.
  </CtaBand>
);

export const Spaced = () => (
  <CtaBand spaced title="Готові почати?">
    Напишіть мені — домовимось про зручний час і формат.
  </CtaBand>
);
