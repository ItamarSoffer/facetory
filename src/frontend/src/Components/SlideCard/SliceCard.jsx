import React from 'react';
import { Card, Image } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import Meta from 'antd/lib/card/Meta';
import Avatar from 'antd/lib/avatar/avatar';

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
