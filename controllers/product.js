const Product = require('../model/product')




const postProduct = async (req, res ) => {
    try {
        const { title, iframe, categoryId, userId } = req.body;
        const createdAt = new Date().toISOString();
        const files = req.files;

        if (!files) {
            return res.status(400).json({
                error: "No files were uploaded"
            });
        }

        const imagePaths = [];

        for (const key in files) {
            if (files) { // Check if file exists
                const file = files[key];
                const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);

                const filePath = `images/${uniquePrefix}_${file.name}`;

                await file.mv(filePath);
                imagePaths.push(filePath);
            }
        }
        // Assuming you have a Product model defined somewhere in your code
        const product = new Product({
            categoryId,
            userId,
            title,
            iframe,
            image: imagePaths,
            createdAt
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}
const getProduct = async (req, res ) => {
    try {
        const product = await Product.find({})
        res.json(product)
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
const getOneProduct = async (req, res ) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        res.json(product)
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
const putProduct = async (req, res ) => {
    try {
        const id = req.params.id
        const product =  await Product.findById(id)
        const imagePaths = [];
        const files = req.files
      
        if(!product){
            return res.status(404).json({
                error: "Product not found"
            })
        }

        if (!files) {
            for (let u = 0; u < product.image.length; u++) {
                imagePaths.push(product.image[u])
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
        const cat = await Category.findOne({ _id: req.body.categoryId || product.categoryId });

        let catName = '';
        let catImg = [];
        if (cat) {
            catName = cat.name;
            catImg = cat.image;
        } else {
            // Handle the case when no category is found
            catName = 'Uncategorized';
            catImg = []; // You can set a default image if needed
        }

        product.title = req.body.title || product.title;
        product.categoryId = req.body.categoryId || product.categoryId;
        product.categoryName = catName;
        product.categoryImage = catImg;
        product.price = req.body.price || product.price;
        product.color = req.body.color || product.color;
        product.size = req.body.size || product.size;
        product.description = req.body.description || product.description;
        updatedAt = new Date();
        product.image = imagePaths;
        

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}
const deleteProduct = async (req, res ) => {
    try {
        const id = req.params.id
        const deleteProduct = await Product.findByIdAndDelete(id)
        if(!deleteProduct){
            res.status(404).json({
                error: "Product not found"
            })
        }

        res.json({
            message: "Product deleted successfuly"
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal server Error"
        })
    }
}

const getCatIdProduct = async (req,res) => {
    try {
        const id = req.params.id
        const products = []
        const product = await Product.find({})
        for (let i = 0; i < product.length; i++) {
            if(product[i].categoryId == id){
                products.push(product[i])
            }
            
        }
       
        res.json(products)
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
}

const getIdsProduct = async (req, res) => {
    try {
        const ids = req.params.ids; 
        const objectIds = ids.split(','); 
        const products = await Product.find({ _id: { $in: objectIds } });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}


module.exports = {postProduct, getProduct,putProduct, deleteProduct, getOneProduct, getCatIdProduct,getIdsProduct}