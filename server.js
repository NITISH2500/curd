const express=require("express");
const bodyParser=require('body-parser');
const cors=require("cors");
const {
    createPool
}=require('mysql');
const app=express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
const pool= createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})
pool.query(`Select *from list`, (err,result)=>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
})
app.get("/api",(req,res)=>{
    const sql="SELECT * FROM list";
    pool.query(sql,(error,data)=>{
        res.send(data);
    })
}) 
app.post("/api/post",(req,res)=>{
    const{id,Entries}=req.body;
    const sqlInsert="INSERT INTO list (id,Entries) VALUES(?,?)";
    pool.query(sqlInsert, [id,Entries],(err,result)=>{
        if(err){
            console.log(err);
        
        }
      
    });
});
app.delete("/api/remove/:id",async(req,res)=>{
    const id=req.params.id;
     try {
    const task = await pool.query(`DELETE FROM list WHERE id = ?`, [id]);

    if (!task.affectedRows) {
      return res.status(404).send('Task not found');
    }

    res.send('Task deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});
app.get("/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sql="SELECT * FROM list WHERE id= ?";
    pool.query(sql,id,(error,data)=>{
        if(error){
            console.log(error);
                }
        res.send(data);
    });
}) 
app.get("/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sql="SELECT * FROM list WHERE id= ?";
    pool.query(sql,id,(error,data)=>{
        if(error){
            console.log(error);
                }
        res.send(data);
    });
}) 
app.put("/api/put/:id",(req,res)=>{
    const {id}=req.params;
    const{Entries}=req.body;
    constsqlUpdate="UPDATE list SET id=?, Entries=? WHERE id=?";
    pool.query(sql,id,(error,data)=>{
        if(error){
            console.log(error);
                }
        res.send(data);
    });
}) 

app.listen(5000,()=>{
    console.log("done");
})