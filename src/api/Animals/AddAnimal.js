import { service } from "../../services/BaseService";
import { ADD_ANIMAL } from "../Constants";

const AddAnimal = async params => {
  const configs = {};

  return service.postJSON(ADD_ANIMAL, params, configs);
};

export default AddAnimal;