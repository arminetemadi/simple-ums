// fake data
let lastInsertId = 0
let users = []

// retrieving all the users,
// userId sent by search form.
exports.getAll = userId => {
    return new Promise((resolve, reject) => {
        let filtered = []
        filtered = userId > 0 
                    ? users.filter(user => user.id == userId) 
                    : users

        if (filtered.length == 0)
            reject("No users found!")

        resolve(filtered)
    })
}

// saving the new user into the fake db.
exports.save = name => {
    return new Promise((resolve, reject) => {
        const newUser = {
            // auto incrementing the id of fake db for users.
            id: ++lastInsertId,
            name: name
        }

        users.push(newUser)

        resolve(newUser)
    })
}

// delete the given user from fake db.
exports.delete = id => {
    return new Promise((resolve, reject) => {
        let index = users.findIndex(user => user.id == id)

        users.splice(index, 1)
        
        resolve(users)
    })
}
