import { ButtonRow, Button } from 'nataliia-ds';

export const Default = () => <ButtonRow />;

export const Centered = () => <ButtonRow centered />;

export const SingleButton = () => (
  <ButtonRow>
    <Button>Написати в Telegram</Button>
  </ButtonRow>
);
