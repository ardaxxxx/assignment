import { test, expect } from '@playwright/test';

const BASE_URL = 'https://petstore.swagger.io';

test ("Create a new pet", async({request, baseURL}) => {

    const response = await request.post(`${baseURL}pet`, {
        data: {
            "id": Math.random(),
            "category": {
              "id": Math.random(),
              "name": "Dog"
            },
            "name": "Karabas",
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": Math.random(),
                "name": "Black"
              }
            ],
            "status": "available"

        }
    });

    // new pet data check
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const petDetail = await response.json();
    console.log(petDetail);

});

test("Create and delete a pet", async({request, baseURL}) => {
    const response = await request.post(`${baseURL}pet`, {
        data : {
            "id": Math.random(),
            "category": {
              "id": Math.random,
              "name": "cat"
            },
            "name": "Bihter",
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": Math.random,
                "name": "white"
              }
            ],
            "status": "available"
          }
    })

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    console.log(response);

    // new pet data check
    expect((await response.json()).name).toBe("Bihter");
    expect(((await response.json()).category).name).toBe("cat");
    expect(((await response.json()).tags[0]).name).toBe("white");
    

    const petId = (await response.json()).id

    // deleting the pet using petid
    const deletePet = await request.delete(`${baseURL}pet/`+petId)

    // check deleted pet
    const getPet = await request.get(`${baseURL}pet/`+petId);

    // pet not found check after deleting 
    expect(response.ok()).toBeTruthy();
    expect(getPet.status()).toBe(404);
    expect((await getPet.json()).message).toBe("Pet not found");


});

test("Create and update pet", async({request, baseURL}) => {
    const response = await request.post(`${baseURL}pet`, {
        data : {
            "id": Math.random(),
            "category": {
              "id": Math.random,
              "name": "cat"
            },
            "name": "Pamuk",
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": Math.random,
                "name": "white"
              }
            ],
            "status": "available"
          }
    })

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // new pet data check
    expect((await response.json()).name).toBe("Pamuk");
    expect(((await response.json()).category).name).toBe("cat");
    expect(((await response.json()).tags[0]).name).toBe("white");
    const petId = (await response.json()).id

    // updating the created pet
    const updatePet = await request.put(`${baseURL}pet`, {
        data : {
            "id": petId,
            "category": {
              "id": Math.random(),
              "name": "cat"
            },
            "name": "Leyla",
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": Math.random(),
                "name": "grey"
              }
            ],
            "status": "available"
          }
        })

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // check updated pet
    expect((await updatePet.json()).name).toBe("Leyla");
    expect(((await updatePet.json()).category).name).toBe("cat");
    expect(((await updatePet.json()).tags[0]).name).toBe("grey");

});



