import { PrismaClient } from "@prisma/client"
import client from "../services/redis.service.js"

const prisma = new PrismaClient()

export class usersController { 

    async getAll (req, res) {
        try {

            //despues de la primera vez obtendra los users desde redis porque ya estan guardados
            const reply = await client.get('users')

            if(reply) return res.json(JSON.parse(reply))
            
            const response = await prisma.users.findMany()

            if(response.length === 0){
                return res.status(404).json({
                    msj: "not users found"
                })
            }

            //guardar los datos en redis despues de hacer la peticion por primera vez
            const saveResult = await client.set('users', JSON.stringify(response))

            console.log(saveResult);

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

    async createUser (req, res) {
        try {
            
            const response = await prisma.users.create({
                data: req.body,
            })

            res.status(200).json({
                msj: "user created",
                data: response
            })

        } catch (error) {
            
            res.status(500).json({
                msj: "uknow error",
                error: error.message
            })
        }
    }

    async updateUser (req, res){

        const { id } = req.params;

        try {
            
            const response = await prisma.users.update({
                where:{
                    id: Number(id),
                },
                data: req.body
            })

            res.status(200).json({
                msj: "user updated",
                data: response
            })
        } catch (error) {
            
            if(error.code === "P2025"){
                return res.status(404).json({
                    msj: "user not found"
                })
            }

            res.status(500).json({
                msj: "server error",
                error: error.message
            })
        }
    }

    async deleteUser (req, res){

        const { id } = req.params;

        try {
            
            const response = await prisma.users.delete({
                where: {
                    id: Number(id)
                }
            })

            res.status(200).json({
                msj: "user deleted",
                data: response
            })
            
        } catch (error) {

            if(error.code === "P2025"){
                return res.status(404).json({
                    msj: "user not found or invalid ID",
                })
            }
            
            res.status(500).json({
                msj: "server error",
                error: error.message
            })
        }
    }
}
