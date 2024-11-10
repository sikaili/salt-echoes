#!/bin/bash

# Define local directory and S3 bucket
LOCAL_DIR="./dist"
BUCKET="s3://salt-echoes"

# Run the build process
npm run build

# Sync directory to S3, excluding the 'dist/audio' and 'dist/fonts' directories
aws s3 sync $LOCAL_DIR $BUCKET --delete  --exclude "fonts/*" --exclude "pdfs/*"  --exclude "audio/*" 

# Invalidate CloudFront distribution
DISTRIBUTION_ID="E28S0UIIAHTP9"
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Deployment complete."
