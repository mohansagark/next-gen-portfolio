# 🚀 Deployment Configuration

This portfolio uses a sophisticated CI/CD pipeline with GitHub Actions for automated staging and manual production deployments.

## 📋 Deployment Workflow

### 🔄 Automated Process

1. **Trigger**: Automatically runs on push to `main` branch
2. **Staging Deploy**:
   - Builds Next.js static site
   - Deploys to Vercel for preview
   - Uploads build artifacts
3. **Production Deploy**:
   - Requires manual approval via GitHub Environments
   - Uses the same build (no rebuilding)
   - Deploys to Hostinger via FTP

## 🔐 Required GitHub Secrets

### For Vercel Staging Deployment

```
VERCEL_TOKEN          # Your Vercel API token
VERCEL_ORG_ID         # Your Vercel organization ID
VERCEL_PROJECT_ID     # Your Vercel project ID
```

### For Hostinger Production Deployment

```
FTP_HOST              # Your Hostinger FTP hostname
FTP_USERNAME          # Your FTP username
FTP_PASSWORD          # Your FTP password
```

## ⚙️ Setup Instructions

### 1. Configure Vercel Secrets

1. **Get Vercel Token**:

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login and get token
   vercel login
   vercel whoami
   ```

2. **Get Project Details**:

   ```bash
   # In your project directory
   vercel link
   vercel env pull .env.local
   ```

3. **Find IDs in `.vercel/project.json`**:
   ```json
   {
     "orgId": "your-org-id",
     "projectId": "your-project-id"
   }
   ```

### 2. Configure Hostinger FTP

1. **Get FTP Details from Hostinger Panel**:

   - Go to File Manager → FTP Accounts
   - Create or use existing FTP account
   - Note the hostname, username, and password

2. **Test FTP Connection**:
   ```bash
   # Test with FTP client
   ftp your-hostname
   # Enter username and password
   ```

### 3. Add Secrets to GitHub

1. Go to your repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add all the required secrets listed above

### 4. Setup Production Environment

1. Go to repository → Settings → Environments
2. Click "New environment"
3. Name it `production`
4. Enable "Required reviewers" and add yourself
5. This creates the manual approval step

## 🌐 Deployment URLs

- **Staging**: `https://your-project.vercel.app`
- **Production**: `https://your-domain.com`

## 📁 Build Configuration

The workflow uses Next.js static export with these optimizations:

```javascript
// next.config.mjs
export default {
  output: "export", // Enable static export
  images: { unoptimized: true }, // Disable image optimization
  trailingSlash: true, // Add trailing slashes
};
```

## 🔧 Package Scripts

```json
{
  "build": "next build", // Build for production
  "export": "next build", // Export static site
  "deploy:build": "npm run build && npm run export" // Combined build
}
```

## 🚦 Workflow Status

The deployment workflow includes these stages:

1. ✅ **Code Checkout**
2. 🟢 **Node.js Setup** (v18)
3. 📥 **Dependency Installation** (Yarn)
4. 🏗️ **Static Site Build**
5. 📤 **Artifact Upload**
6. 🚀 **Vercel Staging Deploy**
7. 🛑 **Manual Production Approval**
8. 📥 **Artifact Download**
9. 🌐 **Hostinger FTP Deploy**
10. ✅ **Deployment Complete**

## 🔍 Troubleshooting

### Common Issues:

1. **Build Errors**:

   ```bash
   # Test locally
   npm run build
   npm run export
   ```

2. **FTP Connection Issues**:

   - Verify FTP credentials
   - Check firewall settings
   - Ensure FTP is enabled on hosting

3. **Vercel Deploy Errors**:
   - Verify Vercel tokens
   - Check project configuration
   - Review Vercel dashboard

### Debug Commands:

```bash
# Local build test
npm run deploy:build

# Check Next.js config
npx next info

# Verify static export
ls -la out/
```

## 📈 Workflow Benefits

- ✅ **Zero-downtime deployments**
- ✅ **Automated staging previews**
- ✅ **Manual production control**
- ✅ **Build artifact reuse**
- ✅ **Comprehensive error handling**
- ✅ **Environment-specific configs**

## 🎯 Best Practices

1. **Always test in staging first**
2. **Review changes before production approval**
3. **Monitor deployment logs**
4. **Keep secrets updated**
5. **Regular backup of production site**

---

_For more details, see the workflow file: `.github/workflows/deploy.yml`_
