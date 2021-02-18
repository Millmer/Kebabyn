cd kebabyn
npm run build
aws s3 sync ./dist s3://kebabyn.com --profile serverless-personal
aws cloudfront create-invalidation --distribution-id E3UXOGHH5JZDBX --paths \"\/*\" --profile serverless-personal