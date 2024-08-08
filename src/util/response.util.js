function responseBuilder(httpCode, textMessage, data = undefined) {
  return {
    code: httpCode,
    message: textMessage,
    data: data || [],
    timestamp: Date.now()
  };
}

export { responseBuilder };