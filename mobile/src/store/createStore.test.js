const createStore = require("./createStore")
// @ponicode
describe("createStore.default", () => {
    test("0", () => {
        let callFunction = () => {
            createStore.default("Gorgeous", "Legacy")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            createStore.default("Rustic", "Legacy")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            createStore.default("Rustic", "District")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            createStore.default("Tasty", "Corporate")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            createStore.default("Intelligent", "Legacy")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            createStore.default(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
