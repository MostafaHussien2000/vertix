/* React Icons
============== */
import { BiSolidErrorCircle } from "react-icons/bi";

function ErrorMessage({children}) {
    return (
        <p className={"error-msg"}>
            <BiSolidErrorCircle />
            <span>
                {children || "Something went wrong."}
            </span>
        </p>
    )
}

export default ErrorMessage;