import supertest from "supertest";

import {prismaMock} from './lib/prisma/client.mock';

import app from './app';

const request = supertest(app);

test("GET /planets", async () => {
    const planets = [
        {
            id: 1,
            name: "Mercury",
            description: null,
            diametr: 1234,
            moons: 12,
            createdAt: "2022-08-01T14:14:42.931Z",
            updatedAt: "2022-08-01T14:09:40.079Z"
        },
        {
            id: 2,
            name: "Venus",
            description: null,
            diametr: 5668,
            moons: 10,
            createdAt: "2022-08-01T14:14:42.931Z",
            updatedAt: "2022-08-01T14:10:45.551Z"
        }
    ];

    // @ts-ignore
    prismaMock.planet.findMany.mockResolvedValue(planets);


    const response = await request
        .get("/planets")
        .expect(200)
        .expect("Content-Type", /application\/json/)
    
    expect(response.body).toEqual(planets)


});