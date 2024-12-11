import axios from "axios";

export const createChat = async (query: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/chat`,
      { query: query }
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getChats = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/chat`
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getChatMessages = async (chatId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/messages/${chatId}`
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const createMessage = async (chatId: string, content: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/messages/${chatId}`,
      { content: content, role: "USER" }
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
