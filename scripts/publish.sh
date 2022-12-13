#!/usr/bin/env bash

# Build variables.
export ENVIRONMENT=production

# Deployment variables.
export SERVER_HOST=66.29.151.71
export SERVER_DIR=bio-diversity/out
export SERVER_USER=bio


# Build app.
echo "Building the production build for the app...."
    echo "Production build for the app built!" &&
    echo "Uploading files to web server..." &&
    echo 'put -r out/*' | sftp $SERVER_USER@$SERVER_HOST:$SERVER_DIR &&
    echo "Uploaded files to web server!"    