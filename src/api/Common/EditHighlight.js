import { service } from "../../services/BaseService";
import { EDIT_HIGHLIGHT } from "../Constants";

const EditHighlight = async params => {
  const configs = {};

  return service.postJSON(EDIT_HIGHLIGHT, params, configs);
};

export default EditHighlight;