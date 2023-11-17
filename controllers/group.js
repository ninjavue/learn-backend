const mongoose = require('mongoose')

const Group = require('../model/group')


const postGroup = async (req,res) => {
    try {
        const { catId,name } = req.body;
        let one = Math.round(Math.random() * 255);
        let two = Math.round(Math.random() * 255);
        let three = Math.round(Math.random() * 255); 
        const newGroup = new Group({
            catId,
            name,
            color: `rgb(${one},${two},${three})`,
            createdAt: new Date()
        })

        const val = await newGroup.save()
        res.json(val)
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error post"
        })
    }
}

const getGroup = async ( req, res ) => {
    try {
        const id = req.params.id
        const groups = []
        const group = await Group.find({})
        for(let i = 0; i < group.length; i++){
            if(group[i].catId == id){
                groups.push(group[i])
            }
        }
        res.json(groups)
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}


module.exports = {postGroup, getGroup}