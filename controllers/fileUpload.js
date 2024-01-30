const filemodel=require("../models/File");
const cloudinary=require("cloudinary").v2;
// localfile upload handler function
exports.localFileUpload=async(req,res)=>{
    try {
        //fetch file from reqbody
        const file=req.files.file;
        //here we write file because when we swnd data from postman then we name it file
        console.log("file aa agyi",file);
        //path where we want to store oue file
        //--dirname gives us the location of our current folder tk ka path dega here it is destop/fileuploader/controllers
        //we have to add extension  to see the image like jpg
        //jo bhi meri file hai usko split krdo basis on dot 
        //then at index 1 we get extention that is jgp or else
        let path=__dirname + "/files/"+Date.now()+`.${file.name.split('.')[1]}`;
        // console.log(__dirname);
        //in this way we learn how to store media in a directory in a server
        console.log("this is path", path);
        //jo filaayi ahi usko move kr do iss location pe 
        file.mv(path,(error)=>{
            console.log(error);
        });
        res.json({
            success:true,
            message:"local file uploaded successfully"
        })
        
    } catch (error) {
        console.log(error);
    }
}
function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}
async function uploadFileToCloudinary(file,folder,quality){
    //isko hme banana hai syntax
    const options={folder}
    //we write tempfilepath beco when we upload file on cloudinary then it will
    //firstly ulpoad on ser ke temperory file after uploadition on cloudinary it 
    //will dwlwted from here
    //it is syntx of uploading
   //below syntax is must to write to upload
   if(quality){
    options.quality=quality;
   }
   options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}
//handler for uploading file on cloudinary
exports.imageUpload=async(req,res)=>{
    try {
        //data fetch
        const{name,tags,email}=req.body;
        console.log(name,email,tags);
        const file=req.files.imageFile;
        console.log(file);
        //validation of image ki kistype ka image w ewant 
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("filetype",fileType);
        //createa function to check fyletype

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file formate not supported"
            })
        }
        //if file formate supported ahi 
        const response=await uploadFileToCloudinary(file,"mydata");
        console.log(response);
        //db me entry save kro
        const fileData=await filemodel.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
            message:"image uploaded successfully"
        })
        res.json({
            success:true,
            message:"image uploaded successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
        
    }
}
//video uploader handler
exports.videoUpload=async(req,res)=>{
    try {
        //data fetch
        const{name,tags,email}=req.body;
        console.log(name,email,tags);
        const file=req.files.videoFile;
        console.log(file);
        //validation of image ki kistype ka image w ewant 
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("filetype",fileType);
        //createa function to check fyletype

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file formate not supported"
            })
        }
        //if file formate supported ahi 
        const response=await uploadFileToCloudinary(file,"mydata");
        console.log(response);
        //db me entry save kro
        const fileData=await filemodel.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url,
            message:"video uploaded successfully"
        })
        res.json({
            success:true,
            message:"video uploaded successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
        
    }
}
//image reducer
exports.imageReducer=async(req,res)=>{
    try {
        //data fetch
        const{name,tags,email}=req.body;
        console.log(name,email,tags);
        const file=req.files.imageFile;
        console.log(file);
        //validation of image ki kistype ka image w ewant 
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("filetype",fileType);
        //createa function to check fyletype

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file formate not supported"
            })
        }
        //if file formate supported ahi 
        //here 30 is a quality parameter told in npm package of cloudinary which is used to reduce size
        //if we write 90 then ploadeed photo side wiill be greater than 30 
        //it is a syntax of  uploadFileToCloudinary function 
        const response=await uploadFileToCloudinary(file,"mydata",30);
        console.log(response);
        //db me entry save kro
        const fileData=await filemodel.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
            message:"image uploaded successfully"
        })
        res.json({
            success:true,
            message:" reduced image uploaded successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
        
    }
}


