import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  sender: string;
  message: string;
  image?:string
}

interface Chat {
  id: number;
  title: string;
  history: Message[];
}

interface ChatState {
  chats: Chat[];
  activeChatId: number | null;
}

let chatCounter = 1;

const initialState: ChatState = {
  chats: [{ id: 1, title: "Chat 1", history: [] }],
  activeChatId: 1,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
      addChat: (state) => {
        const newChat: Chat = {
          id: ++chatCounter,
          title: `Chat ${state.chats.length + 1}`,
          history: [],
        };
        state.chats.push(newChat);
        state.activeChatId = newChat.id;
      },
    setActiveChat: (state, action: PayloadAction<number>) => {
      state.activeChatId = action.payload;
    },
    addMessageToChat: (
      state,
      action: PayloadAction<{ chatId: any; message: string; sender: string ,image? :string}>
    ) => {
      const { chatId, message, sender ,image} = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      
      if (chat) {
        chat.history.push({ sender, message,image});
        if (chat.title.startsWith("Chat ")) {
          chat.title = message;
        }
      }
    },
    deleteChat: (state, action: PayloadAction<number>) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
      if (state.activeChatId === action.payload) {
        state.activeChatId = state.chats.length > 0 ? state.chats[0].id : null;
      }
    },
  },
});

export const { addChat, setActiveChat, addMessageToChat, deleteChat } = chatSlice.actions;
export default chatSlice.reducer;
