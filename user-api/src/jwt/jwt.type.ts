export class Payload {
    userId: number
    role: string
    status: number
    iat: number = Date.now()
}