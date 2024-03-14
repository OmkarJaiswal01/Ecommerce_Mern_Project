const express=require('express')
const app=express();
const mongoose=require("mongoose");
const DataModel = require('./Model/ApiModel');
app.use(express.json());
const cors=require('cors');
const SubCatDataModal = require('./Model/SubCategoryModel');
const ProductDataModel = require('./Model/ProductModel');
const multer=require('multer');
const AdminModel = require('./Model/AdminModel');
const UserRegister = require('./Model/UserRegisterModel');
const UserLogin = require('./Model/UserLogin');
const ULogin = require('./Model/UserLogin');
const CartModel = require('./Model/CartModel');
const AddressModel = require('./Model/AddressModel');
const OrderDataModel = require('./Model/OrderDataModel');
const OrderDetails = require('./Model/OrderDetails');

app.use(cors());
app.use(express.static("propic"));
app.use(express.static("catimg"));


const db=mongoose.connect("mongodb+srv://Omkar_jaiswal:Omkar%40123@cluster0.i5hnudo.mongodb.net//Category");

db.then(()=>{
    console.log("Database is connected")
})

db.catch(()=>{
    console.log("database is  not  connected")
})


catstorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./catimg");
    },
    filename:(req,file,cb)=>{
        const ext=file.mimetype.split("/")[1];
        cb(null,"cpic_"+Date.now() + "." + ext);
    }
});

const catfilter=(req,file,cb)=>{
    const ext=file.mimetype.split("/")[1];
    if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="gif")
    {
        cb(null,true);
    }
    else{
        cb("Invalid Pic",false);
    }
};

const UploadCatImg=multer({
    storage:catstorage,
    fileFilter:catfilter
})







app.post("/Category",UploadCatImg.single("cpic"),async(req,res)=>{
    const model= new DataModel({
        Category:req.body.Category,
        Pic:req.file.filename
    })
        await model.save();
        res.json({message:"new record save"})
    })



app.post("/SubCategory",async(req,res)=>{
    const SubModal=new SubCatDataModal({
        SubCategory:req.body.SubCategory,
        CategoryId:req.body.CatId
    })
await SubModal.save();
res.json({message:"SubCategory Data saved"})

})


app.post("/adlogin",async(req,res)=>{
    const re=await AdminModel.findOne({UserName:req.body.uname,Password:req.body.psw});
    if(re){
        res.json({msg:"Valid User"})
    }  
    else{
        res.json({msg:"Invalid User"});
    }
})

app.get("/SubCategory",async(req,res)=>{
    const re=await SubCatDataModal.find();
    res.json(re);
})

//find subcatergory by category Id
app.get("/SubCategory/:cid",async(req,res)=>{
    const re=await SubCatDataModal.find({CategoryId:req.params.cid});
    res.json(re);
})




app.post("/SubCatByCat",async(req,res)=>{
    const re=await SubCatDataModal.find({CategoryId:req.body.catid});
    res.json(re);
})



app.delete("/SubCategory",async(req,res)=>{
    const re=await SubCatDataModal.findOneAndDelete({_id:req.body.sid});
    res.json({message:"Record Delete"});
})

app.get("/Category",async(req,res)=>{
    const re=await DataModel.find();
    res.json(re);
})


app.get("/Category/:id",async(req,res)=>{
    const re=await DataModel.findOne({_id:req.params.id});
    res.json(re);
});

app.delete("/Category",async(req,res)=>{
    const del=await DataModel.findOneAndDelete({ _id:req.body.sid});
    res.json({message:"Record Delete"});
});
app.put("/Category",async(req,res)=>{
    const pi=await DataModel.findByIdAndUpdate({_id:req.body.p},
        {Category:req.body.Category});
    res.json({message:"update successfully"});
});


const mystorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./propic");
    },
    filename:(req,file,cb)=>{
        const ext=file.mimetype.split("/")[1];
        cb(null,"pic_"+Date.now() + "." + ext);
    }
});


const myfilter=(req,file,cb)=>{
    const ext=file.mimetype.split("/")[1];
    if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="gif")
    {
        cb(null,true);
    }
    else{
        cb("Invalid Pic",false);
    }
};

