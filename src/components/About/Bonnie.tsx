import dynamic from 'next/dynamic';
import Img from '../../../utils/Img';
import bonnies from '../../../src/bonnies';
import { useState } from 'react';

const deltaDeg = 360 / bonnies.length;

const MapWithNoSSR = dynamic(() => import('../../../src/components/LeafletMap') as any, {
  ssr: false,
});

const Bonnie = (props: any) => {
  const [showContinents, setShowContinents] = useState(false);

  return (
    <>
      <h3>Bonnie</h3>
      <p>
        BonnieBelle and her sisters are roaming bots who travel the grid collecting statistics. You
        can follow their progress on the map below.
      </p>
      <p>
        For more info about roaming bots in general, Lou Netizen maintains an excellent 3rd-party
        website at{' '}
        <a target="_blank" href="https://www.lounetizen.com/botdata" rel="noreferrer">
          https://www.lounetizen.com/botdata
        </a>
      </p>
      <div style={{ height: '640px' }}>
        <MapWithNoSSR {...props} showContinents={showContinents} />
      </div>
      <div style={{ marginTop: '20px', border: '1px solid #bbb', padding: '10px' }}>
        {bonnies.map((b: string, i) => (
          <span
            key={b}
            style={{ display: 'inline-block', paddingRight: '1em', whiteSpace: 'nowrap' }}
          >
            <Img
              style={{
                height: '1em',
                filter: `hue-rotate(${i * deltaDeg}deg)`,
                marginRight: '2px',
              }}
              src={`images/marker-icon.png`}
            />
            {b}
          </span>
        ))}
        <span
          style={{
            display: 'inline-block',
            paddingRight: '1em',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
          onClick={() => {
            setShowContinents(!showContinents);
          }}
        >
          <Img
            style={{
              height: '0.6em',
              marginRight: '2px',
            }}
            src={showContinents ? `images/check.png` : `images/uncheck.png`}
          />
          Continents
        </span>
      </div>
    </>
  );
};

export default Bonnie;
