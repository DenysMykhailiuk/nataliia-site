import { ContactRow } from 'nataliia-ds';

export const Telegram = () => <ContactRow />;

export const Phone = () => (
  <ContactRow title="+38 067 506 9911" href="tel:+380675069911" icon="" glyph="☏" external={false}>
    Телефон і Viber
  </ContactRow>
);

export const Email = () => (
  <ContactRow
    title="natalia.mihayluk@gmail.com"
    href="mailto:natalia.mihayluk@gmail.com"
    icon=""
    glyph="✉"
    external={false}
  >
    Пошта — для розгорнутих листів
  </ContactRow>
);

export const Facebook = () => (
  <ContactRow
    title="Facebook"
    href="https://www.facebook.com/natalia.mihayluk"
    icon="https://www.nataliiamykhailiuk.com/assets/images/facebook-icon.png"
  >
    Дописи про практику
  </ContactRow>
);
