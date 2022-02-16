import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, message } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import storage from "../../lib/services/storage";
import { useUserRole } from "../loginState";
import { HeaderIcon } from "./styles";
import axios from "axios";
import { IResponse } from "../model/api";

export default function UserIcon() {
  const router = useRouter();
  const base = "http://cms.chtoma.com/api";

  const onLogout = async () => {
    const userToken = storage.token;
    const isLogout = await axios
      .post<Promise<IResponse<boolean>>>(
        `${base}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => res.data)
      .catch(function (error) {
        console.log(isLogout);
        console.log(error);
        message.error(error.response.data.msg);
      });

    if (isLogout) {
      storage.deleteUserInfo();
      router.push("/login");
    }
  };
  const userRole = useUserRole();
  const [avatar, setAvatar] = useState("");

  return (
    <HeaderIcon style={{ marginLeft: "2em" }}>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item onClick={onLogout}>
              <LogoutOutlined />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        }
        placement="bottomLeft"
      >
        {avatar ? <Avatar src={avatar} /> : <Avatar icon={<UserOutlined />} />}
      </Dropdown>
    </HeaderIcon>
  );
}
