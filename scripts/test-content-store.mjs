import assert from 'node:assert/strict';
import { seedContent, getContent } from '../src/libs/contentStore.js';

assert.equal(getContent('skills'), undefined, 'empty store returns undefined');
seedContent({ skills: [1, 2] });
assert.deepEqual(getContent('skills'), [1, 2], 'seeded value readable');
seedContent({ portfolio: ['p'] });
assert.deepEqual(getContent('skills'), [1, 2], 'merge preserves earlier keys');
seedContent(null); // must not throw
seedContent(undefined); // must not throw
assert.deepEqual(getContent('portfolio'), ['p']);
console.log('content store OK');
