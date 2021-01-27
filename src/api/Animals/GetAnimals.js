import { service } from "../../services/BaseService";
import { GET_ANIMALS } from "../Constants";

const GetAnimals = async params => {
  const configs = {
    params
  };
  return service.getJSON(GET_ANIMALS, configs);
};

export default GetAnimals;
