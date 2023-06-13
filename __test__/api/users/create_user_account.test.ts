import {beforeEach, describe, jest, test} from "@jest/globals";
import {NextFunction, Request, Response} from "express";
import {createUserAccount} from "../../../controllers/api/user/createUserAccount";
import {validationResult} from "express-validator";

describe('Create User Account', () => {
    const mockRequest: Partial<Request> = {}
    const mockResponse: Partial<Response> = {}
    const nextFunction: NextFunction = jest.fn()

    test('should raise error if name field is missing on the body', async () => {
        const nameValidator = createUserAccount[0]
        await nameValidator(mockRequest as Request, mockResponse as Response, nextFunction)
        const errors = validationResult(mockRequest).mapped().name
        expect(errors).toBeTruthy()
        expect(errors.msg).toBeTruthy()
        expect(errors.msg).toStrictEqual("Name is required")
    })

    test('should raise error if email field is missing on the body', async () => {
        const nameValidator = createUserAccount[1]
        await nameValidator(mockRequest as Request, mockResponse as Response, nextFunction)
        const errors = validationResult(mockRequest).mapped().email
        expect(errors).toBeTruthy()
        expect(errors.msg).toBeTruthy()
        expect(errors.msg).toStrictEqual("Email is required")
    })

    test('should raise error if password field is missing on the body', async () => {
        const nameValidator = createUserAccount[2]
        await nameValidator(mockRequest as Request, mockResponse as Response, nextFunction)
        const errors = validationResult(mockRequest).mapped().password
        expect(errors).toBeTruthy()
        expect(errors.msg).toBeTruthy()
        expect(errors.msg).toStrictEqual("Please enter a password with 6 or more characters")
    })

    test('should not-raise error if name field exists but empty on the body', async () => {
        mockRequest.body = { name: ""}
        const nameValidator = createUserAccount[0]
        await nameValidator(mockRequest as Request, mockResponse as Response, nextFunction)
        const errors = validationResult(mockRequest).mapped().name
        expect(errors).toBeTruthy()
        expect(errors.msg).toStrictEqual("Name is required")
    })

    test('should not-raise error if name field exists on the body', async () => {
        mockRequest.body = { name: "simon peter"}
        const nameValidator = createUserAccount[0]
        await nameValidator(mockRequest as Request, mockResponse as Response, nextFunction)
        const errors = validationResult(mockRequest).mapped().name
        expect(errors).toBeFalsy()
        expect(errors.msg).toBeFalsy()
    })
})