# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

The Next-Gen Portfolio team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

### How to Report a Security Vulnerability

If you believe you have found a security vulnerability in Next-Gen Portfolio, please report it to us through coordinated disclosure.

**Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

Instead, please send an email to: **security@mohansagar.dev**

Please include as much of the information listed below as you can to help us better understand and resolve the issue:

- The type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

This information will help us triage your report more quickly.

### Response Timeline

We will acknowledge receipt of your vulnerability report within 48 hours, and will send a more detailed response within 72 hours indicating the next steps in handling your report.

We will keep you informed of the progress towards a fix and full announcement, and may ask for additional information or guidance.

### Disclosure Policy

- When we receive a security bug report, we will assign it to a primary handler
- The primary handler will confirm the problem and determine the affected versions
- We will fix the problem and prepare patches for all affected versions
- We will coordinate the release of these fixes and publish a security advisory

### Security Considerations

This project involves:

1. **Client-side JavaScript**: Potential XSS vulnerabilities
2. **Server-side Rendering**: SSR security considerations
3. **Static File Serving**: File access vulnerabilities
4. **Third-party Dependencies**: Supply chain security
5. **Content Management**: MDX content security

### Best Practices

When contributing to this project, please:

1. **Sanitize User Input**: Always validate and sanitize user inputs
2. **Keep Dependencies Updated**: Regularly update npm packages
3. **Use HTTPS**: Ensure all external requests use HTTPS
4. **Content Security Policy**: Implement proper CSP headers
5. **Environment Variables**: Never commit sensitive data

### Security Headers

The application should implement the following security headers:

```javascript
// next.config.mjs
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
];
```

### Dependencies Security

We regularly audit our dependencies for security vulnerabilities:

```bash
# Check for vulnerabilities
yarn audit

# Fix vulnerabilities
yarn audit fix
```

### Content Security

When working with MDX content:

1. **Sanitize MDX**: Ensure MDX content is properly sanitized
2. **Validate Frontmatter**: Validate all frontmatter fields
3. **Limit File Access**: Restrict file system access
4. **Content Validation**: Validate all user-generated content

## Vulnerability Disclosure Examples

### High Severity

- Remote Code Execution (RCE)
- SQL Injection
- Authentication Bypass
- Cross-Site Scripting (XSS) in admin areas

### Medium Severity

- Cross-Site Scripting (XSS) in user areas
- Cross-Site Request Forgery (CSRF)
- Information Disclosure
- Local File Inclusion

### Low Severity

- Non-sensitive information disclosure
- Content injection without XSS
- Rate limiting bypass

## Contact Information

For any security-related questions or concerns, please contact:

- **Email**: security@mohansagar.dev
- **GitHub**: [@mohansagark](https://github.com/mohansagark)

## Acknowledgments

We would like to thank all security researchers who have responsibly disclosed vulnerabilities to us.
