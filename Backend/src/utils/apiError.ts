
class ApiError extends Error{
    status:number
    error:any
    constructor(status:number,err:any,message:string){
        super(message)
        this.status=status
        this.error=err
        Object.setPrototypeOf(this,new.target.prototype)
        if(Error.captureStackTrace){
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}