const upload=multer({
    storage:mystorage,
    fileFilter:myfilter
})

app.post("/product",upload.single("fpic"),async(req,res)=>{
    // console.log(req.body);
    const data= new ProductDataModel({
SubCategoryId:req.body.SubCatId,
ProductName:req.body.PName,
Price:req.body.Price,
Offer:req.body.Offer,
Pic:req.file.filename,
Des:req.body.Des
    })
await data.save();
  res.json({message:"Product Data Saved"})
})

app.get("/product",async(req,res)=>{
    const re= await ProductDataModel.find();
    res.json(re);
})

app.post("/productbyscat",async(req,res)=>{
    const re= await ProductDataModel.find({SubCategoryId:req.body.sid});
    res.json(re);
})

app.post("/UserReg",async(req,res)=>{
    const re=new UserRegister({
        UserName:req.body.UName,
        UserEmail:req.body.UEmail,
        MobileNo:req.body.UMobile,
        UserPassword:req.body.UPassword,
        UserConPassord:req.body.UCPassword


    })
   await re.save();
   res.json({message:"Register Successfull"})

})

app.post("/UserLog",async(req,res)=>{
    const re=await UserRegister.findOne({UserEmail:req.body.uemail,UserPassword:req.body.upassword})
    
    if(re)
    {
     res.json({message:"Login Succesful"})
    }
    else{ 
        res.json({message:"Invalid User"})

    }
})

app.post("/Cart",async(req,res)=>{
const re=new CartModel({
    Email:req.body.Email,
    ProductId:req.body.ProductId,
    Qty:req.body.Qty,
 
    
    

})
await re.save();
res.json({message:"Pruduct Add"})

    
})
app.get("/Cart",async(req,res)=>{
const re=await CartModel.find();
const re2=await AddressModel.findOne({Status:"active"});
var data=[];
for(var i=0;i<re.length;i++)
{
    var re1=await ProductDataModel.findOne({_id:re[i].ProductId});
    var pdata={"cid":re[i]._id,"Qty":re[i].Qty,"Email":re[i].Email,"Pname":re1.ProductName,"Price":re1.Price,
"offer":re1.Offer,"Des":re1.Des,"Pic":re1.Pic,"ProductId":re1.ProductId,
// "address":re2.Name +"," +re2.Address +"," +re2.Mob+","+re2.Pin
"name":re2.Name,"mob":re2.Mob,"address":re2.Address,"pin":re2.Pin
};
    data[i]=pdata;
}
res.json(data);
})


app.post("/Uaddress",async(req,res)=>{
   const re=new AddressModel({
    Name:req.body.Name,
    Mob:req.body.Mob,
    Address:req.body.Address,
    Pin:req.body.Pin,
    Status:"not active"

   }) 
await re.save();
res.json({message:"Address Add"})
   
})

app.put("/Uaddress",async(req,res)=>{
    const re1=await AddressModel.updateMany({Status:'not active'});
    const re=await AddressModel.findOneAndUpdate({_id:req.body.id},{Status:'active'}); 
    res.json({message:"Address Saved"})
 })

app.get("/Uaddress",async(req,res)=>{
    const re =await AddressModel.find();
    res.json(re);
})

app.put("/cart", async (req, res) => {
    const re2 = await CartModel.findOneAndUpdate({ _id: req.body.id }, {  Qty: req.body.Qty  })
    res.json({ message: "Quantity Updated" });
})

app.post("/Order",async(req,res)=>{
    const re=new OrderDataModel({
     OrderDate:req.body.OrderDate,
     Amount:req.body.Amount,
      UserId:req.body.UserId,
      Address:req.body.Address,
      Status:req.body.Status  
    })
    await re.save();
    res.json({message:"Order Placed"})

})

app.get("/Order",async(req,res)=>{
    const re=await OrderDataModel.find();
    res.json(re)
})

app.post("/OrderDetails",async(req,res)=>{
    const re=new OrderDetails({
        OrderDate:req.body.OrderDate,
        OrderId:req.body.OrderId,
        Qty:req.bosy.Qty
    })
await re.save();
res.json({message:"Order Details"})

})

app.listen(7000,()=>{
    console.log("server started")
})