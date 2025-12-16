import React, { useEffect, useMemo, useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Space,
  Button,
  Form,
  Input,
  Switch,
  message,
  Card,
  Table,
  Tag,
  Modal,
  Empty,
  Select,
} from "antd";
import {
  SettingOutlined,
  MessageOutlined,
  DatabaseOutlined,
  SaveOutlined,
  ReloadOutlined,
  SearchOutlined,
  PhoneFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";

const API_BASE = "https://api.nguyenhai.com.vn";

// ================== MOCK API (localStorage) ==================
const LS = {
  SETTINGS: "bot_admin_settings_v1",
  QUICK: "bot_quick_replies_v1",
};

const DEFAULT_SETTINGS = {
  greeting: "Xin chào bạn, mình có thể giúp gì?",
  phone: "0905402989",
  zalo: "https://zalo.me/0905402989",
  theme: "#014a94",
  showContactFab: true,
  online: true,
};

const seedConversations = Array.from({ length: 8 }).map((_, i) => ({
  id: `C${1000 + i}`,
  user: `Khách ${i + 1}`,
  last: ["Xin chào", "Còn hàng không?", "Cho mình xin báo giá", "Cảm ơn bạn!"][
    i % 4
  ],
  updatedAt: dayjs()
    .subtract(i * 2, "hour")
    .toISOString(),
  status: i % 3 === 0 ? "closed" : "open",
}));

const api = {
  async getSettings() {
    const raw = localStorage.getItem(LS.SETTINGS);
    return raw ? JSON.parse(raw) : DEFAULT_SETTINGS;
  },
  async saveSettings(data) {
    localStorage.setItem(LS.SETTINGS, JSON.stringify(data));
    return true;
  },
  async getQuickReplies() {
    const raw = localStorage.getItem(LS.QUICK);
    return raw
      ? JSON.parse(raw)
      : [
          "Chào bạn, mình có thể hỗ trợ gì?",
          "Bạn để lại số điện thoại giúp mình nhé!",
          "Mình sẽ phản hồi sớm nhất có thể.",
        ];
  },
  async saveQuickReplies(arr) {
    localStorage.setItem(LS.QUICK, JSON.stringify(arr));
    return true;
  },
  async listConversations(filter) {
    const { status } = filter || {};
    return status
      ? seedConversations.filter((c) => c.status === status)
      : seedConversations;
  },
  async getConversation(id) {
    const base = seedConversations.find((c) => c.id === id);
    if (!base) return null;
    const messages = [
      {
        id: 1,
        sender: "bot",
        text: "Xin chào!",
        ts: dayjs().subtract(25, "minute").toISOString(),
      },
      {
        id: 2,
        sender: "user",
        text: "Cho mình hỏi còn hàng không?",
        ts: dayjs().subtract(24, "minute").toISOString(),
      },
      {
        id: 3,
        sender: "bot",
        text: "Bạn để lại số nhé!",
        ts: dayjs().subtract(23, "minute").toISOString(),
      },
    ];
    return { ...base, messages };
  },
};
// ================== END MOCK API ==================

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

// Gọi API thật /api/chat/
async function chatAPI(messageText) {
  const res = await fetch(`${API_BASE}/api/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: messageText }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "Server error");
  return data; // kỳ vọng { reply: "..." }
}

export default function AdminChatbot() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("conversations");

  // settings
  const [form] = Form.useForm();
  const themeWatch = Form.useWatch("theme", form);
  const greetingWatch = Form.useWatch("greeting", form);
  const [saving, setSaving] = useState(false);

  // quick replies
  const [quick, setQuick] = useState([]);
  const [newQR, setNewQR] = useState("");

  // conversations
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  // TRY CHAT (API thật)
  const [tryInput, setTryInput] = useState("");
  const [tryReply, setTryReply] = useState("");
  const [tryLoading, setTryLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const s = await api.getSettings();
      form.setFieldsValue(s);
      const q = await api.getQuickReplies();
      setQuick(q);
      loadTable();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTable = async () => {
    setLoading(true);
    const res = await api.listConversations({ status });
    const filtered = search
      ? res.filter(
          (r) =>
            r.user.toLowerCase().includes(search.toLowerCase()) ||
            r.last.toLowerCase().includes(search.toLowerCase()) ||
            r.id.toLowerCase().includes(search.toLowerCase())
        )
      : res;
    setRows(filtered);
    setLoading(false);
  };

  useEffect(() => {
    loadTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const cols = useMemo(
    () => [
      { title: "ID", dataIndex: "id", width: 100 },
      {
        title: "Khách",
        dataIndex: "user",
        width: 160,
        render: (v) => <Text>{v}</Text>,
      },
      { title: "Tin cuối", dataIndex: "last", ellipsis: true },
      {
        title: "Cập nhật",
        dataIndex: "updatedAt",
        width: 170,
        render: (v) => dayjs(v).format("DD/MM/YYYY HH:mm"),
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        width: 110,
        render: (s) =>
          s === "open" ? <Tag color="green">Open</Tag> : <Tag>Closed</Tag>,
      },
      {
        title: "",
        width: 100,
        render: (_, rec) => (
          <Button
            size="small"
            onClick={async () => {
              const det = await api.getConversation(rec.id);
              setDetail(det);
              setOpenDetail(true);
            }}
          >
            Xem
          </Button>
        ),
      },
    ],
    []
  );

  const onSaveSettings = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      await api.saveSettings(values);
      message.success("Đã lưu cài đặt");
    } catch (e) {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const addQuick = async () => {
    const v = newQR.trim();
    if (!v) return;
    const list = Array.from(new Set([v, ...quick]));
    setQuick(list);
    setNewQR("");
    await api.saveQuickReplies(list);
  };

  const removeQuick = async (t) => {
    const list = quick.filter((x) => x !== t);
    setQuick(list);
    await api.saveQuickReplies(list);
  };

  const onTry = async () => {
    const msg = tryInput.trim();
    if (!msg) return;
    setTryLoading(true);
    setTryReply("");
    try {
      const data = await chatAPI(msg);
      setTryReply(data?.reply ?? JSON.stringify(data));
    } catch (e) {
      setTryReply("Lỗi: " + (e.message || "Server"));
    } finally {
      setTryLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: 48,
            margin: 12,
            borderRadius: 8,
            background: "rgba(255,255,255,.2)",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[active]}
          onClick={({ key }) => setActive(key)}
          items={[
            {
              key: "conversations",
              icon: <MessageOutlined />,
              label: "Hội thoại",
            },
            { key: "settings", icon: <SettingOutlined />, label: "Cài đặt" },
            {
              key: "quick",
              icon: <DatabaseOutlined />,
              label: "Quick replies",
            },
            { key: "try", icon: <MessageOutlined />, label: "Thử Chat (API)" }, // NEW
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", paddingInline: 16 }}>
          <Space align="center" size={16}>
            <Title level={3} style={{ margin: 0 }}>
              Trang quản trị Chatbot
            </Title>
            <Tag color="blue">Simple</Tag>
          </Space>
        </Header>

        <Content style={{ padding: 24 }}>
          {active === "conversations" && (
            <>
              <Card size="small" style={{ marginBottom: 12 }}>
                <Space wrap>
                  <Input
                    allowClear
                    prefix={<SearchOutlined />}
                    placeholder="Tìm theo tên, nội dung, ID…"
                    style={{ width: 320 }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onPressEnter={loadTable}
                  />
                  <Select
                    allowClear
                    placeholder="Trạng thái"
                    style={{ width: 160 }}
                    options={[
                      { value: "open", label: "Open" },
                      { value: "closed", label: "Closed" },
                    ]}
                    value={status}
                    onChange={setStatus}
                  />
                  <Button icon={<ReloadOutlined />} onClick={loadTable}>
                    Làm mới
                  </Button>
                </Space>
              </Card>

              <Table
                rowKey="id"
                loading={loading}
                dataSource={rows}
                columns={cols}
                pagination={{ pageSize: 8 }}
                locale={{
                  emptyText: <Empty description="Chưa có hội thoại" />,
                }}
              />

              <Modal
                title={
                  <Space>
                    Chi tiết hội thoại <Tag>{detail?.id}</Tag>
                  </Space>
                }
                open={openDetail}
                width={720}
                onCancel={() => setOpenDetail(false)}
                footer={null}
              >
                {!detail ? (
                  <Empty />
                ) : (
                  <div
                    style={{
                      maxHeight: 420,
                      overflow: "auto",
                      paddingRight: 6,
                    }}
                  >
                    {detail.messages.map((m) => (
                      <div
                        key={m.id}
                        style={{
                          display: "flex",
                          justifyContent:
                            m.sender === "user" ? "flex-end" : "flex-start",
                          marginBottom: 10,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "#888",
                              marginBottom: 4,
                            }}
                          >
                            {m.sender === "user" ? "Bạn" : "Bot"} •{" "}
                            {dayjs(m.ts).format("HH:mm")}
                          </div>
                          <div
                            style={{
                              background:
                                m.sender === "user" ? "#014a94" : "#f5f7fb",
                              color: m.sender === "user" ? "#fff" : "#222",
                              padding: "8px 12px",
                              borderRadius:
                                m.sender === "user"
                                  ? "14px 14px 0 14px"
                                  : "14px 14px 14px 0",
                              maxWidth: 420,
                            }}
                          >
                            {m.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Modal>
            </>
          )}

          {active === "settings" && (
            <>
              <Card title="Cài đặt chung" style={{ maxWidth: 680 }}>
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={DEFAULT_SETTINGS}
                  onFinish={onSaveSettings}
                >
                  <Form.Item
                    label="Lời chào"
                    name="greeting"
                    rules={[{ required: true, message: "Nhập lời chào" }]}
                  >
                    <Input.TextArea
                      autoSize={{ minRows: 2, maxRows: 4 }}
                      placeholder="Xin chào bạn…"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: "Nhập số điện thoại" }]}
                  >
                    <Input addonBefore={<PhoneFilled />} placeholder="090…" />
                  </Form.Item>
                  <Form.Item
                    label="Link Zalo"
                    name="zalo"
                    rules={[{ type: "url", message: "URL chưa hợp lệ" }]}
                  >
                    <Input placeholder="https://zalo.me/…" />
                  </Form.Item>
                  <Form.Item label="Màu chủ đạo" name="theme">
                    <Input type="color" style={{ width: 80, padding: 2 }} />
                  </Form.Item>
                  <Form.Item
                    label="Bật cụm nút liên hệ (Zalo/Phone/Mess)"
                    name="showContactFab"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    label="Trạng thái"
                    name="online"
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren="Online"
                      unCheckedChildren="Offline"
                    />
                  </Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      htmlType="submit"
                      loading={saving}
                    >
                      Lưu
                    </Button>
                    <Button
                      onClick={async () => {
                        form.setFieldsValue(await api.getSettings());
                        message.info("Đã khôi phục từ lưu trước");
                      }}
                    >
                      Khôi phục
                    </Button>
                  </Space>
                </Form>
              </Card>

              <div style={{ marginTop: 16 }}>
                <Card
                  size="small"
                  title="Xem thử giao diện"
                  style={{ width: 360 }}
                >
                  <div
                    style={{
                      background: themeWatch || DEFAULT_SETTINGS.theme,
                      borderRadius: 12,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        color: "#fff",
                        padding: 10,
                        borderBottom: "1px solid rgba(255,255,255,.25)",
                      }}
                    >
                      Nguyễn Hải
                    </div>
                    <div style={{ background: "#fff", padding: 12 }}>
                      <div
                        style={{
                          background: "#f5f7fb",
                          color: "#222",
                          borderRadius: 12,
                          padding: 8,
                          display: "inline-block",
                        }}
                      >
                        {greetingWatch || DEFAULT_SETTINGS.greeting}
                      </div>
                    </div>
                    <div
                      style={{
                        background: themeWatch || DEFAULT_SETTINGS.theme,
                        padding: 10,
                      }}
                    >
                      <Input disabled placeholder="Nhập tin nhắn…" />
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          {active === "quick" && (
            <Card title="Quick replies">
              <Space direction="vertical" style={{ width: "100%" }} size={16}>
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    value={newQR}
                    onChange={(e) => setNewQR(e.target.value)}
                    placeholder="Nhập câu trả lời nhanh…"
                    onPressEnter={addQuick}
                  />
                  <Button type="primary" onClick={addQuick}>
                    Thêm
                  </Button>
                </Space.Compact>

                {quick.length === 0 ? (
                  <Empty description="Chưa có quick reply" />
                ) : (
                  <Space wrap>
                    {quick.map((q) => (
                      <Tag
                        key={q}
                        color="blue"
                        closable
                        onClose={(e) => {
                          e.preventDefault();
                          removeQuick(q);
                        }}
                      >
                        {q}
                      </Tag>
                    ))}
                  </Space>
                )}
              </Space>
            </Card>
          )}

          {active === "try" && (
            <Card title="Thử Chat với API thật" style={{ maxWidth: 740 }}>
              <Space direction="vertical" style={{ width: "100%" }} size={12}>
                <Input.TextArea
                  rows={3}
                  placeholder={`Nhập câu hỏi để gọi ${API_BASE}/api/chat/ …`}
                  value={tryInput}
                  onChange={(e) => setTryInput(e.target.value)}
                  onPressEnter={(e) => {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      onTry();
                    }
                  }}
                />
                <Button
                  type="primary"
                  loading={tryLoading}
                  onClick={onTry}
                  disabled={!tryInput.trim()}
                >
                  Gửi
                </Button>
                <Card size="small" title="Phản hồi">
                  {tryReply ? (
                    <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                      {tryReply}
                    </pre>
                  ) : (
                    <Empty description="Chưa có phản hồi" />
                  )}
                </Card>
              </Space>
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
