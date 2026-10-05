export const errorHandler = (err, req, res, next) => {
  console.error('API Error:', err);
  
  res.status(500).json({
    success: false,
    message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' // Beklenmeyen hata
  });
};