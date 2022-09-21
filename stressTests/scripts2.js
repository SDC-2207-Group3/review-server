import http from 'k6/http';
import { sleep, check } from 'k6';
import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';

export const options = {
  vus: 100,
  duration: '30s',
}

export default function () {
  const url = 'http://localhost:4000/reviews';
  let id = Math.floor(Math.random() * 1000000);
  const searchParams = new URLSearchParams([
    ['product_id', `${id}`],
    ['sort', 'relevant'],
    ['count', '10'],
  ]);

  const res = http.get(`${url}?${searchParams.toString()}`);
  sleep(1);
  check(res, { 'status was 200': r => r.status == 200});
}