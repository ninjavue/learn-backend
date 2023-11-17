const mongoose = require('mongoose')
const Kahoot = require('../model/kahoot')


const getKahoot= async (req,res) => {
    try {
       const kahoot = await Kahoot.find({});
       res.status(200).send(kahoot) 
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createKahoot = async (req, res) => {
    try {
        const { title,userId } = req.body;
        let one = Math.round(Math.random() * 255);
        let two = Math.round(Math.random() * 255);
        let three = Math.round(Math.random() * 255); 
        let gameStart = Math.round(1000000 + Math.random() * 9000000);
        const newKahoot = new Kahoot({
            title,
            userId,
            bgcolor: `rgb(${one},${two},${three})`,
            gameStart,
            createdAt: new Date()
        })

        const val = await newKahoot.save()
        res.json(val)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteKahoot = async (req, res) => {
    try {
        const { id } = req.params

        const delKahoot = await Kahoot.findByIdAndDelete(id)

        if(!delKahoot){
            res.status(404).json({
                error: "Kahoot Category not found"
            })
        }

        res.status(200).json({
            message: "Kahoot category deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
const getOneKahoot = async (req, res) => {
    try {
        const { id } = req.params

        const kahoot = await Kahoot.findById(id)

        if(!kahoot){
            res.status(404).json({
                error: "Kahoot Category not found"
            })
        }

        res.status(200).json(kahoot)

    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}


module.exports = { getKahoot, createKahoot, deleteKahoot, getOneKahoot}