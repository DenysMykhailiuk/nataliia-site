import { FaqItem } from 'nataliia-ds';

// Lives in the dark footer, where `.site-footer details` supplies the rules and type.
const FooterColumn = ({ children }: { children: React.ReactNode }) => (
  <div className="site-footer" style={{ padding: 32, borderRadius: 4 }}>
    <div className="footer-head">Часті запитання</div>
    {children}
  </div>
);

export const Closed = () => (
  <FooterColumn>
    <FaqItem />
    <FaqItem question="Чи працюєте ви з підлітками?">Так, з підлітками від 14 років.</FaqItem>
    <FaqItem question="Що таке гештальт-терапія?">
      Підхід, у якому ми досліджуємо ваш досвід тут і зараз — почуття, тілесні реакції, спосіб будувати контакт з
      іншими.
    </FaqItem>
  </FooterColumn>
);

export const Expanded = () => (
  <FooterColumn>
    <FaqItem open />
    <FaqItem question="Чи працюєте ви з підлітками?" open>
      Так, з підлітками від 14 років.
    </FaqItem>
  </FooterColumn>
);
