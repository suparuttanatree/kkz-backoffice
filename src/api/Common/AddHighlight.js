import { service } from "../../services/BaseService";
import { ADD_HIGHLIGHT } from "../Constants";

const AddHighlight = async params => {
  const configs = {};

  return service.postJSON(ADD_HIGHLIGHT, params, configs);
};

export default AddHighlight;