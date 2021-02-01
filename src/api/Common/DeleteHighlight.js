import { service } from "../../services/BaseService";
import { DELETE_HIGHLIGHT } from "../Constants";

const DeleteHighlight = async params => {
  const configs = {};

  return service.postJSON(DELETE_HIGHLIGHT, params, configs);
};

export default DeleteHighlight;