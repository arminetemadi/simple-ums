# React User Management system (UMS)

This is a simple react application for user management.

## Installation

1. Install server side Dependancies
    ```javascript
    cd <ROOT_DIR>
    npm install
    ```

2. Install client side dependancies
    ```javascript
    cd <ROOT_DIR>/client
    npm install
    ```

3. Run the server
    ```javascript
    cd <ROOT_DIR>
    npm run server
    ```

4. Run the client(in different console)
    ```javascript
    cd <ROOT_DIR>
    npm run client
    ```
  or you can directly run the client by following command:
  
    ```
    cd <ROOT_DIR>/client
    npm start
    ```

5. Jest is included for testing React components.
    ```javascript
    // Run Jest outside of the development console for front-end component tests.
    cd <ROOT_DIR>/client
    npm run test
    ```


## API endpoints (and JSON structures)

There are three main routes at server side: `/users/`, `/groups/` and `/userGroupLinks/`.

    1. `/users/` routes:

        - `/` return the list of users (with `userId` as search parameter)

        - `/add/` save the new user by given params(`name`, array of `links` to groups)

        - `/delete/` delete a user (with given `id`)

        - `/detail/` return details of a user (with given `id`)

        - `/options/` return the list of users for using in select fields

    2. `/groups/` routes:

        - `/` return the list of groups (with `groupId` as search parameter)

        - `/add/` save the new group by given params(`name`, optional array of `links` to users)

        - `/delete/` delete a group (with given `id`)

        - `/detail/` return details of a group (with given `id`)

        - `/options/` return the list of groups for using in select fields

    3. `/userGroupLinks/` routes:

        - `/add/` save the new link between user and group by given params(`userId`, `groupId`)

        - `/delete/` delete a link (with given `id`)

Here is the structure of JSON responses:

  1. in successfull responses:
  
    ```
    {
      success: true,
      result: [...]   // array of objects of retrived data from server
    }
    ```
  
  2. in failed responses:
  
    ```
    {
      success: false,
      message: ''     // string of message text indicates the reason of failure
    }
    ```


## FAQ

* __Where can I find more documentation?__

    React setup created with [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
