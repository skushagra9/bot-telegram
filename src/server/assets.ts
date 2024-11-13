
const filterAssetData = (data: any, selectedAsset: string) => {
    const asset = data.find((item: any) => item.assetName === selectedAsset);

    if (asset) {
        return {
            asset: asset.assetName,
            indexAddress: asset.indexToken,
            markPrice: asset.markPrice,
            oracle: asset.spotPrice,
            change24h: asset.change24h,
            volume24h: asset.volume24h,
            openInterest: asset.openInterest,
            fundingCountdown: asset.fundingRate,
            borrowingAPR: asset.borrowingAPR,
        };
    }

    return null;
};

export const fetchAssetData = async (selectedAsset: string) => {
    try {
        const response = await fetch('https://orderbook.filament.finance/test/filament/api/v1/assets');
        const responseData  = await response.json();
        const filteredData = filterAssetData(responseData, selectedAsset);
        console.log(filteredData, "filteredData");
        return filteredData;
    } catch (error) {
        console.error('Error fetching asset data:', error);
    }
};
