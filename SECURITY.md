# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it by emailing the maintainers. Please do not open a public issue.

## Dependency Security

This project uses several tools to protect against supply chain attacks:

### 1. Dependabot

- Automatically checks for vulnerable dependencies
- Creates pull requests for security updates
- Runs weekly scans for new vulnerabilities

### 2. npm audit

Run regular security audits:

```bash
bun audit
# or
npm audit
```

### 3. Lock Files

- Always use `bun.lock` to ensure reproducible builds
- Commit lock files to version control
- Use `--frozen-lockfile` in CI/CD pipelines

### 4. Package Verification

This project uses verified packages with:

- Signed commits when possible
- Known maintainers
- Active maintenance history

## Automated Security Checks

Our CI/CD pipeline includes:

- ✅ Dependency vulnerability scanning (Dependabot)
- ✅ Automated security updates (non-breaking changes)
- ✅ Build verification before merge
- ✅ Lint checks for code quality

## Additional Security Recommendations

### GitHub Repository Settings

1. **Enable Dependency Graph**: Settings → Security & analysis → Dependency graph
2. **Enable Dependabot Alerts**: Settings → Security & analysis → Dependabot alerts
3. **Enable Dependabot Security Updates**: Settings → Security & analysis → Dependabot security updates
4. **Enable Secret Scanning**: Settings → Security & analysis → Secret scanning
5. **Enable Code Scanning** (GitHub Advanced Security): Settings → Security & analysis → Code scanning

### Branch Protection Rules

Configure branch protection for `main`:

1. Require pull request reviews
2. Require status checks to pass (lint, build, test)
3. Require signed commits (recommended)
4. Include administrators in restrictions

### Supply Chain Attack Prevention

1. **Review dependencies regularly**: Check for typosquatting
2. **Audit new dependencies**: Review package maintainers and download statistics
3. **Use subresource integrity**: For any CDN-loaded assets
4. **Monitor for suspicious activity**: Watch for unusual package updates
5. **Use npm/bun audit**: Run before every deployment

## Security Update Priority

Updates are prioritized as follows:

1. 🔴 **Critical vulnerabilities**: Immediate action required
2. 🟠 **High vulnerabilities**: Merge within 48 hours
3. 🟡 **Medium vulnerabilities**: Merge within 1 week
4. 🟢 **Low vulnerabilities**: Merge with next dependency update cycle

## Supported Versions

| Version | Supported |
| ------- | --------- |
| Latest  | ✅ Yes    |
| Older   | ❌ No     |

Always use the latest version for security updates.
