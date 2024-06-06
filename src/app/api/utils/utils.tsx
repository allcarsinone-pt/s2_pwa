import { redirect } from "next/navigation";
import { validateAuth } from "../usersAPI";

export const verifyAuth = (user: any, onValidate: any) => {
    const token = user.isAuthenticated();
    if (!token) {
        redirect("/login");
    }

    validateAuth(token).then((username) => {
        if (!username) {
            console.log("Invalid token");
            localStorage.removeItem("token");
            redirect("/login");  
        }
        onValidate(username)
    }).catch((error) => {
        localStorage.removeItem("token");
        redirect("/login");
    });
}
