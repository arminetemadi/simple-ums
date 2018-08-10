import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import UserAddContainer from '../container/UserAddContainer'
import UserAdd from '../presentational/UserAdd'

jest.mock("../services/FormService")

describe("User Add Page Testing...", () => {
    // test if user add page load without any errors,
    // also test the save user validation and submittion.
    it('renders user add page', async () => {
        const wrapper = shallow(<UserAddContainer />)

        await new Promise(resolve => {setTimeout(resolve, 1)})

        jest.useFakeTimers()
        setTimeout(async () => {
            wrapper.update()

            const instance = wrapper.instance()
            // check options are loaded successfully.
            expect(instance.state.groupOptions.length).toEqual(2)

            // check for UserAdd component loaded without errors.
            const props = {
                groupOptions: instance.state.groupOptions,
                handleInputChange: instance.handleInputChange, 
                handleSelectChange: instance.handleSelectChange, 
                handleSubmit: instance.handleSubmit
            }
            const inner = mount(<BrowserRouter><UserAdd {...props} /></BrowserRouter>)
            expect(inner.contains('Add New User')).toEqual(true)

            // check if name validation working properly.
            instance.handleSubmit()
            expect(instance.state.messageText).toEqual("Please fill in the name input!")
            
            // check for select group validation,
            // user without links cannot be created.
            instance.state.name = 'user sample'
            instance.handleSubmit()
            expect(instance.state.messageText).toEqual("Please select at least one group!")
            // check if locking the form is reset after the validation.
            expect(instance.state.lock).toEqual(false)

            // check for data submittion.
            instance.state.links = [instance.state.groupOptions[0].id]
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