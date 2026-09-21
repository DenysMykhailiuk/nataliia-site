import { Container } from 'nataliia-ds';

export const WithProse = () => (
  <Container>
    <h2 style={{ margin: '0 0 12px' }}>Максимальна ширина 1180px</h2>
    <p style={{ margin: 0, color: 'var(--muted)' }}>
      Кожна секція має рівно один Container: він тримає міру тексту й бічні відступи — 32px на десктопі, 20px на
      телефоні.
    </p>
  </Container>
);
