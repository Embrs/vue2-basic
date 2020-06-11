import { Has } from "@/plugins/utils";

const ErrorCode = {
  0: "sErr0", // success
  100: "NetworkError" // error
};

export default code => {
  code = `${code}`.replace(/[^0-9]/g, "");
  return Has(ErrorCode, code) ? ErrorCode[code] : code;
};
