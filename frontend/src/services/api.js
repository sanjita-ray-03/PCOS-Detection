import axios from "axios";


export const mlApi = axios.create({
  baseURL: "http://localhost:5000"
});


const api =
axios.create({

 baseURL:
 "http://localhost:5001/api"

});

api.interceptors.request.use(

 config=>{

 const token =
 localStorage.getItem(
  "token"
 );

 if(token){

  config.headers.Authorization =
  `Bearer ${token}`;

 }

 return config;

 }

);

export default api;