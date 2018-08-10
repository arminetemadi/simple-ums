import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import UserGroupLinkAddContainer from '../container/UserGroupLinkAddContainer'
import UserGroupLinkAdd from '../presentational/UserGroupLinkAdd'

jest.mock("../services/FormService")

describe("Group Add Page Testing...", () => {
    // test if group add page load without any errors,
    // also test the save group validation and submittion.
    it('renders group add page', async () => {
        const wrapper = shallow(<UserGroupLinkAddContainer />)

        await new Promise(resolve => {setTimeout(resolve, 1)})

        jest.useFakeTimers()
        setTimeout(async () => {
            wrapper.update()

            const instance = wrapper.instance()
            // check options are loaded successfully.
            expect(instance.state.userOptions.length).toEqual(2)
            expect(instance.state.groupOptions.length).toEqual(2)
            // check for UserGroupLinkAdd component loaded without errors.
            const props = {
                userOptions: instance.state.userOptions,
                groupOptions: instance.state.groupOptions,
                handleSelectChange: instance.handleSelectChange, 
                handleSubmit: instance.handleSubmit
            }
            const inner = mount(<BrowserRouter><UserGroupLinkAdd {...props} /></BrowserRouter>)
            expect(inner.contains('Add New User Group Link')).toEqual(true)

            // check if user selected option validation working properly.
            instance.handleSubmit()
            expect(instance.state.messageText).toEqual("Please select a user!")
            // check if locking the form is reset after the validation.
            expect(instance.state.lock).toEqual(false)

            // check if group selected option validation working properly.
            instance.state.userSelect = instance.state.userOptions[0].id
            instance.handleSubmit()
            expect(instance.state.messageText).toEqual("Please select a group!")
            // check if locking the form is reset after the validation.
            expect(instance.state.lock).toEqual(false)
            
            // check for data submittion.
            instance.state.groupSelect = instance.state.groupOptions[0].id
            instance.handleSubmit()
            await new Promise(resolve => {setTimeout(resolve, 1)})
            jest.useFakeTimers()
            setTimeout(() => {
                expect(instance.state.messageType).toEqual('success')
                expect(instance.state.lock).toEqual(false)
            })
            jest.runAllTimers()

        })
        jest.runAllTimers()
    })

    

})