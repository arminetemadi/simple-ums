import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import GroupAddContainer from '../container/GroupAddContainer'
import GroupAdd from '../presentational/GroupAdd'

jest.mock("../services/FormService")

describe("Group Add Page Testing...", () => {
    // test if group add page load without any errors,
    // also test the save group validation and submittion.
    /*it('renders group add page', async () => {
        const wrapper = shallow(<GroupAddContainer />)

        await new Promise(resolve => {setTimeout(resolve, 1)})

        jest.useFakeTimers()
        setTimeout(async () => {
            wrapper.update()

            const instance = wrapper.instance()
            // check options are loaded successfully.
            expect(instance.state.userOptions.length).toEqual(2)

            // check for GroupAdd component loaded without errors.
            const props = {
                userOptions: instance.state.userOptions,
                handleInputChange: instance.handleInputChange, 
                handleSelectChange: instance.handleSelectChange, 
                handleSubmit: instance.handleSubmit
            }
            const inner = mount(<BrowserRouter><GroupAdd {...props} /></BrowserRouter>)
            expect(inner.contains('Add New Group')).toEqual(true)

            // check if name validation working properly.
            instance.handleSubmit()
            expect(instance.state.messageText).toEqual("Please fill in the name input!")
            // check if locking the form is reset after the validation.
            expect(instance.state.lock).toEqual(false)
            
            // check for data submittion.
            // instance.state.links = [instance.state.userOptions[0].id]
            // instance.handleSubmit()
            // await new Promise(resolve => {setTimeout(resolve, 1)})
            // jest.useFakeTimers()
            // setTimeout(() => {
            //     expect(instance.state.messageType).toEqual('success')
            //     expect(instance.state.lock).toEqual(false)
            // })
            // jest.runAllTimers()

        })
        jest.runAllTimers()
    })*/

})