import { StatRow, Stat } from 'nataliia-ds';

export const Default = () => <StatRow />;

export const Custom = () => (
  <StatRow>
    <Stat value="18+" label="років практики" />
    <Stat value="14+" label="вік, з якого працюю з підлітками" />
    <Stat value="3" label="формати роботи" />
  </StatRow>
);
