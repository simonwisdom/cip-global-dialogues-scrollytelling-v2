async function testFetch() {
  const url = 'https://raw.githubusercontent.com/lukes/un-m49/main/un-m49.json';
  try {
    console.log(`Fetching ${url}`);
    const response = await fetch(url);
    console.log(`Status: ${response.status}`);
    const text = await response.text();
    console.log('Response text:', text.slice(0, 200));
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}
testFetch(); 