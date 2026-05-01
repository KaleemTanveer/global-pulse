const axios = require("axios");

exports.convertNumber = async (req, res) => {
  try {
    const n = req.query.n || 42;

    const xml = `<?xml version='1.0' encoding='utf-8'?>
    <soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
      <soap:Body>
        <NumberToWords xmlns='http://www.dataaccess.com/webservicesserver/'>
          <ubiNum>${n}</ubiNum>
        </NumberToWords>
      </soap:Body>
    </soap:Envelope>`;

    const response = await axios.post(
      "https://www.dataaccess.com/webservicesserver/numberconversion.wso",
      xml,
      {
        headers: { "Content-Type": "text/xml" },
      }
    );

    console.log(response.data); 

    res.json({ received: true });
  } catch (error) {
    res.status(500).json({ error: "SOAP failed" });
  }
};