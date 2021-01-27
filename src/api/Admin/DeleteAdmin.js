import { service } from "../../services/BaseService";
import { DELETE_ADMIN } from "../Constants";

const DeleteAdmin = async params => {
  const configs = {};

  return service.postJSON(DELETE_ADMIN, params, configs);
};

export default DeleteAdmin;