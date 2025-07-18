exports.validateBody = (req)=>{
    
    // validation logic
    if(req){
        for(let field in req.body){
        // console.log(field)
         if(req.body[field] ===""){
            return { empty: true, fieldName: field}

        }       
    }       
     }

      return { empty: false, fieldName:""}
    


     
    

}