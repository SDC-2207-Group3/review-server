import request from 'supertest';
import assert from 'assert';
import express from 'express';
import app from '../server/app.js';
import mongoose from 'mongoose';


beforeAll(async () => {
})

afterAll(async () => {
  await mongoose.disconnect();
  await app.close();
});

describe('GET /reviews', () => {

  it('should require a product id in the get request', async () => {
    const response = await request(app).get('/reviews');
    expect(response.statusCode).toBe(400);
  })

  it('should return with a 200 status code', async () => {
    const response = await request(app)
    .get('/reviews')
    .query({product_id : 1});
    expect(response.statusCode).toBe(200);
  })

  it('should have the correct fields populated in the response body', async () => {
    const response = await request(app)
    .get('/reviews')
    .query({product_id : 2})
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    let { product, count, results } = response.body;
    expect(product).toBeDefined();
    expect(count).toBeDefined();
    expect(results).toBeDefined();
    for (let result of results) {
      let { review_id, rating, summary, recommend, response, body, date, reviewer_name, photos, reported } = result;
      expect(typeof review_id).toBe('string');
      expect(typeof rating).toBe('number');
      expect(typeof summary).toBe('string');
      expect(typeof recommend).toBe('boolean');
      if (response) {
        expect(typeof response).toBe('string');
      }
      expect(typeof body).toBe('string');
      if (date) {
        expect(typeof date).toBe('string');
      }
      expect(typeof reviewer_name).toBe('string');
      expect(Array.isArray(photos)).toBe(true);
      for (let photo of photos) {
        console.log(photo)
        expect(typeof photo.id).toBe('string');
        expect(typeof photo.url).toBe('string');
      }
      expect(typeof reported).toBe('boolean');
    }

  })

  // should return error if no id is provided, or product not in database

  // return data with product field, count, results
  // results should be an array
  // each element of results should have review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos
  // results.photos should be an array, which could be empty. Each element in photos aray should have an id and url
})
