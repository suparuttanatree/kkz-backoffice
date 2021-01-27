import { service } from "../../services/BaseService";
import { EDIT_ADMIN } from "../Constants";

const EditAdmin = async params => {
  const configs = {};

  return service.postJSON(EDIT_ADMIN, params, configs);
};

export default EditAdmin;
