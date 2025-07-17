# Contributing to Next-Gen Portfolio

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issue tracker](https://github.com/mohansagark/next-gen-portfolio/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/mohansagark/next-gen-portfolio/issues/new).

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/next-gen-portfolio.git
   cd next-gen-portfolio
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Generate blog data**

   ```bash
   yarn generate:blogs
   ```

4. **Start development server**
   ```bash
   yarn dev
   ```

## Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Follow the existing code style
- Run `yarn lint` to check for linting errors

## Adding New Features

### Blog Features

When adding blog-related features:

1. Update the MDX frontmatter schema if needed
2. Modify `scripts/convert-mdx-to-json.mjs` for data processing
3. Update blog components in `src/components/shared/blog-details/`
4. Test with sample MDX files

### UI Components

When adding UI components:

1. Create component in appropriate directory under `src/components/`
2. Follow the existing naming conventions
3. Use Tailwind CSS for styling
4. Ensure responsive design
5. Add proper TypeScript types if applicable

### Homepage Layouts

When adding new homepage layouts:

1. Create new directory under `src/app/home-{number}/`
2. Follow existing layout patterns
3. Update navigation if needed
4. Test across different screen sizes

## Testing

Before submitting a pull request:

1. **Test locally**

   ```bash
   yarn dev
   ```

2. **Build production**

   ```bash
   yarn build
   ```

3. **Check for linting errors**

   ```bash
   yarn lint
   ```

4. **Test blog generation**
   ```bash
   yarn generate:blogs
   ```

## Commit Messages

Write clear commit messages:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Examples:

```
Add blog filtering by tags

- Implement tag-based filtering in blog listing
- Update blog components to handle tag queries
- Add URL parameter support for tag filtering

Fixes #123
```

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## References

This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md).
