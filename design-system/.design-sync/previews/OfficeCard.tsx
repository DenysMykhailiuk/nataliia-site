import { OfficeCard } from 'nataliia-ds';

export const Default = () => <OfficeCard />;

export const ShortNote = () => (
  <OfficeCard eyebrow="Кабінет" address="Київ, Берестейський проспект, 90а" meta="Станція метро «Нивки», 03062">
    Точну адресу входу я надішлю після того, як ми домовимось про час.
  </OfficeCard>
);
