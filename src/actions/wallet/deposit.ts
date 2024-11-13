import TelegramBot from 'node-telegram-bot-api';
import { getUser } from '../../server/user';

export const handleDeposit = async (bot: TelegramBot, chatId: number) => {
  const { user, message } = await getUser(chatId);

  const depositMessage = `
  To deposit, send USDC to the address below:
  ${user.walletAddress}

  After you have deposited the amount, click on Refresh, and then
  click on Deposit to see the amount in the deposit contract.
  `;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Deposit To Contract', callback_data: 'deposit_to_contract' }],
      ],
    },
  };

  // Send the deposit message along with the button
  await bot.sendMessage(chatId, depositMessage, options);
};
