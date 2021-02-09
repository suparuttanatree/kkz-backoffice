import { service } from "../../services/BaseService";
import { GET_ORDER } from "../Constants";

const GetOrder = async params => {
  const configs = {
    params
  };
  return service.getJSON(GET_ORDER, configs);
};

export default GetOrder;
