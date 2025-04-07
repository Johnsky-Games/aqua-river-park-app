// backend/test/health.test.js
import request from 'supertest';
import app from '../app.js';

describe('💚 Test de salud', () => {
  it('GET / ➤ responde correctamente', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Aqua River Park');
  });
});
