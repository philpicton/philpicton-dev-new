# Dependabot and Supply Chain Security Setup

This project uses a comprehensive security setup to protect against supply chain attacks and keep dependencies up to date.

## 🤖 Dependabot Configuration

### What's Configured

- **Weekly dependency scans** every Monday at 9:00 AM UTC
- **Automatic grouping** of patch and minor updates
- **Security updates** for both npm packages and GitHub Actions
- **Automatic labels** for easy PR categorization
- **Major version blocking** - all major updates require manual review

### Auto-Merge Policy

✅ **Auto-merged after tests pass:**

- Patch updates (e.g., 1.0.0 → 1.0.1)
- Minor updates (e.g., 1.0.0 → 1.1.0)

❌ **Requires manual review:**

- Major updates (e.g., 1.0.0 → 2.0.0) - potential breaking changes
- Any update that fails tests or linting

## 🔒 Supply Chain Protection

### 1. Automated Security Scanning

**Weekly Security Audits** (`.github/workflows/security-audit.yml`)

- Runs `bun audit` to check for known vulnerabilities
- Fails CI if high or critical vulnerabilities are found
- Uploads audit reports as artifacts
- Checks for outdated dependencies

**Manual Security Commands:**

```bash
# Run security audit
bun run audit

# Attempt to auto-fix vulnerabilities
bun run audit:fix

# Check for outdated packages
bun run outdated
```

### 2. Lock File Protection

- `bun.lock` is committed to version control
- CI uses `--frozen-lockfile` to ensure reproducible builds
- Prevents phantom dependency injection

### 3. Package Registry Security

Configuration in `.npmrc`:

- ✅ Only use official npm registry
- ✅ Enable audit on install
- ✅ Save exact versions (no version ranges)
- ✅ Moderate audit level enforcement
- ✅ Retry failed downloads with timeout

### 4. GitHub Security Features

Enable these in your GitHub repository settings:

**Settings → Security & analysis:**

1. ✅ Dependency graph
2. ✅ Dependabot alerts
3. ✅ Dependabot security updates
4. ✅ Secret scanning
5. ✅ Code scanning (if available)

### 5. Branch Protection

**Recommended settings for `main` branch:**

1. ✅ Require pull request reviews
2. ✅ Require status checks to pass:
   - Linting
   - Build
   - Security audit
3. ✅ Require signed commits (recommended)
4. ✅ Include administrators

## 📋 Workflows

### 1. Dependabot Auto-Merge (`.github/workflows/dependabot-auto-merge.yml`)

**Triggers:** When Dependabot opens/updates a PR

**Process:**

1. Runs linter
2. Builds the project
3. If tests pass:
   - Auto-approves patch/minor updates
   - Enables auto-merge
4. If major update:
   - Adds comment requiring manual review
   - Does NOT auto-merge

### 2. Security Audit (`.github/workflows/security-audit.yml`)

**Triggers:**

- Push to main
- Pull requests
- Weekly schedule (Mondays 9 AM UTC)
- Manual trigger

**Process:**

1. Runs `bun audit`
2. Checks for high/critical vulnerabilities
3. Uploads audit report
4. Checks for outdated dependencies

## 🛡️ Additional Security Best Practices

### Before Adding a New Dependency

1. **Check package reputation:**
   - Downloads per week on npmjs.com
   - Number of GitHub stars
   - Last update date
   - Number of maintainers

2. **Review the code:**
   - Check the package's GitHub repository
   - Review recent issues and PRs
   - Look for security advisories

3. **Verify authenticity:**
   - Check for typosquatting (similar names to popular packages)
   - Verify the package maintainer

4. **Use specific versions:**
   - Avoid wildcards (`*`) or loose ranges (`^`, `~`)
   - Lock to exact versions for production dependencies

### Monitoring

**Set up alerts for:**

- 📧 Dependabot security alerts (email notifications)
- 🔔 GitHub Actions failures
- 📊 Weekly security audit reports

**Regular reviews:**

- Weekly: Review Dependabot PRs
- Monthly: Manual dependency audit
- Quarterly: Full security review

## 🚨 Incident Response

### If a vulnerability is discovered

1. **Critical/High severity:**
   - Merge Dependabot PR immediately after tests pass
   - Deploy to production ASAP
   - Review logs for potential exploitation

2. **Medium severity:**
   - Merge within 1 week
   - Schedule deployment with next release

3. **Low severity:**
   - Merge with regular dependency updates
   - No immediate action required

## 📝 Maintenance

### Weekly Tasks

- [ ] Review and merge Dependabot PRs
- [ ] Check security audit results

### Monthly Tasks

- [ ] Run `bun run outdated` to check for new versions
- [ ] Review and update dependencies with major versions
- [ ] Check for abandoned/deprecated packages

### Quarterly Tasks

- [ ] Full security review
- [ ] Update security policies
- [ ] Review and update branch protection rules

## 🔗 Additional Resources

- [npm Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)
- [GitHub Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [OWASP Top 10 for CI/CD](https://owasp.org/www-project-top-10-ci-cd-security-risks/)
- [Snyk's 10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)

## 🤝 Contributing

When contributing, ensure:

- All tests pass locally
- Run `bun run audit` before committing
- Don't add dependencies without discussion
- Follow the security guidelines above
