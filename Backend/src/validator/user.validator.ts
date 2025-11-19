import {z} from "zod"

const userRegistrationSchema=z.object({
    name:z.string().min(1,{message:"name is required"}),
    email:z.email(),
    password:z.string().min(1,{message:"password is required"})
})


export {userRegistrationSchema}