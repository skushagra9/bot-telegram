import { handleWallet } from './walletHandlers';
import { handleConfirmExportKey, handleExportKey } from '../actions/wallet/exportKey';
import { handleDeposit } from '../actions/wallet/deposit';
import { handleClose } from '../actions/close';
import { handlePin } from '../actions/pin';
import { getDeposit } from '../server/deposit';
import { getFullWithdraw } from '../server/withdraw';
import { handleWithdrawAll } from '../actions/wallet/withdrawAll';
import { sendTradeInfoBTC } from './tradeBtcHandler';

let walletMessageId: any = null;

export const handleCallbackQuery = async (bot: any, query: any) => {
    const chatId = query.message!.chat.id;
    const data = query.data;
    const messageId = query.message!.message_id;

    switch (data) {
        case 'buy':
            bot.sendMessage(chatId, 'You selected "Buy".');
            break;
        case 'sell':
            bot.sendMessage(chatId, 'You selected "Sell".');
            break;
        case 'manage':
            bot.sendMessage(chatId, 'You selected "Manage".');
            break;
        case 'help':
            bot.sendMessage(chatId, 'You selected "Help".');
            break;
        case 'pin':
            handlePin(bot, chatId, messageId);
            break;
        case 'trade_on_btc':
            await sendTradeInfoBTC(bot, chatId);
            break;
        case 'refer_friends':
            bot.sendMessage(chatId, 'You selected "Refer Friends".');
            break;
        case 'alerts':
            bot.sendMessage(chatId, 'You selected "Alerts".');
            break;
        case 'wallet':
            walletMessageId = await handleWallet(bot, chatId);
            break;
        case 'refresh_wallet':
            if (walletMessageId !== null) {
                try {
                    console.log('Refreshing wallet message with ID:', walletMessageId);
                    walletMessageId = await handleWallet(bot, chatId, walletMessageId); // Update message
                } catch (error) {
                    // console.error('Error refreshing wallet message:', error);
                }
            } else {
                console.log('No walletMessageId found, sending a new message.');
                walletMessageId = await handleWallet(bot, chatId); // Send new message if no ID is available
            }
            break;
        case 'deposit_to_contract':
            console.log('Deposit to contract clicked.');
            const message = await getDeposit(chatId);
            bot.sendMessage(chatId, message);

            break;
        case 'cancel_export_key':
            handleClose(bot, chatId, messageId);
            break
        case 'confirm_export_key':
            await handleConfirmExportKey(bot, chatId);
            break;
        case 'deposit_sol':
            await handleDeposit(bot, chatId);
            break;
        case 'refresh_withdraw':
            await handleWithdrawAll(bot, chatId);
            break;
        case 'withdraw_all_sol':
            await handleWithdrawAll(bot, chatId);
            bot.once('message', async (msg: any) => {
                const userEnteredAddress = msg.text;
                const withdrawResponse = await getFullWithdraw(chatId, userEnteredAddress);
                await bot.sendMessage(chatId, withdrawResponse);
                // Optionally refresh balance after withdrawal
                await handleWithdrawAll(bot, chatId);
            });
            break;

        case 'export_key':
            handleExportKey(bot, chatId);
            break;
        case 'refresh':
            if (walletMessageId !== null) {
                await handleWallet(bot, chatId, walletMessageId); // Make sure to pass walletMessageId here
            }
            break;
        case 'close':
            handleClose(bot, chatId, messageId);
            break;
        // Add more cases as needed
        default:
            bot.sendMessage(chatId, 'Unknown action.');
            break;
    }
};
function handleWithdrawAllSOL(bot: any, chatId: any) {
    throw new Error('Function not implemented.');
}

