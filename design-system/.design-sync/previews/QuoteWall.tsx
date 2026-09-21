import { QuoteWall, Quote } from 'nataliia-ds';

export const Homepage = () => <QuoteWall />;

export const WithoutMoreLink = () => (
  <QuoteWall moreHref={null}>
    <Quote attribution="Катерина, 28 років">
      «Тривога не зникла за один день, але я навчилася з нею жити й більше не боюся власних емоцій.»
    </Quote>
    <Quote attribution="Олена, 34 роки">
      «Уперше за багато років я змогла говорити про те, що зі мною відбувається, без страху бути осудженою.»
    </Quote>
  </QuoteWall>
);
