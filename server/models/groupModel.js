// fake data
let lastInsertId = 0
let groups = []

// retrieve all the data,
// by the given optional groupId.
exports.getAll = groupId => {
    return new Promise((resolve, reject) => {
        let filtered = []
        filtered = groupId > 0 
                    ? groups.filter(group => group.id == groupId) 
                    : groups
        if (filtered.length == 0)
            reject("No groups found!")

        resolve(filtered)
    })
}

// saving the new group to the fake db.
exports.save = (name) => {
    return new Promise((resolve, reject) => {
        const newGroup = {
            id: ++lastInsertId,
            name: name
        }

        groups.push(newGroup)

        resolve(newGroup)
    })
}

// deleting a group by the given id.
exports.delete = id => {
    return new Promise((resolve, reject) => {
        const index = groups.findIndex(group => group.id == id)

        groups.splice(index, 1)

        resolve(groups)
    })
}

