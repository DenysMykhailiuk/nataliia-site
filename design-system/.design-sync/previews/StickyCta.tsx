import { StickyCta } from 'nataliia-ds';

// StickyCta is fixed to the bottom-right of the viewport. The previews render the real
// component and only un-fix it, so the card shows the component rather than a stand-in.
const Unpinned = ({ children }: { children: React.ReactNode }) => (
  <div className="cta-preview">
    <style>{`.cta-preview .sticky-cta{position:static;box-shadow:none}`}</style>
    {children}
  </div>
);

export const Default = () => (
  <Unpinned>
    <StickyCta />
  </Unpinned>
);

export const OverAPage = () => (
  <div
    className="cta-preview"
    style={{ position: 'relative', height: 200, background: 'var(--bg-alt)', borderRadius: 4, padding: 28 }}
  >
    <style>{`.cta-preview .sticky-cta{position:absolute;right:28px;bottom:28px}`}</style>
    <p style={{ margin: 0, color: 'var(--muted)' }}>Сторінка гортається під кнопкою — вона завжди на екрані.</p>
    <StickyCta />
  </div>
);
