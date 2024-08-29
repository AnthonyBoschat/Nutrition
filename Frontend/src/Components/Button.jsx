export default function Button({
    onClick,
    children,
    specialClass
}){


    return(
        <button className={specialClass} onClick={onClick}>
            {children}
        </button>
    )
}