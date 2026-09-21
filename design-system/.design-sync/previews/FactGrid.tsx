import { FactGrid, Fact } from 'nataliia-ds';

export const ContactsPage = () => <FactGrid />;

export const Three = () => (
  <FactGrid>
    <Fact />
    <Fact value="Онлайн" label="відеодзвінок — для індивідуальних і сімейних сесій" />
    <Fact value="Офлайн" label="кабінет на Нивках — усі формати, зокрема групи" />
  </FactGrid>
);
