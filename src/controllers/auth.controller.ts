import { User } from "../models/User.model";

const userController = {
    
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll()
        } catch (error) {
            
        }
    }
}