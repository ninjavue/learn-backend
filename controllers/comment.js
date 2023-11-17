const Comment = require('../model/comment')
const User = require('../model/user')



const postComment = async ( req, res ) => {
    try {
        const {userId, lessonId, comment} = req.body
        const newComment = new Comment({
            userId,
            lessonId,
            comment,
            createdAt: new Date(),
        })

        const val = await newComment.save()
        res.status(200).json(val)

    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"   
        })
    }
}

const getComment = async (req, res ) => {
    try {
        const id = req.params.id
        const comment = await Comment.find({lessonId: id}).populate('userId');

        const comments = comment.map((com) => ({
            _id: com._id,
            comment: com.comment,
            user:{
                _id: com.userId._id,
                name: com.userId.name,
                image: com.userId.image
            },
            createdAt: com.createdAt
        }));


        res.json(comments.reverse())
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}



module.exports = { postComment, getComment } 