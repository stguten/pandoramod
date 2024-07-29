function responseBuilder(httpCode, textMessage, data) {
  return JSON.stringify({
    code: httpCode,
    message: textMessage,
    data: data || [],
    timestamp: Date.now()
  });
}

export { responseBuilder };