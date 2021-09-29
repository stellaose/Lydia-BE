const validatePassword = (password) => {
    const passLength = password.length >=8
    const passChar = /^(?=.*[A-Za-z])(?=.,_*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(password)
    return passLength && passChar 
}

export default validatePassword