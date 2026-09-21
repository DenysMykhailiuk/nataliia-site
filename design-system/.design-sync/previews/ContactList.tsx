import { ContactList, ContactRow } from 'nataliia-ds';

export const ContactsPage = () => <ContactList />;

export const WithFacebook = () => (
  <ContactList>
    <ContactRow />
    <ContactRow title="+38 067 506 9911" href="tel:+380675069911" icon="" glyph="☏" external={false}>
      Телефон і Viber
    </ContactRow>
    <ContactRow
      title="Facebook"
      href="https://www.facebook.com/natalia.mihayluk"
      icon="https://www.nataliiamykhailiuk.com/assets/images/facebook-icon.png"
    >
      Дописи про практику
    </ContactRow>
  </ContactList>
);
