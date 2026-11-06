import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('standard two panels', () => {
  assert.deepEqual(api.curtainPlan(2, 3), {
    finishedWidthPerPanel: 2,
    cutWidthPerPanel: 2,
    cutDrop: 3,
    totalCutArea: 12,
  });
});
test('hems and header', () => {
  const p = api.curtainPlan(2, 3, 2, 2, 0.1, 0.2, 0.3);
  assert.equal(p.cutWidthPerPanel, 2.2);
  assert.equal(p.cutDrop, 3.5);
});
test('single panel', () => {
  assert.equal(api.curtainPlan(2, 3, 1, 2).cutWidthPerPanel, 4);
});
test('no fullness', () => {
  assert.equal(api.curtainPlan(2, 3, 2, 1).finishedWidthPerPanel, 1);
});
test('fullness conservation', () => {
  const p = api.curtainPlan(5, 3, 4, 2.5);
  assert.equal(p.finishedWidthPerPanel * 4, 12.5);
});
test('invalid choices', () => {
  assert.throws(() => api.curtainPlan(2, 3, 0));
  assert.throws(() => api.curtainPlan(2, 3, 2, 0.5));
  assert.throws(() => api.curtainPlan(2, 3, 2, 2, -1));
});
