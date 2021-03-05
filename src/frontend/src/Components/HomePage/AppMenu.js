import React from 'react';
import {Menu} from "antd";
import firebase from "firebase";
import {
    LoginOutlined,
    RedditOutlined
} from '@ant-design/icons';

function AppMenu() {
    return <Menu theme="dark" mode="horizontal" selectable={false}>
        <Menu.Item key="logout" onClick={() => {
            firebase.auth().signOut().then((v) => (console.log('done')));
        }}>
            <LoginOutlined />
        </Menu.Item>
        <RedditOutlined style={{float: "left", fontSize: "32px", marginTop: "5px"}}/>
    </Menu>;
}

export default AppMenu
