import { service } from "../../services/BaseService";
import { UPLOAD_IMG } from "../Constants";

const UploadImage = async params => {
  const configs = {};

  return service.postJSON(UPLOAD_IMG, params, configs);
};

export default UploadImage;