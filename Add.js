import React,{useState, useEffect} from 'react'
import {useNavigate,useParams,Link} from 'react-router-dom'//for updating the content
import axios from 'axios';
const initialState={
    id:"",
    Entries:"",
}
export default function Add() {
    
    const [state,setState]=useState(initialState);
    const {id, Entries}=state;
    const history=useNavigate();
   useEffect(()=>{
    axios.get(`http://localhost:5000/api/get/${id}`)
    .than((resp)=>setState({...resp.data[0]}));
   },[id])
    const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/api/post',{
        id, Entries,
    }).then(()=>{
        setState({
            id:"",
            Entries:""
        })
    }).catch((err)=>console.log(err));
    setTimeout(()=>{
      history("/");
    },500)
    };
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setState({...state,[name]:value});
    }

  return (
    <div style={{marginTop:"100px"}}>
     <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center",}} onSubmit={handleSubmit}>
  <div className="mb-3" >
    <label for="exampleInputEmail1" className="form-label">ID</label>
    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="id" value={id} onChange={handleInputChange}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Entries</label>
    <input type="text" className="form-control" id="exampleInputPassword1" name="Entries" value={Entries|| ""} onChange={handleInputChange} />
  </div>
  <div className="d-flex justify-content-between">
  <input type="submit" value="Save"/>
  <Link to="/">
  <input type="button" value="Go Back"/>
  </Link>
  </div>
 
</form>
    </div>
  )
}
