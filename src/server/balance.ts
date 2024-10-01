import axios from "axios";
import { API } from "../utils";

export const getWalletBalance = async(chatId:any) => {
    const response = await axios.post(`${API}/balance/balanceinwallet`, {
        telegramId: chatId.toString(),
      });
      return response.data
} 

export const getContractBalance = async(chatId:any) => {
    const response = await axios.post(`${API}/balance/balance`, {
        telegramId: chatId.toString(),
      });
      return response.data
} 