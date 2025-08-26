import express from 'express';
import QRCode from 'qrcode';
import cors from 'cors';
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get('/', async (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/generate', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const generateQR = await QRCode.toDataURL(text);
    return res.json({ qrCodeUrl: generateQR });
  } catch (error) {
    return res.status(500).send("Error generating QR code");
  }
});

