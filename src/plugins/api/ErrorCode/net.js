import { Has } from "@/plugins/utils";

const ErrorCode = {
  100: "err.NetworkErr", // error
  200: "success", // success
  400: "err.NetworkErr", // 請求錯誤
  401: "err.NetworkErr", // 未授權
  403: "err.NetworkErr", // 拒絕訪問
  404: "err.NetworkErr", // 請求錯誤, 未找到該資源
  405: "err.NetworkErr", // 請求方法未准許
  408: "err.NetworkErr", // 請求超時
  500: "err.NetworkErr", // 請求錯誤
  501: "err.NetworkErr", // 網路未實現
  502: "err.NetworkErr", // 網路錯誤
  503: "err.NetworkErr", // 服務不可用
  504: "err.NetworkErr", // 網路超時
  505: "err.NetworkErr" // http版本不支持該請求
};

export default code => {
  code = `${code}`.replace(/[^0-9]/g, "");
  return Has(ErrorCode, code) ? ErrorCode[code] : code;
};
