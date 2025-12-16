import React, { useEffect, useMemo, useState } from "react";
import {
  Drawer,
  Avatar,
  Descriptions,
  Skeleton,
  Tag,
  Divider,
  Button,
  Space,
  Empty,
} from "antd";

const API_USERS = "http://localhost:8017/api/users";

export default function AccountInfoDrawer({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const localUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const fetchDetail = async () => {
      if (!localUser?._id) {
        setUserData(null);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${API_USERS}/${localUser._id}`);
        const data = await res.json();
        if (res.ok) setUserData(data);
        else setUserData(localUser);
      } catch {
        setUserData(localUser);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [open, localUser]);

  const avatar =
    userData?.avatar ||
    localUser?.avatar ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const name = userData?.name || localUser?.name || "—";
  const email = userData?.email || localUser?.email || "—";
  const roleName = userData?.role_id?.name || localUser?.role_id?.name || "—";
  const createdAt = userData?.created_at || localUser?.created_at;
  const updatedAt = userData?.updated_at || localUser?.updated_at;

  return (
    <Drawer
      title="Thông tin tài khoản"
      open={open}
      onClose={onClose}
      width={420}
    >
      {!localUser ? (
        <Empty
          description={
            <div>
              Bạn chưa đăng nhập. <a href="/haiadmin/login">Đăng nhập</a>
            </div>
          }
        />
      ) : loading ? (
        <Skeleton active avatar paragraph={{ rows: 6 }} />
      ) : (
        <>
          <Space size={16} align="center" style={{ marginBottom: 16 }}>
            <Avatar size={72} src={avatar} alt={name} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{name}</div>
              <div style={{ color: "#64748b" }}>{email}</div>
              <div style={{ marginTop: 6 }}>
                <Tag
                  color={
                    roleName === "admin"
                      ? "red"
                      : roleName === "editor"
                      ? "blue"
                      : "green"
                  }
                >
                  {String(roleName).toUpperCase()}
                </Tag>
              </div>
            </div>
          </Space>

          <Divider style={{ margin: "12px 0" }} />

          <Descriptions
            column={1}
            size="small"
            colon
            labelStyle={{ width: 120, color: "#475569" }}
          >
            <Descriptions.Item label="Họ và tên">{name}</Descriptions.Item>
            <Descriptions.Item label="Email">{email}</Descriptions.Item>
            <Descriptions.Item label="Vai trò">{roleName}</Descriptions.Item>
            <Descriptions.Item label="Tạo lúc">
              {createdAt ? new Date(createdAt).toLocaleString() : "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Cập nhật">
              {updatedAt ? new Date(updatedAt).toLocaleString() : "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Avatar">
              <a href={avatar} target="_blank" rel="noreferrer">
                Xem ảnh
              </a>
            </Descriptions.Item>
          </Descriptions>

          <Divider style={{ margin: "12px 0" }} />
          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button onClick={onClose}>Đóng</Button>
          </Space>
        </>
      )}
    </Drawer>
  );
}
