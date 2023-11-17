const mongoose = require("mongoose");
const Question = require("../model/question");
const Kahoot = require("../model/kahoot");


const getQues = async (req, res) => {
    try {
      const users = await Question.find({});
      res.status(200).send(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
const createQues = async (req, res) => {
    try {
    const {catId, question, answer1, answer2, answer3, answer4, toggle, toggle2, toggle3, toggle4 } = req.body;
        const newQues = new Question({
           catId,
           question,
           answer:{
            answer1,
            answer2,
            answer3,
            answer4,
           },
           toggle,
           toggle2,
           toggle3,
           toggle4,
           createdAt: new Date()
        })
      const val = await newQues.save();
      res.json(val)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getOneQues = async (req, res) => {
    try {
        const { id } = req.params
        const ques = await Question.findById(id)
        if(!ques){
            res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json(ques)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteQues = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteQ = await Question.findByIdAndDelete(id)
        if(!deleteQ){
            res.status(404).json({ error: 'Question not found' });
        }

        res.status(200).json({
            message: "Question deleted successfully"
        })
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCatQues = async (req, res) => {
    try {
        const id = req.params.id
        const questions = []
        const ques = await Question.find({})
        for (let i = 0; i < ques.length; i++) {
            if(ques[i].catId == id){
                questions.push(ques[i])
            }
            
        }
       
        res.json(questions)
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
};
const getGameQues = async (req, res) => {
    try {
        const { game } = req.params;
        console.log(game);
        const games = [];
        
        const quesfind = await Question.find({});
        const ques = await Kahoot.find({ gameStart: game });
        
        if (ques.length === 0) {
            res.status(404).json({ error: "Incorrect code" });
        } else {
            for (let i = 0; i < quesfind.length; i++) {
                for (let j = 0; j < ques.length; j++) {
                    if (quesfind[i].catId.toString() === ques[j]._id.toString()) {
                        games.push(quesfind[i]);
                        break;
                    }
                }
            }
            res.json(games);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



  module.exports = { getQues, createQues,deleteQues,getOneQues,getCatQues,getGameQues };
