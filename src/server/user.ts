import axios from "axios";
import { API } from "../utils";

export const getUser = async(chatId:any) => {
    const response = await axios.post(`${API}/user/check-user`, {
        telegramId: chatId.toString(),
      });
      return response.data
} 