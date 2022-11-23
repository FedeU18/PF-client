import logOut from "../../Authentication/functions/logOut"
import { NavBar } from "../../components/Nav/Nav"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../Authentication/context/AuthContext"

export const Home = () => {
    const user = useContext(AuthContext)
    console.log(user)
    const navigate = useNavigate()

    const CloseMySesion = () => {
        logOut()
        navigate("/")
    }

    return (
        <div>
            <NavBar />
            Home.
            <button
                className="btn btn-danger btn-sm"
                onClick={CloseMySesion}>
                Log out
            </button>
        </div>
    )
}