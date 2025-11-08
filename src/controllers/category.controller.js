import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class categoryController {

    async getAll (req, res) {

       try {
        
        const response = await prisma.category.findMany({

            //para mostrar los productos que tiene cada categoria usamos le includes
            include: {
                products: true,
            }
        })

        res.status(200).json({
            message: "categories",
            data: response
        })
       } catch (error) {
        
        res.status(500).json({
            msj: "uknow error",
            error: error.message
        })
       }


    }

    async getCategory (req, res) {

        const { id } = req. params;

        try {
            
            const response = await prisma.category.findUnique({
                where: {
                    id: Number(id)
                },
                include:{
                    products: true
                }
            })

            if(!response){
                return res.status(404).json({
                    msj: "category not found",
                    
                })
            }

            res.status(200).json({
                msj: "category",
                data: response
            })

        } catch (error) {
            
             res.status(500).json({
                msj: "uknow error",
                error: error.message
             })
        }
    }

    async createCategory (req, res) {

        try {
            
            const response = await prisma.category.create({

                data: req.body,
            })

            res.status(200).json({
                msj: "category created",
                data: response
            })
        } catch (error) {
            
            res.status(500).json({
                msj: "uknow error",
                error: error.message
            })
        }
    }

    async updateCategory (req, res) {

        const { id } = req.params;

        try {
            
            const response = await prisma.category.update({
                where:{
                    id: Number(id)
                },
                data: req.body,
            })

            res.status(200).json({
                msj: "category updated",
                data: response
            })
        } catch (error) {
            
            if(error.code === "P2025"){
                return res.status(404).json({
                    msj: "category not found"
                })
            }

            res.status(500).json({
                msj: "uknow error",
                error: error.message
            })
        }
    }

    async deleteCategory (req, res) {

        const { id } = req.params;

        try {
            
            const response = await prisma.category.delete({
                where: {
                    id: Number(id)
                }
            })

            res.status(200).json({
                msj: "category deleted",
                data: response
            })
        } catch (error) {
            
            if(error.code === "P2025"){

                return res.status(404).json({
                    msj: "category not found"
                })
            }

            res.status(500).json({
                msj: "server error",
                error: error.message
            })
        }
    }
}