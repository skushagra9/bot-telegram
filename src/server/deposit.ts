import axios from "axios";
import { API } from "../utils";

export const getDeposit = async(chatId:any) => {
    const response = await axios.post(`${API}/deposit/deposit`, {
        telegramId: chatId.toString(),
      });
      console.log(response.data.message || response.data.result.message)
      return response.data.message || response.data.result.message
} 