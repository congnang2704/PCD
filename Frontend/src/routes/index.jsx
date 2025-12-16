import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";

import UserRoutes from "./user.routes";
import AdminRoutes from "./admin.routes";
import { useIdle } from "../utils/useIdle";

const ChatBotWrapper = React.lazy(() =>
  import("../pages/Chat/ChatBots/ChatBot")
);

export default function AppRoutes() {
  const { pathname } = useLocation();

  // Admin nếu đúng prefix /haiadmin
  const isAdmin = pathname.startsWith("/haiadmin");

  // ✅ Hook luôn được gọi (KHÔNG gọi có điều kiện)
  const idleReady = useIdle(2000);

  // Chatbot chỉ hiện ở user
  const showChatBot = !isAdmin && idleReady;

  return (
    <>
      <Suspense fallback={null}>
        {showChatBot ? <ChatBotWrapper /> : null}
      </Suspense>

      {/* ✅ chỉ render 1 cụm routes */}
      {isAdmin ? <AdminRoutes /> : <UserRoutes />}
    </>
  );
}
