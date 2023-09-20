import { Todo } from "./Todo";

export type User={
     userEmail?:String;
     userPassword?:String;
     userPhone?:String;
     userName?:String;
     listOfTodo?:Array<Todo>;
}