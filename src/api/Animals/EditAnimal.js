import { service } from "../../services/BaseService";
import { EDIT_ANIMAL } from "../Constants";

const EditAnimal = async params => {
  const configs = {};

  return service.postJSON(EDIT_ANIMAL, params, configs);
};

export default EditAnimal;
