const { buildSoapEnvelope } = require("../utils/soap");

test("SOAP envelope contains number", () => {
  const xml = buildSoapEnvelope(42);
  expect(xml).toContain("<ubiNum>42</ubiNum>");
});