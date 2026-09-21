import { Quote } from 'nataliia-ds';

// Quote only ever appears inside QuoteWall, and its serif italic type comes from the
// `.quotes .quote-grid` context. Rendered bare it falls back to browser defaults, so these
// previews reproduce that context — the same markup QuoteWall emits around it.
const Band = ({ children }: { children: React.ReactNode }) => (
  <div className="quotes" style={{ padding: '56px 48px', borderRadius: 4 }}>
    <div className="quote-grid">{children}</div>
  </div>
);

export const Single = () => (
  <Band>
    <Quote />
  </Band>
);

export const Couple = () => (
  <Band>
    <Quote attribution="Ігор та Марина, 41 і 39 років">
      «Ми прийшли парою на межі розлучення. Не всі відповіді були простими, але ми нарешті почули одне одного.»
    </Quote>
  </Band>
);

export const Pair = () => (
  <Band>
    <Quote />
    <Quote attribution="Катерина, 28 років">
      «Тривога не зникла за один день, але я навчилася з нею жити й більше не боюся власних емоцій.»
    </Quote>
  </Band>
);
