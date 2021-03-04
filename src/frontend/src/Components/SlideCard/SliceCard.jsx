import React from 'react';
import { Card } from 'antd';

const SlideCard = props => {
    const { imageUrl, cardProps } = props;

    const borderRadius = '10px'

    return (
            <Card
                style={{
                    width: '70%',
                    margin: '8px',
                    borderRadius: borderRadius,
                }}
                bodyStyle={{
                    borderRadius: borderRadius,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                }}

                {...cardProps}
            >
                
            </Card>
    )
}

export default SlideCard;
