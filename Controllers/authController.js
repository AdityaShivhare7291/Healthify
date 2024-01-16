const Coach = require('../Models/coaches.js');
const Person = require('../Models/person.js');
const Customer=require('../Models/customer.js');
const Admin=require('../Models/admin.js');

const jwt = require("jsonwebtoken");

class AdminController {

   signup=async(req,res)=>{
    try{
    console.log(req.body);

    const { email , password, name, age, address, userType, status, gender, contactDetails}=req.body;

    if(!email || !password || !name || !age || !address || !contactDetails || !userType || !gender)
    {
        return res.status(403).json({message:"Arguements are not passed "});
    }

    const usery = await Person.findOne({ email });
			if (usery) {
				return res
					.status(409)
					.json({ message: "User with email already exists" });
			}

    const splitaddress=address.split(",");

     const obj={
        house_no:splitaddress[0],
        Street:splitaddress[1],
        city:splitaddress[2],
        country:splitaddress[3]
     }

     let user;

    if(userType===1)
    {
        const coacher= await new Coach({
            TrainingTypes:["gymnastic","aerobic","muscleup"],
            qualification:["Master Nutrition & Muscle building","etc"]
        }).save();
        
         user=new Person({
            email,
            password,
            name,
            age,
            address:obj,
            gender,
            Coach:coacher._id,
            contactDetails,
            Customer:null,
            Admin:null
        }).save();
    }
    else if(userType===2)
    {
        const customer= await new Customer({
            bodyParts:["arms","legs","chest"],
            timeAllocation:100,
            foodType:"vegan",
            disease:["diabetes","asthama"],
            description:"need to be in shape with x time ."
        }).save();
        
       user=new Person({
            email,
            password,
            name,
            age,
            address:obj,
            gender,
            contactDetails,
            Coach:null,
            Customer:customer._id,
            Admin:null
        }).save();
    }
    else if(userType===3)
    {
        const adminy= await new Admin({
           access:true,
        }).save();
        
        user=await new Person({
            email,
            password,
            name,
            age,
            address:obj,
            gender,
            Coach:null,
            contactDetails,
            Customer:null,
            Admin:adminy._id,
        }).save();
    }

    const secretKey = 'Iampassinguserpass';
   
    const payload={
        email,
        password
    };
    
    const userToken = jwt.sign(payload, secretKey, { expiresIn: '4h' }); // Token expires in 4 hour
 
    

    return res.status(200).json({ userToken });
    }catch(e)
    {
        console.log(e);
        res.status(500).json({message:"INternal Server Error"});
    }
   }

   login=async(req,res)=>{
    const {email,password,rememberMe}=req.body;

    if(!email || !password)
    {
        return res.status(403).json({message:"Done"});
    }

    const persondata =await Person.findOne({email:email}).populate('Coach').populate('Customer').populate('Admin');

    if(!persondata)
    {
        return res.status(403).json({message:"Data is not provided succesfully"});
    }

    if(persondata.password!==password)
    {
        return res.status(403).json({message:"Invalid credential"});
    }

    const secretKey = 'Iampassinguserpass';

    // secretKey should be in env but for what is am i passing as secret key i used it here.
    const payload={
        email,
        password
    }

    const userToken = jwt.sign(payload, secretKey, { expiresIn: '4h' });

    return res.status(200).json({message:"successfully logged in",Token:userToken});

   }

   countern=async(req,res)=>{
    try{
        if(req.user.Admin && req.user.Admin.access)
        {
                const numberCoach=await Coach.find({}).countDocuments();
                const numberCustomer=await Customer.find({}).countDocuments();
                

              

                return res.status(200).json({message:"Counting done",
                                            Coches:numberCoach,
                                            Customers:numberCustomer});
        }
        else
        {
            return res.status(403).json({message:"Not allowed To enter"});
        }
    }catch(e)
    {
        console.log(e);
        return res.status(500).json({message:"Internal Server Error"});
    }
    
   }
  }
  
  module.exports = new AdminController();