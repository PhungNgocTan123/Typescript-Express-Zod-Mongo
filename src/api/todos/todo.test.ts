import request from 'supertest';

import app from '../../app';
import { Todos } from './todos.model';

describe('GET /api/v1/todos', () => {
    it('responds with an array of todos', async () => {
        request(app)
            .get('/api/v1/todos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((respond) => {
                expect(respond.body).toHaveProperty('length')
                expect(respond.body.length).toBe(0);
            })
    })
})