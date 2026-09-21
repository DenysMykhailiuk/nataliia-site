import { SkipLink } from 'nataliia-ds';

// The real SkipLink is fixed to the viewport and clipped until focused — invisible in a
// card. These previews render the actual component and neutralise only those two rules,
// so what you see is the component's own markup and styling in its visible state.
const Revealed = ({ children }: { children: React.ReactNode }) => (
  <div className="skip-preview" style={{ minHeight: 64 }}>
    <style>{`.skip-preview .skip-link{position:static;clip-path:none;display:inline-block}`}</style>
    {children}
  </div>
);

export const Focused = () => (
  <Revealed>
    <SkipLink />
  </Revealed>
);

export const CustomTarget = () => (
  <Revealed>
    <SkipLink href="#reviews">Перейти до відгуків</SkipLink>
  </Revealed>
);
