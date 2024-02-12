// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import url from '../config/config';
// import { personne } from '../model/personne';
// import { Observable } from 'rxjs';
// import { customer } from '../model/customer';


// @Injectable({
//   providedIn: 'root'
// })
// export class PersonneServiceService {

//   constructor(private httpClient:HttpClient) { }

//   private apiUrl = 'http://localhost:8888';

//   AjoutPersonne(pers:personne):Observable<any>{
//     try {
//       console.log(pers)
//       // console.log("jnvjdvlkdflk," + this.apiUrl+"/employe/save"):
//       let res = this.httpClient.post(url+"/employe/save",JSON.parse(JSON.stringify(pers)))
//       console.log(res)
//       return res
//     } catch (error) {
//       console.log(error)
//       throw error
//     }
//   }

//   AddCustomers(customer:customer){
// try {
//   let res = this.httpClient.post(url+"/customer/save",JSON.parse(JSON.stringify(customer)));
//   console.log(res)
//       return res
// } catch (error) {
//   console.log(error)
//   throw error
// }
//   }

// }