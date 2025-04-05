// 📁 backend/middleware/notFound.middleware.js

export const notFound = (req, res, next) => {
    res.status(404).json({
      message: `❌ La ruta [${req.originalUrl}] no fue encontrada en el servidor.`,
    });
  };
  