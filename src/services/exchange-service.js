import fetch from 'node-fetch';

// 환율 정보를 저장할 변수
let exchangeRates = null;
let lastFetchedTime = null;
let baseCurrency = 'KRW'; // 기본 기준 통화는 KRW

// 기준 통화를 기준으로 다른 통화의 환율을 가져오는 함수
async function getExchangeRate(base = 'KRW') {
    try {
        const currentTime = new Date().getTime();

        // 이전에 저장된 환율 정보가 없거나, 1시간이 지났을 경우
        if (!exchangeRates || (currentTime - lastFetchedTime > 3600000) || baseCurrency !== base) {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/3103c322b9024198c03581c8/latest/${base}`);
            const data = await response.json();
            if (data.result === "success") {
                exchangeRates = data.conversion_rates;
                lastFetchedTime = currentTime;
                baseCurrency = base; // 기준 통화를 업데이트
                return exchangeRates;
            } else {
                throw new Error('API 호출 실패');
            }
        } else {
            return exchangeRates; // 이미 저장된 환율 정보를 반환
        }
    } catch (error) {
        console.error('환율 정보를 가져오는 중 오류 발생:', error);
        throw new Error('환율 정보를 가져오는 중 오류 발생');
    }
}

// 임의의 통화를 기준으로 환율을 계산하는 함수
async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
        // 사용자가 입력한 출발 통화를 기준으로 환율 정보를 가져옴
        const rates = await getExchangeRate(fromCurrency);

        if (!rates) {
            throw new Error('환율 정보를 가져올 수 없음');
        }

        // 출발 통화를 기준으로 도착 통화로 변환
        const convertedAmount = amount * rates[toCurrency];
        return convertedAmount.toFixed(2);
    } catch (error) {
        console.error('변환 중 오류 발생:', error);
        throw new Error('변환 중 오류 발생');
    }
}

export { getExchangeRate, convertCurrency };
