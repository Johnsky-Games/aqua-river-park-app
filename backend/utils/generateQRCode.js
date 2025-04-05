// 📁 backend/utils/generateQRCode.js
import QRCode from 'qrcode';

export const generateQRCode = async (text) => {
  try {
    const qrDataUrl = await QRCode.toDataURL(text);
    return qrDataUrl;
  } catch (err) {
    console.error('❌ Error generando código QR:', err);
    throw new Error('No se pudo generar el código QR');
  }
};
