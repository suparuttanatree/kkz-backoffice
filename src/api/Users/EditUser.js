import {service} from '../../services/BaseService'
import {EDIT_USER} from '../Constants'

const EditUser = async (params) =>{
    const configs ={
        
    };
    return service.postJSON(EDIT_USER,params,configs)
}

export default EditUser