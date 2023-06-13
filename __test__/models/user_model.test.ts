import {describe, expect, test} from '@jest/globals';
import {userScheme} from "../../models/User";
import { Schema } from "mongoose";

describe('User Schema', () => {
    test('should have fields [name, email, password, avatar, date]', function () {
        const userProperties = ['name', 'email', 'password','avatar', 'date']
        const actualProperties = Object.keys(userScheme.paths).filter(item => !item.includes('_'))

        expect(actualProperties).toStrictEqual(userProperties)
        expect(actualProperties.length).toStrictEqual(userProperties.length)
    });

    test('should have a field named (name) of type StringScheme and required', () => {
        const name = userScheme.path('name')

        expect(name).toBeInstanceOf(Schema.Types.String)
        expect(name.isRequired).toBeTruthy()
        expect(name.validators.length).toStrictEqual(1)
        expect(name.validators.map(item => item.type)).toStrictEqual(['required'])
        // @ts-ignore
        expect(name['defaultValue']).toBeFalsy()
    })

    test('should have a field named (email) of type StringScheme, required and unique', () => {
        const email = userScheme.path('email')
        expect(email).toBeInstanceOf(Schema.Types.String)
        expect(email.isRequired).toBeTruthy()
        expect(email.validators.length).toStrictEqual(1)
        expect(email.validators.map(item => item.type)).toStrictEqual(['required'])
        // @ts-ignore
        expect(email['_index']).toStrictEqual({ unique: true })
        // @ts-ignore
        expect(email['defaultValue']).toBeFalsy()
    })

    test('should have a field named (password) of type StringScheme and required', () => {
        const password = userScheme.path('password')

        expect(password).toBeInstanceOf(Schema.Types.String)
        expect(password.isRequired).toBeTruthy()
        expect(password.validators.length).toStrictEqual(1)
        expect(password.validators.map(item => item.type)).toStrictEqual(['required'])
        // @ts-ignore
        expect(password['defaultValue']).toBeFalsy()
    })

    test('should have a field named (avatar) of type StringScheme and required', () => {
        const avatar = userScheme.path('avatar')

        expect(avatar).toBeInstanceOf(Schema.Types.String)
        expect(avatar.isRequired).toBeFalsy()
        expect(avatar.validators.length).toStrictEqual(0)
        // @ts-ignore
        expect(avatar['defaultValue']).toBeFalsy()
    })

    test('should have a field named (date) of type SchemaDate', () => {
        const date = userScheme.path('date')
        expect(date).toBeInstanceOf(Schema.Types.Date)
        expect(date.isRequired).toBeFalsy()
        // @ts-ignore
        expect(date['defaultValue']).toBeTruthy()
        expect(date.validators.length).toStrictEqual(0)
    })
})