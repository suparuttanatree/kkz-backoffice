import {service} from '../../services/BaseService'
import {ADD_USER} from '../Constants'

const AddUser = async (params) =>{
    const configs ={
        
    };
    return service.postJSON(ADD_USER,params,configs)
}

export default AddUser