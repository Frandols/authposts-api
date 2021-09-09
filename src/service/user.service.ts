import { DocumentDefinition } from 'mongoose';
import User, { UserDocument } from '../models/user.model'
import { omit } from 'lodash'

export async function createUser(input: DocumentDefinition<UserDocument>){
    try{
        return await User.create(input)
    } catch(error: any) {
        throw new Error(error)
    }
}
export async function validateUser({
    email,
    password
}: {
    email: UserDocument['email']
    password: string
}) {
    const user = await User.findOne({ email })

    if(!user){
        return false
    }

    const isValid = await user.comparePassword(password)

    if(!isValid){
        return false
    }

    return omit(user.toJSON(), 'password')
}
export async function getUser(id: string){
    return await User.findOne({ _id: id })
}
export async function getUsers(){
    return (await User.find()).map(
        user => user.name
    )
}