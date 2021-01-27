import {service} from '../../services/BaseService'
import {DELETE_USER} from '../Constants'

const DeleteUser = async (params) =>{
    const configs ={
        
    };
    return service.postJSON(DELETE_USER,params,configs)
}

export default DeleteUser