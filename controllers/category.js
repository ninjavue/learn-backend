const Category = require('../model/category')


const postCategory = async (req,res) => {
    try {
        const { name, userId, text } = req.body;
        const createdAt = new Date().toISOString();
        const files = req.files;

        if (!files) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        let count = Math.round(Math.random() * 500);

        const imagePaths = [];

        for (const key in files) {
            if (files) {
                const file = files[key];
                const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const filePath = `images/${uniquePrefix}_${file.name}`;

                await file.mv(filePath);
                imagePaths.push(filePath);
            }
        }

        const category = new Category({
            name,
            image: imagePaths,
            userId,
            text,
            count,
            createdAt
        });

        await category.save();

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const getCategory = async (req,res) => {
    try {
        const category = await Category.find({})
    
        res.json(category)
       } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
const putCategory = async (req,res) => {
    try {
        const id = req.params.id
        const category = await Category.findById(id)
        const files = req.files
        const imagePaths = [];
        if(!category){
            return res.status(404).json({
                error: "Category not found"
            })
        }

        if (!files) {
            for (let u = 0; u < category.image.length; u++) {
                imagePaths.push(category.image[u])
            }
        }


        for (const key in files) {
            if (files) {
                const file = files[key];
                const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const filePath = `images/${uniquePrefix}_${file.name}`;

                await file.mv(filePath);
                imagePaths.push(filePath);
            }
        }

        category.name = req.body.name || category.name;
        category.image = imagePaths;
        updatedAt = new Date()

        const val = await category.save()

        res.json(val)

    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
const deleteCategory = async (req,res) => {
    try {
        const id = req.params.id
        const deleteCat = await Category.findByIdAndDelete(id)
    
        if(!deleteCat){
            return res.status(404).json({
                error: "Category not found"
            })
        }
    
        res.json({
            message: "Category delete successfully"
        })
    
       } catch (error) {
         res.status(500).json({
            error: "Internal Server Error"
         })
       }
}


module.exports = {postCategory, getCategory,putCategory, deleteCategory}