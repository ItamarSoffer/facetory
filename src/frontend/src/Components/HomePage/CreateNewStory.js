import React from 'react';
import { PlusOutlined } from "@ant-design/icons";

import { Button } from "antd";

const NewStoryButton = props => (
    <>
        <div style={{ "padding-top": "40px", "padding-bottom": "30px", direction: "rtl" }}>
            <Button onClick={() => { props.history.push({ pathname: "/create" }) }} type="primary" shape="round" icon={<PlusOutlined />} size={"large"}>
                צור סיפור חדש
</Button>
        </div>
    </>
);

export default NewStoryButton;