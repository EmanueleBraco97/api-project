import supertest from "supertest";

import {prismaMock} from './lib/prisma/client.mock';

import app from './app';

const request = supertest(app);

describe("GET /planets", () => {
    test("Valid request", async () => {
        const planets = [
            {
            id: 1,
            name: "Mercury",
            description: null,
            diametr: 1234,
            moons: 12,
        },
        {
            id: 2,
            name: "Venus",
            description: null,
            diametr: 5678,
            moons: 2
        },
    ];
        //@ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(planets);
              
        const response = await request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        
        expect(response.body).toEqual(planets);
    });
});

describe("POST /planets", () => {
    test("Invalid request", async() => {
        const planet = {
            diametr: 1234,
            moons: 12,
        };

        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/)

        expect(response.body).toEqual({
            errors: {
                body:expect.any(Array)
            }
        });
    });
});
    



