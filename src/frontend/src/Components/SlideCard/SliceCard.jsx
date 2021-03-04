import React from 'react';
import { Card, Image } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';

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
              <Layout >
                <Content style={{ backgroundColor: 'red', height: '100%'}} >

                </Content>
              </Layout>
            </Card>
    )
}

export default SlideCard;
