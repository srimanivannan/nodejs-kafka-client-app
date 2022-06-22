const fetch = require("node-fetch");
const avsc = require("avsc");
// const logger = require('../util/logger');
class CustomSchemaRegistry {
    constructor({ url, parseOptions }) {
        this.url = url;
        this.parseOptions = parseOptions;
        this.cache = new Map();
    }

    async getSchema(filter) {
        const key = filter.id ? filter.id : `${filter.subject}:${filter.version}`;
        console.log('Getting schema for key: %s', key);
        /* Check if schema is in cache: */
        if (this.cache.has(key)) {
            console.log('Found schema cache entry for key: %s', key);
            const { id, schema } = this.cache.get(key);
            return {
                id,
                schema: avsc.parse(schema, this.parseOptions),
            };
        }
        console.log('Schema cache entry for key: %s was not found', key);
        /* Schema is not in cache, download it: */
        let url;
        // example: url = http://localhost:8081/schemas/ids/1
        if (filter.id) url = `${this.url}/schemas/ids/${filter.id}`;
        // example: url = http://localhost:8081/subjects/mani-facts-value/versions/1
        if (filter.subject && filter.version) url = `${this.url}/subjects/${filter.subject}-value/versions/${filter.version}`;
        console.error("determined url", url);
        if (url === undefined) {
            throw new Error(
                'In order to fetch a schema, an object with format {id} or {subject, version} must be provided'
            );
        }
        console.log(
            'Retrieving schema for id: %s, subject: %s, version: %s',
            filter.id,
            filter.subject,
            filter.version
        );
        const response = await fetch(url);
        if (response.status !== 200) {
            throw new Error(
                `${
                    response.status
                } response code from registry when trying to fetch ${JSON.stringify(
                    filter
                )}\n${url}\n${response.statusText}`
            );
        }
        const { id, schema } = await response.json();
        console.log(
            'Finished retrieving schema for id: %s, subject: %s, version: %s',
            filter.id,
            filter.subject,
            filter.version
        );
        console.log('Parsing schema for id: %s', id);
        const parsedSchema = avsc.parse(schema, this.parseOptions);
        console.log('Finishing parsing schema for id: %s', id);
        console.log('Setting schema cache entry for key: %s', key);
        this.cache.set(key, { id: filter.id || id, schema });
        console.log('Finished setting schema cache entry for key: %s', key);
        return { id: filter.id || id, schema: parsedSchema };
    }

    async encode(subject, version, originalMessage) {
        console.log(
            'Encoding message: %o with subject: %s and version: %s',
            originalMessage,
            subject,
            version
        );
        const { id, schema } = await this.getSchema({ subject, version });
        const encodedMessage = schema.toBuffer(originalMessage);
        const message = Buffer.alloc(encodedMessage.length + 5);
        message.writeUInt8(0, 0);
        message.writeUInt32BE(id, 1);
        encodedMessage.copy(message, 5);
        console.log(
            'Finished encoding message: %o with subject: %s and version: %s',
            originalMessage,
            subject,
            version
        );
        return message;
    }

    async decode(object) {
        console.log('Decoding message: %o', object);
        const id = object.readUInt32BE(1);
        const { schema } = await this.getSchema({ id });
        const decodedObject = schema.fromBuffer(object.slice(5));
        console.log(
            'Finished decoding message: %o, decodedObject: %o',
            object,
            decodedObject
        );
        return decodedObject;
    }
}
module.exports = CustomSchemaRegistry;
