'use strict'

import { Handler } from 'aws-lambda'
const db = [{
    id: 'c111',
    text: 'hello',
    date: new Date()
}, {
    id: 'c222',
    text: 'goodbye',
    date: new Date()
}]

export const handler: Handler = async (event: any, context: any) => {

    console.log("lambda start");
    console.log('event', event);
    console.log('context', context);

    const field = event.info.fieldName

    if (field === 'listComments') {
        return db
    } else {

        const id = event.arguments.id

        return db.find(m => m.id === id)
    }

}
