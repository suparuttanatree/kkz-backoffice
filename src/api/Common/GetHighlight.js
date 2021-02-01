import { service } from "../../services/BaseService";
import { GET_HIGHLIGHT } from "../Constants";

const GetHighlight = async params => {
  const configs = {
    params
  };
  return service.getJSON(GET_HIGHLIGHT, configs);
};

export default GetHighlight;
