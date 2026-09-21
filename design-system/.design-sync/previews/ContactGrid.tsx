import { ContactGrid, ContactList, Lede } from 'nataliia-ds';

export const ContactsPage = () => (
  <ContactGrid>
    <h1>Напишіть мені</h1>
    <Lede>
      Не потрібно одразу пояснювати все. Кількох рядків про те, що вас турбує, достатньо, щоб почати розмову.
    </Lede>
    <ContactList />
  </ContactGrid>
);
