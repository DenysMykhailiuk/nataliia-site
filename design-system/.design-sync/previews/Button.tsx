import { Button } from 'nataliia-ds';

export const OnLight = () => (
  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
    <Button>Написати в Telegram</Button>
    <Button variant="ghost" href="tel:+380675069911">
      +38 067 506 9911
    </Button>
  </div>
);

export const OnDarkPhoto = () => (
  <div
    style={{
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap',
      alignItems: 'center',
      background: 'linear-gradient(90deg, rgba(37,33,29,.86) 0%, rgba(37,33,29,.6) 100%)',
      padding: 28,
      borderRadius: 4,
    }}
  >
    <Button variant="light">Написати в Telegram</Button>
    <Button variant="outlineLight" href="tel:+380675069911">
      +38 067 506 9911
    </Button>
  </div>
);

export const Compact = () => <Button size="sm">Записатися</Button>;
