function Modal ({view, children}) {
    document.body.overflow = "hidden"


    return (
        <div className={"modal"} onClick={() => view(false)}>
            <div className={"modal__container"} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;