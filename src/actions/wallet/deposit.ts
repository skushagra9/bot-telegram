import TelegramBot from 'node-telegram-bot-api';
import { getUser } from '../../server/user';

export const handleDeposit = async(bot: TelegramBot, chatId: number) => {
  const { user, message } = await getUser(chatId);
  const depositMessage = `
  To deposit send USDC to below address:
  ${user.walletAddress}

  After you have deposited the amount, Click on Refresh and finally 
   click on Deposit to see the amount in deposit contract.
  `;
  bot.sendMessage(chatId,depositMessage);
};
