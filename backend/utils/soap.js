function buildSoapEnvelope(num) {
  return `<Envelope><Body><ubiNum>${num}</ubiNum></Body></Envelope>`;
}

module.exports = { buildSoapEnvelope };