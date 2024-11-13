import axios from "axios";
import { API } from "../utils";
import { getContractBalance, getWalletBalance } from "./balance";

export const getFullWithdraw = async(chatId:any, userAddress:string) => {
    const balance = await getContractBalance(chatId);
    // const balance = await getWalletBalance(chatId);
    const response = await axios.post(`${API}/withdraw/withdraw`, {
        telegramId: chatId.toString(),
        amount: balance,
        userAddress:userAddress
      });
      console.log(response.data.message || response.data.result.message)
      return response.data.message || response.data.result.message
} 