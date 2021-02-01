import { service } from "../../services/BaseService";
import { DELETE_ANIMAL } from "../Constants";

const DeleteAnimal = async params => {
  const configs = {};

  return service.postJSON(DELETE_ANIMAL, params, configs);
};

export default DeleteAnimal;