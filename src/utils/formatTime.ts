export const FormatTime = (timestamp) => {
    return `${timestamp.getFullYear()}/${("0" + (timestamp.getMonth() + 1)).slice(
      -2
    )}/${("0" + timestamp.getDate()).slice(-2)} ${(
      "0" + timestamp.getHours()
    ).slice(-2)}:${("0" + timestamp.getMinutes()).slice(-2)}:${(
      "0" + timestamp.getSeconds()
    ).slice(-2)}`;
};

export default FormatTime;