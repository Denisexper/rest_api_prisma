import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class usersController {

    async getAll (req, res) {
        try {
            
            const response = await prisma.users.findMany()

            if(response.length === 0){
                return res.status(404).json({
                    msj: "not users found"
                })
            }

            res.status(200).json({
                msj: "users",
                data: response
            })
            
        } catch (error) {
            
            res.status(500).json({
                msj: "uknow error",
                error: error.message
            })
        }
    }

    async getUser (req, res) {

        const { id } = req.params;

        try {
            
            const response = await prisma.users.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if(!response){
                return res.status(404).json({
                    msj: "user not found"
                })
            }

            res.status(200).json({
                msj: "user",
                data: response
            })
        } catch (error) {

            res.status(500).json({
                msj: "uknow error",
                error: error.message
            })

        }
    }
}
