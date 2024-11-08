import { iTodo } from "../../interfaces/i-todo"

export interface iUser {
  id:number
  name:string
  surname:string
  nikname:string
  email:string
  password:string
  todo?: iTodo
}
