# CloudFront Setup Guide

## Current Status

⚠️ **Account Verification Required**  
Your AWS account needs to be verified before creating CloudFront resources. This is normal for new AWS accounts.

## Setup Instructions

### Step 1: Create CloudFront Distribution (AWS Console)

1. **Go to CloudFront Console**
   - Navigate to: https://console.aws.amazon.com/cloudfront/

2. **Create Distribution**
   - Click "Create distribution"
   - **Distribution name:** meme-viewer-pro

3. **Origin Settings**
   - Click "Next"
   - **Origin type:** Amazon S3
   - **S3 Origin:** Click "Browse S3" → Select `meme-viewer-desmond-2025`
   - **Origin path:** Leave empty (NOT index.html - that's Default root object)

4. **Cache Settings**
   - Click "Customize cache settings"
   - **Viewer protocol policy:** Redirect HTTP to HTTPS
   - **Cache policy:** CachingOptimized
   - **Allowed HTTP methods:** GET, HEAD, OPTIONS
   - **Origin request policy:** AllViewerExceptHostHeader
   - Click "Next"

5. **WAF Settings**
   - **Do not enable WAF** (costs extra)
   - Click "Next"

6. **Default Root Object**
   - **Default root object:** index.html

7. **Error Pages (IMPORTANT for SPA)**
   - After creation, go to distribution → Error pages tab
   - Add custom error response #1:
     - **HTTP error code:** 403
     - **Customize error response:** Yes
     - **Response page path:** /index.html
     - **HTTP response code:** 200
   - Add custom error response #2:
     - **HTTP error code:** 404
     - **Customize error response:** Yes
     - **Response page path:** /index.html
     - **HTTP response code:** 200

8. **Create and Wait**
   - Click "Create distribution"
   - Wait 5-15 minutes for status to change to "Deployed"

### Step 2: Test CloudFront URL

Once deployed, you'll get a URL like: `https://d123abc456.cloudfront.net`

Test the following:
```bash
# 1. Load the app
curl -I https://YOUR_CLOUDFRONT_URL

# 2. Verify HTTPS works
# Visit in browser and check for secure padlock

# 3. Test caching headers
curl -I https://YOUR_CLOUDFRONT_URL/index.html
```

### Step 3: Update S3 and Test Caching

1. **Make a small change to the app:**
   ```bash
   # Edit src/App.jsx - change the title or add text
   cd ~/Documents/meme-viewer-s3
   # Make your edit
   ```

2. **Rebuild and deploy to S3:**
   ```bash
   npm run build
   aws s3 sync ./dist s3://meme-viewer-desmond-2025 --delete
   ```

3. **Test if CloudFront still serves old version:**
   - Visit CloudFront URL - should show OLD version (cached)
   - Visit S3 URL - should show NEW version

4. **Create Cache Invalidation:**
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id YOUR_DISTRIBUTION_ID \
     --paths "/*"
   ```
   
   Or in console:
   - CloudFront → Your distribution → Invalidations
   - Create invalidation → Paths: `/*` → Create

5. **Verify cache cleared:**
   - Wait 1-2 minutes
   - Refresh CloudFront URL - should show NEW version

## Configuration Details

### Cache Policy: CachingOptimized
- Cache based on: Query strings, headers, cookies
- Min TTL: 1 second
- Max TTL: 31536000 seconds (1 year)
- Default TTL: 86400 seconds (1 day)

### Origin Request Policy: AllViewerExceptHostHeader
- Forwards all query strings, headers, and cookies
- Removes Host header (required for S3)

### Error Responses (SPA Support)
Both 403 and 404 errors return `/index.html` with HTTP 200:
- Enables client-side routing
- Allows React Router to handle non-existent routes
- Prevents "Access Denied" errors on deep links

## Benefits of CloudFront

✅ **Performance:**
- Content cached at 500+ edge locations worldwide
- Reduced latency for global users
- Gzip/Brotli compression enabled

✅ **Security:**
- HTTPS by default
- DDoS protection via AWS Shield
- WAF integration available (optional, paid)

✅ **Cost:**
- Free tier: 1 TB data transfer/month
- Pay only for actual usage
- Reduces S3 request costs

## Troubleshooting

### Issue: Distribution stuck in "In Progress"
- **Solution:** Wait 5-15 minutes. CloudFront takes time to propagate to edge locations.

### Issue: 403 Access Denied errors
- **Solution:** Check S3 bucket policy allows public read access.

### Issue: SPA routes return 404
- **Solution:** Add custom error responses (403, 404 → index.html, 200).

### Issue: Changes not appearing
- **Solution:** Create cache invalidation for `/*`.

## Next Steps

Once CloudFront is deployed:

1. Get the CloudFront domain name
2. Update README.md with the CloudFront URL
3. Test all functionality
4. Document caching behavior
5. Commit changes to GitHub

## Commands Reference

```bash
# List distributions
aws cloudfront list-distributions

# Get distribution details
aws cloudfront get-distribution --id YOUR_ID

# Create invalidation
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"

# Check invalidation status
aws cloudfront get-invalidation --distribution-id YOUR_ID --id INVALIDATION_ID
```
