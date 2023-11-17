const User = require('../model/user')
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
    try {
        const {phone, password } = req.body;
        const findUser = await User.findOne({ phone: phone });

        if (!findUser) {
            return res.status(400).json({
                error: "Foydalanuvchi topilmadi.."
            });
        }else{
            const isMatch = await bcrypt.compare(password, findUser.password);
            if(isMatch){
                res.status(200).json(findUser);
            }else{
                res.status(404).json({
                    error:"Parol xato"
                })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

};

module.exports = {loginUser}