import jwt from 'jsonwebtoken'

const generteToken = (id) => {
    return jwt.sign({ id }, "abc123", {
        expiresIn: '30d'
    })
}

export default generteToken