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
            msj: "uknow",
            error: error.message
        })
       }


    }
}