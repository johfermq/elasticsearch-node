const destructuring = (user) => {
    const { _id, name, email, createdAt, updatedAt } = user
    return {
        _id, name, email, createdAt, updatedAt
    }
}

const userResource = (data) => {
    if (Array.isArray(data)) {
        return data.map(user => {
            return destructuring(user)
        })
    }

    return destructuring(data)
}

module.exports = {
    userResource
}