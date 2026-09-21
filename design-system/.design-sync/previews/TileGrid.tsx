import { TileGrid, TopicTile } from 'nataliia-ds';

export const Homepage = () => <TileGrid />;

export const SixTopics = () => (
  <TileGrid>
    <TopicTile
      title="Розвиток особистості"
      image="https://www.nataliiamykhailiuk.com/assets/images/tile-personal-growth.jpg"
      imageAlt="Розвиток особистості"
    >
      Пошук сенсу, робота над самооцінкою та впевненістю в собі.
    </TopicTile>
    <TopicTile
      title="На межі розлучення"
      image="https://www.nataliiamykhailiuk.com/assets/images/tile-divorce.jpg"
      imageAlt="На межі розлучення"
    >
      Як зберегти стосунки — і як зрозуміти, коли краще відпустити.
    </TopicTile>
    <TopicTile />
    <TopicTile
      title="Батьки і діти"
      image="https://www.nataliiamykhailiuk.com/assets/images/tile-parent-child.jpg"
      imageAlt="Батьки і діти"
    >
      Взаєморозуміння в родині, конфлікти й емоційний зв’язок з дитиною.
    </TopicTile>
    <TopicTile
      title="Робота і вигорання"
      image="https://www.nataliiamykhailiuk.com/assets/images/tile-work-stress.jpg"
      imageAlt="Робота і вигорання"
    >
      Втрата сенсу в професії та управління робочим стресом.
    </TopicTile>
    <TopicTile
      title="Травма і психосоматика"
      image="https://www.nataliiamykhailiuk.com/assets/images/tile-trauma.jpg"
      imageAlt="Травма і психосоматика"
    >
      Проживання травматичного досвіду та тілесні реакції на нього.
    </TopicTile>
  </TileGrid>
);
