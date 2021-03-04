import React from 'react';
import { Button, Space } from 'antd';
import {
    PlusSquareOutlined,
  } from '@ant-design/icons';

const NewSquare = props => {
    return (
      <Space align='center' direction="vertical">
        <Button type="dashed" size="large"  icon = {<PlusSquareOutlined/>} onClick={props.onClick} style={{height : "100px", width : "100px"}}>
            </Button>
            <text>Add Slide</text>
      </Space>
    );
}

export default NewSquare;
