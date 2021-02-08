import request from 'supertest';
import server from '../../server/middleware';

let token: string;

afterEach(function () {
    server.close();
});

describe('Auth', () => {
    it('Should respond to the POST method with a 200 status code when the username and password is correct', async () => {
        await request(server)
            .post('/auth')
            .send({
                username: 'user@yahoo.com',
                password: 'abc123',
            })
            .expect(200)
            .expect((res) => res.body !== undefined);
    });
    it('Should respond with a 403 code when the POST method is called with the incorrect username and password', async () => {
        await request(server)
            .post('/auth')
            .send({
                username: 'invalidUser',
                password: 'invalidPassword',
            })
            .expect(403);
    });
    it('Should respond with a 204 code when the POST method is called with the sign out path', async () => {
        await request(server).post('/auth').send({
            username: 'user@yahoo.com',
            password: 'abc123',
        });
        await request(server).post('/auth/signout').expect(204);
    });
});

describe('Graph API', () => {
    beforeAll(async (done) => {
        await request(server)
            .post('/auth')
            .send({
                username: 'user@yahoo.com',
                password: 'abc123',
            })
            .then((response) => {
                token = response.body;
                done();
            });
    });
    it('Should respond with a 201 code when post is called with the graphs path and user is signed in', async () => {
        await request(server)
            .post('/graphs')
            .set('Authorization', token)
            .send({
                graphId: 'validGraph',
                description: 'CREATING',
            })
            .expect(201);
    });
    it('Should respond with a 500 code when post is called with the graphs path and user is signed in', async () => {
        await request(server)
            .post('/graphs')
            .set('Authorization', token)
            .send({
                graphId: 'fail',
                description: 'FAILED',
            })
            .expect(500);
    });
    it('Should respond with graphs when GET is called with the graphs path and user is signed in', async () => {
        await request(server)
            .get('/graphs')
            .set('Authorization', token)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toStrictEqual([
                    {
                        graphId: 'roadTraffic',
                        description: 'DEPLOYED',
                    },
                    {
                        graphId: 'basicGraph',
                        description: 'DEPLOYED',
                    },
                ]);
            });
    });
    it('Should respond with a graph when GET is called with the graphs path and user is signed in', async () => {
        await request(server)
            .get('/graphs/roadTraffic')
            .set('Authorization', token)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toStrictEqual({
                    graphId: 'roadTraffic',
                    description: 'DEPLOYED',
                });
            });
    });
    it('Should respond with a 204 code when GET is called with the graphs path and user is signed in', async () => {
        await request(server)
            .delete('/graphs/roadTraffic')
            .set('Authorization', token)
            .then((response) => {
                expect(response.statusCode).toBe(202);
            });
    });
});
export {};
