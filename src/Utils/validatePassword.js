const validatePassword = (password) => {
    const passLength = password.length >= 8
    const passChar = /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}/.test(password)
    return passLength && passChar 
}

export default validatePassword;