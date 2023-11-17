const User = require('../model/user')
const bcrypt = require('bcrypt');

const postUser = async (req, res) => {
    try {
        const { name, phone, password } = req.body;
        const existingUser = await User.findOne({ phone: phone });

        if (existingUser) {
            return res.status(400).json({
                error: "Email address is already in use"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({
            name,
            phone,
            password: hashedPassword,
            createdAt: new Date(),
            action: 'start'
        });

        const val = await newUser.save();
        res.status(200).json(val);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

};

const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const settingUser = async (req, res) => {
    try {
        const { id }= req.params
        const { message } = req.body

        const user = await User.findById(id)

        user.message = message

       const val = user.save()
        
        res.json(val)

    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
const avatarUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        const files = req.files
        const imagePaths = []
        if(!user){
            res.status(404).json({
                error: "User Not Faund"
            })
        }else{
            for(const key in files){
                if(files){
                    const file = files[key];
                    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const filePath = `images/${uniquePrefix}_${file.name}`;
                    await file.mv(filePath);
                    imagePaths.push(filePath);
                }
            }
        }
        
        user.image = imagePaths || user.image
       

        const val = await user.save();
        res.status(201).json(val)
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
const chatFonUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        const files = req.files
        const imagePaths = []
        if(!user){
            res.status(404).json({
                error: "User Not Faund"
            })
        }else{
            for(const key in files){
                if(files){
                    const file = files[key];
                    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const filePath = `images/${uniquePrefix}_${file.name}`;
                    await file.mv(filePath);
                    imagePaths.push(filePath);
                }
            }
        }
        
        user.chatfon = imagePaths || user.chatfon
       

        const val = await user.save();
        res.status(201).json(val)
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
const deltetUser = async (req, res) => {
    try {
        const { id } = req.params
        const deleteUser = await User.findByIdAndDelete(id)
    
        if(!deleteUser){
            return res.status(404).json({
                error: "User not found"
            })
        }
    
        res.status(200).json({
            message: "User deleted successfuly"
        })
    
       } catch (error) {
         res.status(500).json({
            error: "Internal Server Error"
         })
       }
}
const deleteFon = async (req, res ) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)

        user.chatfon = 'images/car.webp'
       

        const val = await user.save();
        res.status(201).json(val)
        
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
const editUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        if(!user){
            return res.status(404).json({
                error: "User not found"
            })
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.sport = req.body.sport || user.sport;
        user.updatedAt = new Date()

        const val = await user.save()

        res.json(val)

        
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
         }) 
    }
}
const adminUser = async (req, res) => {
    try {
        const { id }= req.params
        const user = await User.findById(id)

        if(!user){
            return res.status(404).json({
                error: "User not found"
            })
        }

        if(user.admin){
            user.admin = false
        }else{
            user.admin = true
        }
        user.updatedAt = new Date()

        const val = await user.save()

        res.json(val)

        
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
         }) 
    }
}

module.exports = {postUser, getAllUser, getUser, settingUser, avatarUser, deltetUser, editUser, adminUser,chatFonUser,deleteFon}