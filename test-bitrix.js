// test-bitrix.js
const BITRIX_WEBHOOK = 'https://b24-05arfz.bitrix24.kz/rest/1/7gwxwizo5e8t17ko/';

async function testBitrix() {
  try {
    const response = await fetch(`${BITRIX_WEBHOOK}user.current`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    console.log('Bitrix response:', result);
    
    if (result.error) {
      console.error('Bitrix error:', result.error_description);
    } else {
      console.log('Success! User:', result.result);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
}

testBitrix();