import { service } from "../../services/BaseService";
import { CONFIRM_ORDER } from "../Constants";

const ComfirmOrder = async params => {
  const configs = {};

  return service.postJSON(CONFIRM_ORDER, params, configs);
};

export default ComfirmOrder;