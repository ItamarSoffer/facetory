import React from 'react';
import { Popconfirm, Menu, Dropdown, Tooltip, message } from "antd";
import { QuestionCircleOutlined, EditOutlined, MoreOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";

const menu = (
    <Menu direction="right">
        <Menu.Item key="1" icon={<EditOutlined />}>
            ערוך
      </Menu.Item>
        <Menu.Item key="2" icon={<CopyOutlined />}>
            שכפול
      </Menu.Item>
        <Menu.Item key="3" style={{ color: "red", "font-weight": "bold" }} icon={<DeleteOutlined />}>
            <Popconfirm
                title="בטוח שאתה רוצה למחוק?"
                onConfirm={() => message.error("הסיפור נמחק")}
                icon={<QuestionCircleOutlined style={{ color: 'red', "font-weight": "bold" }}
                />}
                okText="כן, תמחק"
                cancelText="בטל"
            >
                מחיקה
      </Popconfirm>

        </Menu.Item>

    </Menu>
);


const ThreeDotsMenu = props => (<Dropdown.Button type="text"
    icon={<MoreOutlined style={{ color: "white" }} />}

    buttonsRender={([leftButton, rightButton]) => [
        <Tooltip title="tooltip" key="leftButton">
            {leftButton}
        </Tooltip>,
        React.cloneElement(rightButton, { ghost: true }),
    ]}
    overlay={menu} size="small" style={{ position: "absolute", bottom: '10px' }}>

</Dropdown.Button>)

export default ThreeDotsMenu;