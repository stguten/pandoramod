function responseBuilder(resCode, resMessage) {
    return JSON.stringify({
      code: resCode,
      data: resMessage,
      timestamp: Date.now(),
    });
  }
  
  export { responseBuilder };
  