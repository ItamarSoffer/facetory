import React from 'react';
import { Card } from 'antd';

const SlideCard = props => {
    const { imageUrl, cardProps, cardStyle} = props;

    return (
      <Card
          style={{
              width: '70%',
              margin:'8px',
              borderRadius: '10px',
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',

              position: 'relative',
              width: '70%',
              content: "",
              display: 'block',
              paddingTop: '50%',

              ...cardStyle
          }}
          {...cardProps}
      />
    )
}

export default SlideCard;
