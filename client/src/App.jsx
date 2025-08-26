import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError('Por favor, insira uma URL');
      return;
    }
    setError('');
    setLoading(true);
    setQrCode('');

    try {
      const response = await axios.post('http://localhost:5000/generate', {
        text: url
      });
      setQrCode(response.data.qrCodeUrl);
    } catch (err) {
      console.error(err);
      setError('Erro ao gerar QR code');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center transition-all duration-500">
        {/* Renderiza título, input e botão apenas se não houver qrCode */}
        {!qrCode && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Gerador de QR Code</h1>

            <input
              type="text"
              placeholder="Digite a URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleGenerate}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg w-full transition-all duration-200"
            >
              {loading ? 'Gerando...' : 'Gerar QR Code'}
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}
          </>
        )}

        {/* Renderiza QR code e botão de download apenas se qrCode existir */}
        {qrCode && (
          <div className="mt-6">
            <img src={qrCode} alt="QR Code" className="mx-auto shadow-md rounded-lg" />
            <button
              onClick={handleDownload}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              Baixar QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
