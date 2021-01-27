import { service } from "../../services/BaseService";
import { ADMIN_LOGIN } from "../Constants";

const AdminLogin = async params => {
  const configs = {};

  return service.postJSON(ADMIN_LOGIN, params, configs);
};

export default AdminLogin;
