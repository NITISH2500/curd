import React, {useState,useEffect} from 'react'
import axios from 'axios';
 import{Link,}from"react-router-dom";

export default function Listing() {
    const[data,setData]=useState([]);
    const load=async()=>{
       const response= await axios.get('http://localhost:5000/api')
         
        setData(response.data);
        console.log(data);

    };
    useEffect(()=>{
    load();
    
},[]);
 const deleteTask =(id)=>{
    axios.delete(`http://localhost:5000/api/remove/${id}`)
    .then(() => {
      setTimeout(() => load(), 500);
    });
    };
  return (
    <div className="container">

      <h1>Lets make List</h1> 
      <button className='btn btn-success' style={{alignItems:'center',display:'inline-block'}}>Add+</button>
      <table className='table' style={{border:'3px', borderCollapse:'collapse', margin:'auto', maxWidth:'800px', boxShadow:'0 0 20 px rgba(0,0,0,0.15)'}}>
        <thead style={{backgroundColor:'#009879', color:'#ffffff', textAlign:'left'}}>
            <tr>
         <th>Seq</th>
         <th>Tasks</th>
         </tr>
        </thead>

        <tbody style={{borderBottom:'1px solid #dddddd'}}>
            {data.map((item,index) => {
                return(
                    
                <tr key={item.id}>
                    
                    <td>{item.id}</td>
                    
                    <td>{item.Entries}</td>
                    <Link to="/create"><button className="btn btn-edit" >ADD</button></Link>
                    <Link to={`/update/${item.id}`}><button className="btn btn-edit">Update</button></Link>
                    <button className="btn btn-delete" onClick={()=>deleteTask(item.id)}>Delete</button>
                    </tr>
                )
            })}


        </tbody>
      </table>
      </div>
  
  )
}
