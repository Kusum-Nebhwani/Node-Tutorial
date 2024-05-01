const express = require('express');
const router = express.Router();

const Menu = require('../models/Menu');


router.post("/",async(req,res) =>{
    try{
        const data = req.body

        const newMenu = new Menu(data)

        const response = await newMenu.save()

        console.log("Menu saved")

        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.get('/',async(req,res)=>{
    try{
        const data = await Menu.find()

        console.log('Menu fetched');
        res.status(200).json(data);


    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
router.get("/:cuisineType",async(req,res)=>{
    try{
        const cuisineType = req.params.cuisineType;
        if(cuisineType == "Italian" || cuisineType == "Chinese" || cuisineType == "Indian" || cuisineType == "Mexican")
           { const response = await Menu.find({cuisine : cuisineType});
            console.log("response found");
            res.status(200).json(response);
        }
       
    
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'}); 
    }
})
router.put("/:id", async (req, res) => {
    try {
      const MenuId = req.params.id;
      const updateMenuData = req.body;
  
      const response = await Menu.findByIdAndUpdate(MenuId,updateMenuData,{
          new : true,
          runValidators : true
  
      })
  
  
      if(!response){
          res.status(404).json({error : "Record Not Found"});
      }
  
      
      console.log("data updated");
      res.status(200).json(response);
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
  router.delete("/:id",async(req,res)=>{
      try{
          const MenuId = req.params.id;
  
  
      const response = await Menu.findByIdAndDelete(MenuId);
      if(!response){
          res.status(404).json({error : "Record Not Found"});
      }
      console.log("data deleted");
      res.status(200).json({message:"Data Deletion Succesful!"});
  
      }catch(err){
          console.log(err);
          res.status(500).json({ error: "Internal Server Error" });
      }
      
  })
  

module.exports = router;