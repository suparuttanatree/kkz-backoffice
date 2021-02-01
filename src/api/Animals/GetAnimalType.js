import { service } from "../../services/BaseService";
import { GET_ANIMALTYPE } from "../Constants";

const GetAnimalType = async params => {
  const configs = {
    params
  };
  return service.getJSON(GET_ANIMALTYPE, configs);
};

export default GetAnimalType;
