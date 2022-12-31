import { useContext, useState, createContext } from "react";

export const UserContext = createContext()
UserContext.displayName = 'User'

export default function UserProvider({ children }) {

    const [users, setUsers] = useState([])

    return (
        <UserContext.Provider
            value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    )
    
}

export function useUserContext(){

    const [users, setUsers] = useContext(UserContext)

    function addUser(newUser){
        const userExists = users.some(user => user.idUser === newUser.idUser)

        let newListUsers = [...users]

        if(!userExists){
            newListUsers.push(newUser)
            return setUsers(newListUsers)
        }
        else{
            newListUsers.splice(newListUsers.indexOf(newUser), 1)
            return setUsers(newListUsers)
        }
    }
    return{
        users, addUser
    }
}


