import { InlineKeyboardMarkup } from 'node-telegram-bot-api'; // Ensure to import the required type for inline keyboard
import { fetchAssetData } from '../server/assets';
import { getContractBalance } from '../server/balance';

export async function sendTradeInfoBTC(bot: any, chatId: any) {

    const assets = await fetchAssetData('BTC');
    const balance = await getContractBalance(chatId);
    let assetDetails = "Hello";
    if (assets) {
        assetDetails = `
Asset: ${assets.asset}
Index Address: ${assets.indexAddress}
Mark Price: ${assets.markPrice}
Oracle: ${assets.oracle}
24h Change: ${assets.change24h}
24h Volume: ${assets.volume24h}
Open Interest: ${assets.openInterest}
Funding/Countdown: ${assets.fundingCountdown}
Borrowing APR (hourly): ${assets.borrowingAPR}
Collateral Available: ${balance}
`;
    }

    // Create inline keyboard buttons
    const inlineKeyboard: InlineKeyboardMarkup = {
        inline_keyboard: [
            [
                { text: "BUY", callback_data: "buy" },
                { text: "SELL", callback_data: "sell" }
            ],
            [
                { text: "LIMIT", callback_data: "limit" },
                { text: "Size", callback_data: "size" }
            ],
            [
                { text: "Leverage", callback_data: "leverage" },
                { text: "Manage", callback_data: "manage" }
            ]
        ]
    };

    // Send the asset details with inline buttons
    await bot.sendMessage(chatId, assetDetails, { reply_markup: inlineKeyboard });
}
