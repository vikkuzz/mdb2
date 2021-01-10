import React from 'react';

function Genres(props) {
  const { genres } = props;

  let idx = 999;

  const elem = genres.map((item) => {
    idx += 1;

    return (
      <div
        key={idx}
        style={{
          background: '#FAFAFA',
          border: '1px solid #D9D9D9',
          borderRadius: '2px',
          margin: '4px',
          fontWeight: 'normal',
          fontSize: '12px',
          lineHeight: '15px',
          color: 'rgba(0, 0, 0, 0.65)',
        }}
      >
        {item}
      </div>
    );
  });

  return <div style={{ display: 'flex' }}>{elem}</div>;
}

export default Genres;
