// fake data
let lastInsertId = 0
let userGroupLinks = []

// retrieving all the data of links,
// two optional params of user/group can be passed.
exports.getAll = (user = null, group = null) => {
    return new Promise((resolve, reject) => {
        result = []
        if (user) {
            result = userGroupLinks.filter(userGroupLink => userGroupLink.userId == user)
        } else if (group) {
            result = userGroupLinks.filter(userGroupLink => userGroupLink.groupId == group)
        } else {
            result = userGroupLinks
        }

        if (result.length == 0)
            resolve([])

        resolve(result)
    })
}

// delete the link between user and group.
exports.delete = id => {
    return new Promise((resolve, reject) => {
        const index = userGroupLinks.findIndex(link => link.id == id)

        userGroupLinks.splice(index, 1)

        resolve(userGroupLinks)
    })
}
// delete a link for given user,
// when deleting a user, this should be done.
exports.deleteByUser = userId => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < userGroupLinks.length; i++) {
            if (userGroupLinks[i].userId == userId) {
                userGroupLinks.splice(i, 1);
                i--;
            }
        }

        resolve(userGroupLinks)
    })
}

// saving a new link between given user and group.
exports.save = (userId, groupId) => {
    return new Promise((resolve, reject) => {
        // check if this link exist before, then skip saving it.
        const linkExist = userGroupLinks.filter(link => 
            (link.userId == userId && link.groupId == groupId)
        )
        if (linkExist.length > 0) { 
            reject("There is already a link between user and group!")
        } else {
            let newLink = {
                // auto incrementing the id of the fake db.
                id: ++lastInsertId,
                userId: userId,
                groupId: groupId,
            }

            userGroupLinks.push(newLink)

            resolve(newLink)
        }
    })
}
