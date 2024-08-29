export default function Input({
    type = null, 
    value = null, 
    specialClass = null,
    handleChange = null,
    required = false,
    placeholder = null
}){

    return(
        <input 
            required={required}
            onChange={(e) => handleChange(e.target.value)} 
            type={type} 
            value={value} 
            className={specialClass} 
            placeholder = {placeholder && placeholder}
        />
    )
}