import { TopicTile } from 'nataliia-ds';

export const Default = () => <TopicTile />;

export const Trauma = () => (
  <TopicTile
    title="Травма і психосоматика"
    image="https://www.nataliiamykhailiuk.com/assets/images/tile-trauma.jpg"
    imageAlt="Травма і психосоматика"
    href="/practice/#travma-psykhosomatyka"
  >
    Проживання травматичного досвіду та тілесні реакції на нього.
  </TopicTile>
);

export const Burnout = () => (
  <TopicTile
    title="Робота і вигорання"
    image="https://www.nataliiamykhailiuk.com/assets/images/tile-work-stress.jpg"
    imageAlt="Робота і вигорання"
    href="/practice/#robota-vyhorannia"
  >
    Втрата сенсу в професії та управління робочим стресом.
  </TopicTile>
);
