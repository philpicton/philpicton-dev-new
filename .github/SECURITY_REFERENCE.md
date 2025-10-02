# Dependabot & Security Quick Reference

## 🚀 Quick Commands

```bash
# Security audit
bun run audit

# Fix vulnerabilities automatically
bun run audit:fix

# Check for outdated packages
bun run outdated

# Regular workflow
bun run lint
bun run build
```

## 📋 Auto-Merge Matrix

| Update Type | Action | Tests Required |
|-------------|--------|---------------|
| 🟢 Patch (x.x.X) | ✅ Auto-merge | Yes |
| 🟢 Minor (x.X.x) | ✅ Auto-merge | Yes |
| 🔴 Major (X.x.x) | ❌ Manual review | Yes |
| 🔴 Failed tests | ❌ No merge | N/A |

## 🛡️ Security Layers

1. **Prevention**: Lock files, exact versions, registry restrictions
2. **Detection**: Weekly scans, Dependabot alerts, audits
3. **Response**: Auto-patching, test validation, manual review

## 📅 Maintenance Schedule

- **Weekly**: Review Dependabot PRs, check audit results
- **Monthly**: Check outdated packages, review major updates
- **Quarterly**: Full security review, policy updates

## ⚙️ GitHub Settings Checklist

**Settings → Security & analysis:**
- [ ] Dependency graph
- [ ] Dependabot alerts
- [ ] Dependabot security updates
- [ ] Secret scanning
- [ ] Code scanning

**Settings → Branches → main:**
- [ ] Require PR reviews
- [ ] Require status checks (lint, build, audit)
- [ ] Require signed commits
- [ ] Require up-to-date branches

## 🆘 Emergency Response

**Critical vulnerability found:**
1. Check Dependabot PR or create manual update
2. Run tests locally
3. Merge immediately if tests pass
4. Deploy to production ASAP
5. Review logs for exploitation

## 📚 Documentation

- `SECURITY.md` - Security policy and vulnerability reporting
- `DEPENDABOT.md` - Complete setup and maintenance guide
- `.github/dependabot.yml` - Dependabot configuration
- `.npmrc` - Package manager security settings

## 🔗 Workflows

- `dependabot-auto-merge.yml` - Smart auto-merge for safe updates
- `security-audit.yml` - Weekly security scanning
- `nuxthub.yml` - Your existing deployment workflow
