import { IComment } from "./models"

export interface IAppContext {
    comments: IComment[]
    setComments: React.Dispatch<React.SetStateAction<IComment[]>>
} 