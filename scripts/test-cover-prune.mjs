import assert from 'node:assert/strict';
import { pruneMissingCovers } from './fetch-blog-content.mjs';

// A cover whose file is present is left completely alone.
{
  const blogs = [{ slug: 'a', coverImage: '/blog-images/a.jpg', coverImageAlt: 'alt a' }];
  const pruned = pruneMissingCovers(blogs, (f) => f === 'a.jpg');
  assert.equal(pruned, 0);
  assert.equal(blogs[0].coverImage, '/blog-images/a.jpg');
  assert.equal(blogs[0].coverImageAlt, 'alt a');
}

// A cover whose file is missing has BOTH fields blanked.
{
  const blogs = [{ slug: 'b', coverImage: '/blog-images/b.jpg', coverImageAlt: 'alt b' }];
  const pruned = pruneMissingCovers(blogs, () => false);
  assert.equal(pruned, 1);
  assert.equal(blogs[0].coverImage, '');
  assert.equal(blogs[0].coverImageAlt, '');
}

// A legacy post already at "" is untouched and NOT counted as pruned.
{
  const blogs = [{ slug: 'c', coverImage: '', coverImageAlt: '' }];
  const pruned = pruneMissingCovers(blogs, () => false);
  assert.equal(pruned, 0);
  assert.equal(blogs[0].coverImage, '');
}

// Empty input does not throw.
assert.equal(pruneMissingCovers([], () => true), 0);

// Mixed set: only the missing one is pruned.
{
  const blogs = [
    { slug: 'a', coverImage: '/blog-images/a.jpg', coverImageAlt: 'a' },
    { slug: 'b', coverImage: '/blog-images/b.jpg', coverImageAlt: 'b' },
    { slug: 'c', coverImage: '', coverImageAlt: '' },
  ];
  const pruned = pruneMissingCovers(blogs, (f) => f === 'a.jpg');
  assert.equal(pruned, 1);
  assert.equal(blogs[0].coverImage, '/blog-images/a.jpg');
  assert.equal(blogs[1].coverImage, '');
  assert.equal(blogs[2].coverImage, '');
}

// A malformed entry must not crash the build.
{
  const blogs = [{ slug: 'd' }, { slug: 'e', coverImage: null }];
  assert.equal(pruneMissingCovers(blogs, () => false), 0);
}

console.log('✓ cover prune tests passed');
