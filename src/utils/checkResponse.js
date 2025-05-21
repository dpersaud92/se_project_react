const checkResponse = (res, customErrorMessage) => {
  if (res.ok) {
    return res.json();
  }

  const baseMessage = `Error: ${res.status}`;
  const fullMessage = customErrorMessage
    ? `${customErrorMessage} (${baseMessage})`
    : baseMessage;

  return Promise.reject(fullMessage);
};

export default checkResponse;
