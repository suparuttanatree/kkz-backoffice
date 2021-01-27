import axios from "axios";
// import qs from 'qs'
import { BASE_URL } from "../api/Constants";
class BaseService {
  constructor(baseurl){
      this.url= baseurl || BASE_URL; 
      this.api= axios.create({
          baseURL : this.url,
          timeout :  60 * 5 * 1000,  /** 5 Mins */
          validateStatus : status => {
              return status >= 200 && status <= 600; 
          },
      });
  }
  getJSON(endPoint,configs={}){
      return new Promise((resolve,reject)=>{
          this.api.get(endPoint,configs)
          .then(res => {
              resolve(res)
          },err=>{
              reject(err);
          })
      })
  }
  postJSON(endPoint,params,configs={}){
      return new Promise((resolve,reject)=>{
          this.api.post(endPoint,params,configs)
          .then(res => {
              resolve(res)
          },err=>{
              reject(err);
          })
      })
  }
  deleteJSON(endPoint, params, configs={}){
      return new Promise((resolve,reject)=>{
          this.api.delete(endPoint,params,configs)
          .then(res => {
              resolve(res)
          },err=>{
              reject(err);
          })
      })
  }
  putJSON(endPoint, params, configs={}){
      return new Promise((resolve,reject)=>{
          this.api.put(endPoint,params,configs)
          .then(res => {
              resolve(res)
          },err=>{
              reject(err);
          })
      })
  }
}
const service=new BaseService();
export  {
  service,
  BaseService
}