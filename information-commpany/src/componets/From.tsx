import {v4 as uuid} from "uuid"
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'

import { useEffect, useState } from "react"
import { type } from "@testing-library/user-event/dist/type"
import { getEnvironmentData } from "worker_threads";
    type Frome = {
      id : string;
      model:string;
      makeYear:number|null;
      operatingSystem:string;
      screenHeight:number|null;
      screenWidth:number|null,
      price:number|null;
    }
     const defaultUser:Frome = {
       id : "",
       model:"",
       makeYear: null ,
       operatingSystem:"",
       screenHeight:null,
       screenWidth:null,
       price: null


     }
 export  const From  = ()=>{
  const [leptop,setlaptop]=useState(defaultUser)
  const [table, settable]=useState([])
     console.log(table)
  useEffect(()=>{
    getData()
  },[])

   const getData = async()=>{
    try {
      let response = await fetch("http://localhost:3001/company")
      let data = await response.json()
              settable(data)
              console.log(table)

       }catch(err){
         alert(err)
       }

   }
  
    const handleChange =(prop: keyof Frome,value:any)=>{
      setlaptop({...leptop,[prop]:value})

    }
     const handleSubmit =  async(e:any)=>{
       e.preventDefault()
      //  console.log(leptop)
       try {
     let response = await fetch("http://localhost:3001/company ",{
       method:"POST",
       body:JSON.stringify({
        id : uuid(),
        model:leptop.model,
        makeYear:leptop.makeYear ,
        operatingSystem:leptop.operatingSystem,
        screenHeight: leptop.screenHeight,
        screenWidth:leptop.screenWidth,
        price:leptop.price
       }),
       headers:{"Content-type":"application/json"}
     })
     let data = await response.json()
            // console.log(data)
            getData()
      }catch(err){
        alert(err)
      }
       
     }

       const  sorting =(table:any)=>{
        let  sort = table.sort((first:any, second:any) => 0 - (first.price > second.price ? 1 : -1));
           console.log(sort,"sagar")
           settable(sort)
       }
        console.log("sorting")
     return <div>
         <form  onSubmit={handleSubmit}>
            {/* <input type="text" value={model} name ="model" onChange={handleChange}/>  */}
            <input  placeholder="model" type="text" value={leptop.model} onChange={(e)=>{handleChange("model",e.target.value)}}/>
            <input placeholder="makeYear" value={leptop.makeYear||""} onChange={(e)=>{handleChange("makeYear",e.target.value)}}/>
            <input  placeholder="operatingSystem"   value={leptop.operatingSystem} onChange={(e)=>{handleChange("operatingSystem",e.target.value)}}/>
            <input  placeholder=" screenHeight"   value={leptop.screenHeight||""} onChange={(e)=>{handleChange("screenHeight",e.target.value)}}/>
            <input  placeholder=" screenWidth"   value={leptop.screenWidth||""} onChange={(e)=>{handleChange("screenWidth",e.target.value)}}/>
            <input  placeholder="price"   value={leptop.price||""} onChange={(e)=>{handleChange("price",e.target.value)}}/>
            <input  type="submit" placeholder="submit" onSubmit={handleSubmit}/>
         </form>
         <button onClick={()=>sorting(table)}>sorting price low to high</button>
           <div style={{margin:"auto",width:"70%"}}>
           <Table striped bordered hover>
           <thead>
                    <tr>
                      <th>No</th>
                      <th>Model</th>
                      <th>Make Year</th>
                      <th>Operatingsystem</th>
                      <th>ScreenHeight</th>
                      <th>ScreenWidth</th>
                      <th>Price</th>
                    </tr>
                    </thead>
             {table.map((elem:any,index:number)=>{
               return(
                 <>
                   <tbody>
                 <tr>
                      <th>{index+1}</th>
                      <th>{elem.model}</th>
                      <th>{elem.makeYear}</th>
                      <th>{elem.operatingSystem}</th>
                      <th>{`${elem.screenHeight}-inch`}</th>
                      <th>{`${elem.screenWidth}-inch`}</th>
                      <th>{elem.price}</th>
                    </tr>
                    </tbody>
                 </>
               )
             })}
             
              </Table>
              
           </div>
     </div>
 }