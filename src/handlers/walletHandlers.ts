import TelegramBot from 'node-telegram-bot-api';
import { getUser } from '../server/user';
import { getContractBalance, getWalletBalance } from '../server/balance';

// Handles wallet-related options and sends or updates the wallet message
export const handleWallet = async (bot: TelegramBot, chatId: number, walletMessageId?: number | null) => {
  try {
    // Fetch user, balance, and contract balance
    const { user, message } = await getUser(chatId);
    const balance = await getWalletBalance(chatId);
    const contractBalance = await getContractBalance(chatId);

    const walletMessage = `
      Your Wallet:

      Address: ${user.walletAddress}
      Balance in Account: ${balance} USDC
      Balance in Deposit Contract: ${contractBalance} USDC

      Tap to copy the address and send USDC to deposit.
      After you have deposited the amount, click on Deposit.
    `;

    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Manage', callback_data: 'manage' }, { text: 'Close', callback_data: 'close' }],
          [{ text: 'Deposit', callback_data: 'deposit_sol' }],
          [{ text: 'Withdraw All', callback_data: 'withdraw_all_sol' }, { text: 'Withdraw X Amount', callback_data: 'withdraw_x_sol' }],
          [{ text: 'Reset Wallet', callback_data: 'reset_wallet' }, { text: 'Export Private Key', callback_data: 'export_key' }],
          [{ text: 'Refresh', callback_data: 'refresh_wallet' }],
        ],
      },
    };

    // Check if a walletMessageId is provided (handle undefined and null)
    if (walletMessageId !== undefined && walletMessageId !== null) {
      // Edit the existing message
      await bot.editMessageText(walletMessage, {
        chat_id: chatId,
        message_id: walletMessageId,
        reply_markup: options.reply_markup, // Ensure reply_markup is passed correctly
        parse_mode: 'Markdown', // Optional: if you want to allow markdown in the message
      });
      return walletMessageId; // Return the existing message ID
    } else {
      // Send a new message if no existing message
      const sentMessage = await bot.sendMessage(chatId, walletMessage, {
        reply_markup: options.reply_markup, // Ensure reply_markup is passed correctly
        parse_mode: 'Markdown', // Optional: if you want to allow markdown in the message
      });
      return sentMessage.message_id; // Return the new message ID
    }
  } catch (error) {
    console.error('Error handling wallet message:', error);
    // Optionally, send an error message to the user
    await bot.sendMessage(chatId, 'There was an error handling your wallet. Please try again.');
  }
};
