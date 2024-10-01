import TelegramBot from 'node-telegram-bot-api';
import { getUser } from '../server/user';
import { getContractBalance, getWalletBalance } from '../server/balance';

// Handles wallet-related options and sends a wallet message
export const handleWallet = async(bot: TelegramBot, chatId: number) => {
  
    const {user, message} = await getUser(chatId);
    const balance = await getWalletBalance(chatId);
        const contractBalance = await getContractBalance(chatId);
  
    const walletMessage = `
    Your Wallet:

    Address: ${user.walletAddress}
    Balance in Account: ${balance} USDC
    Balance in Deposit Contract: ${contractBalance} USDC

    Tap to copy the address and send SOL to deposit.
    After you have deposited the amount, click on Deposit.
  `;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: ' Manage', callback_data: 'manage' }, { text: ' Close', callback_data: 'close' }],
        [{ text: ' Deposit ', callback_data: 'deposit_sol' }],
        [{ text: ' Withdraw', callback_data: 'withdraw_all_sol' }, { text: ' Withdraw X Amount', callback_data: 'withdraw_x_sol' }],
        [{ text: ' Reset Wallet', callback_data: 'reset_wallet' }, { text: ' Export Private Key', callback_data: 'export_key' }],
        [{ text: ' Refresh', callback_data: 'refresh_wallet' }],
      ],
    },
  };

  const sentMessage = await bot.sendMessage(chatId, walletMessage, options);
  return sentMessage.message_id
};
