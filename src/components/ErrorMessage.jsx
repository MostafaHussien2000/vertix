function ErrorMessage({children}) {
    return <p className={"error-msg"}>{children || "Something went wrong."}</p>
}

export default ErrorMessage;