# AWS S3 Deployment Guide

## Deployment Details

### S3 Bucket Configuration

**Bucket Name:** meme-viewer-desmond-2025  
**Region:** us-east-1  
**Website URL:** http://meme-viewer-desmond-2025.s3-website-us-east-1.amazonaws.com

### Steps Taken

1. **Created S3 Bucket**
   ```bash
   aws s3 mb s3://meme-viewer-desmond-2025 --region us-east-1
   ```

2. **Enabled Static Website Hosting**
   ```bash
   aws s3 website s3://meme-viewer-desmond-2025/ \
     --index-document index.html \
     --error-document index.html
   ```

3. **Disabled Block Public Access**
   ```bash
   aws s3api put-public-access-block \
     --bucket meme-viewer-desmond-2025 \
     --public-access-block-configuration \
     BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false
   ```

4. **Applied Public Read Policy**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::meme-viewer-desmond-2025/*"
       }
     ]
   }
   ```

5. **Deployed Application**
   ```bash
   npm run build
   aws s3 sync ./dist s3://meme-viewer-desmond-2025 --delete
   ```

### Deployed Files

- `index.html` (461 bytes)
- `vite.svg` (1,497 bytes)
- `assets/index-C-THUSIn.js` (194.82 kB, 61.54 kB gzipped)
- `assets/index-D5k8iy6z.css` (3.78 kB, 1.10 kB gzipped)

### Deployment Verification

✅ Website is accessible at public URL  
✅ All assets load correctly  
✅ Interactive features work (likes, navigation, grid)  
✅ Responsive design renders properly  

## Redeployment

To update the deployed app after making changes:

```bash
# Make your changes to the source code
# Commit your changes
git add .
git commit -m "Your commit message"

# Rebuild the app
npm run build

# Sync to S3
aws s3 sync ./dist s3://meme-viewer-desmond-2025 --delete

# Push to GitHub
git push origin main
```

## Monitoring

Check bucket contents:
```bash
aws s3 ls s3://meme-viewer-desmond-2025/ --recursive --human-readable
```

Check website configuration:
```bash
aws s3api get-bucket-website --bucket meme-viewer-desmond-2025
```

## Cost Considerations

- S3 storage costs are minimal for this small app
- Data transfer: First 100 GB/month is free (AWS Free Tier)
- Request costs: Very low for typical usage
- No CloudFront CDN (optional for better performance)

## Future Enhancements

- Add CloudFront CDN for faster global delivery
- Implement CI/CD pipeline for automatic deployments
- Add custom domain name
- Enable HTTPS with CloudFront
- Add CloudWatch monitoring and alarms
