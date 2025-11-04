import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export class productController {

    async getAll (req, res) {

        try {
            
            const response = await prisma.product.findMany()

            res.status(200).json({
                msj: "products",
                data: response
            })
        } catch (error) {
            
            res.status(500).json({
                msj: "uknow error",
                error: error.message
            })
        }
    }

    async getProduct (req, res) {

        const { id } = req.params;

        try {
            
            const response = await prisma.product.findUnique({

                //para mostrar la categoria del producto usamos include y nos muestra el nombre y demas inf de la categoria
                where: {
                    id: Number(id)
                },
                include: {
                    category: true,
                }
            })

            if(!response){
               return res.status(404).json({
                    msj: "product not found"
                })
            }

            res.status(200).json({
                msj: "prodcut",
                data: response
            })
        } catch (error) {
            
            res.status(200).json({
                msj: "uknow error",
                error: error.message
            })
        }
    }

    async createProduct (req, res) {

        try {
            
            const response = await prisma.product.create({

                data: req.body,
            })

            res.status(200).json({
                msj: "product created",
                data: response
            })
        } catch (error) {
            
            res.status(500).json({
                msj: "uknow error",
                error: error.message
            })
        }
    }

    async deleteProduct (req, res) {

        const { id } = req.params;

        try {
            
            const response = await prisma.product.delete({
                where: {
                    id: Number(id)
                },
                include: {
                    category: true,
                }
            })


            res.status(200).json({
                msj: "product deleted",
                data: response
            })

        } catch (error) {
            
            //si el id no existe prisma retorna este codgio el cual lo validamos mediante un if
            if (error.code === "P2025") { 
            return res.status(404).json({
                msj: "product not found"
            });
            }

            res.status(200).json({
                msj: "uknow error",
                error: error.message
            })
        }
    }

    async updateProduct (req, res) {

        try {
            
            const { id } = req.params;

            const response = await prisma.product.update({
                where: {
                    id: Number(id),
                },
                data: req.body,
            })

            res.status(200).json({
                msj: "product updated",
                data: response
            })


        } catch (error) {
            
            if(error.code === "P2025"){
                return res.status(404).json({
                    msj: "product not found"
                })
            }

            res.status(500).json({
                msj: "uknow error",
                error: error.message
            })
        }
    }
}