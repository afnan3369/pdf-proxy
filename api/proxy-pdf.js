export default async function handler(req, res) {
  const { order } = req.query;

  const apiUrl = `https://api.portnumbers.com/generate-pdf?order=${order}`;

  try {
    const pdfResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-api-key': 'MaFYeWAVFk3piIpHqVMxlCs+fk3PkYfUcYp/fzRKKvo='
      }
    });

    if (!pdfResponse.ok) {
      return res.status(pdfResponse.status).json({ error: "Failed to fetch PDF" });
    }

    const buffer = await pdfResponse.arrayBuffer();
    const base64PDF = Buffer.from(buffer).toString('base64');

    return res.status(200).json({
      base64: base64PDF,
      contentType: 'application/pdf'
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
