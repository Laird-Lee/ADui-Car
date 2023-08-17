import { ref, onMounted, onBeforeUnmount } from 'vue';
import { io, Socket } from 'socket.io-client';

interface Message {
  text: string;
  timestamp: number;
}

export function useWebSocket(url: string) {
  const socket = ref<Socket | null>(null);
  const isConnected = ref(false);
  const messages = ref<Message[]>([]);

  const connect = () => {
    socket.value = io(url);

    socket.value.on('connect', () => {
      isConnected.value = true;
    });

    socket.value.on('disconnect', () => {
      isConnected.value = false;
    });

    socket.value.on('message', (message: Message) => {
      messages.value.push(message);
    });
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.disconnect();
      isConnected.value = false;
      messages.value = [];
    }
  };

  const sendMessage = (message: string) => {
    if (socket.value && isConnected.value) {
      socket.value.emit('message', { text: message, timestamp: Date.now() });
    }
  };

  onMounted(() => {
    connect();
  });

  onBeforeUnmount(() => {
    disconnect();
  });

  return {
    isConnected,
    messages,
    sendMessage
  };
}
