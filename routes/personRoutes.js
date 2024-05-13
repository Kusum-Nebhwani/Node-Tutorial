const express = require("express");
const router = express.Router();
const {jwtAuthMiddleware,generateToken} = require('./../jwt');

const Person = require("../models/Person");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const response = await newPerson.save();

    console.log("data saved");

    const payload = {
      id: response.id,
      username: response.username
  }
    console.log(JSON.stringify(payload));

    const token = generateToken(payload);
    
    console.log("Token: ",token);

    res.status(200).json({response : response,token : token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});
router.post('/login',async (req,res) => {
  try{
    const {username,password} = req.body;

    const user = await Person.findOne({username : username});

    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error : 'Invalid Username and Password'});
    }


    const payload = {
      id: user.id,
      username: user.username
  }
  const token = generateToken(payload);
  res.json({token});

  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });

  }
 

});
router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
  try{
    const userData = req.user;
    console.log("UserData: ",userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({user});

  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType == "engineer" ||
      workType == "doctor" ||
      workType == "Designer"
    ) {
      const response = await Person.find({ work: workType });
      console.log("data fetched succesfully");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      res.status(404).json({ error: "Person Not Found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      res.status(404).json({ error: "Person Not Found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "Data Deletion Succesful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
