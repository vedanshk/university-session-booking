module.exports = {
    success: (res, data, status = 200) => {
      return res.status(status).json({
        success: true,
        data,
      });
    },
  
    error: (res, message, status = 500) => {
      return res.status(status).json({
        success: false,
        error: message,
      });
    },
  
    custom: (res, data, status = 200) => {
      return res.status(status).json(data);
    },
  };
  