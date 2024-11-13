import TelegramBot from 'node-telegram-bot-api';
import { getContractBalance, getWalletBalance } from '../../server/balance';

export const handleWithdrawAll = async (bot: TelegramBot, chatId: number) => {
  const balance = await getWalletBalance(chatId);
  const contractBalance = await getContractBalance(chatId);

  const withdrawMessage = `
  Balance in Account: ${balance}
  Balance in Deposit Contract: ${contractBalance}

  Enter your Address where you want to withdraw all the amount.
  `;

  const options = {
    reply_markup: {
      inline_keyboard: [
        // [{ text: 'Withdraw To Account', callback_data: 'withdraw_to_account' }],
        [{ text: 'Refresh', callback_data: 'refresh_withdraw' }],
      ],
    },
  };

  await bot.sendMessage(chatId, withdrawMessage, options);
};
