import { Authenticator} from '../Services/Authenticator'
import { HashManager } from '../Services/HashManager'
import { IdGenerator} from '../Services/IdGenerator'
import { UserBusiness } from '../Business/UserBusiness'
import { UserDatabase } from '../Data/UserDatabase'
import { Request, Response } from 'express'


export class UserController {

    private static UserBusiness = new UserBusiness(
        new UserDatabase(),
        new HashManager(),
        new IdGenerator(),
        new Authenticator()
    )

    public async signup (req: Request, res: Response) {

        try{

            const result = await UserController.UserBusiness.signup(
                req.body.name,
                req.body.nickname,
                req.body.email,
                req.body.password,
                req.body.role
            )

            res.status(200).send(result)
        }catch(err) {
            res.status(err.errorCode || 400).send({message: err.message})
        }
    }
    
}