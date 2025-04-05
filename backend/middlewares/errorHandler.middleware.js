// 📁 backend/middlewares/errorHandler.middleware.js

export const errorHandler = (err, req, res, next) => {
    console.error("❌ Error capturado por middleware:", err);
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
  
    res.json({
      message: err.message || "Error del servidor",
      stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    });
  };
  
  // Para utilizarlo:
  // app.use(errorHandler);
  