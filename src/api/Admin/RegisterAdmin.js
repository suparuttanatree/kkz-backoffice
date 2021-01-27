import { service } from "../../services/BaseService";
import { ADD_ADMIN } from "../Constants";

const RegisterAdmin = async params => {
  const configs = {
  };

  return service.postJSON(ADD_ADMIN, params, configs);
};

export default RegisterAdmin;
