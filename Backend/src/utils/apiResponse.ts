class ApiResponse<T=any>{
    status:number
    data:T
    message:string
    success:boolean
    constructor(status:number,data:T,message:string){
        this.status=status,
        this.data=data,
        this.message=message
        this.success=status<400
    }
}

export {ApiResponse}