import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  notification_type: string;
  sender_name: string;
  created_at: string;
  is_read: boolean;
}

interface WebSocketContextType {
  isConnected: boolean;
  realtimeNotifications: NotificationItem[];
  unreadCount: number;
  clearNotification: (id: number) => void;
}

const WebSocketContext = createContext<WebSocketContextType>({} as WebSocketContextType);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [realtimeNotifications, setRealtimeNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!token || !user) {
      setIsConnected(false);
      return;
    }

    let socket: WebSocket | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout>;

    const connect = () => {
      const wsUrl = `ws://127.0.0.1:8000/ws/notifications/?token=${token}`;
      socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        setIsConnected(true);
      };

      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'notification' && payload.data) {
            const newNotif = payload.data as NotificationItem;
            setRealtimeNotifications((prev) => [newNotif, ...prev]);
            setUnreadCount((prev) => prev + 1);
          }
        } catch (e) {
          console.error("Error parsing WebSocket message:", e);
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        // Exponential reconnect backoff up to 5 seconds
        reconnectTimeout = setTimeout(connect, 3000);
      };

      socket.onerror = () => {
        socket?.close();
      };
    };

    connect();

    return () => {
      clearTimeout(reconnectTimeout);
      socket?.close();
    };
  }, [token, user]);

  const clearNotification = (id: number) => {
    setRealtimeNotifications((prev) => prev.filter((n) => n.id !== id));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <WebSocketContext.Provider value={{ isConnected, realtimeNotifications, unreadCount, clearNotification }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
