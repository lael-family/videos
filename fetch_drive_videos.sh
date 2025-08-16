#!/usr/bin/env bash
# Fetch Google Drive video metadata into videos.json using API key + folder ID from .env

# Load .env variables
if [ -f .env ]; then
	export $(grep -v '^#' .env | xargs)
else
	echo "❌ .env file not found"
	exit 1
fi

# Check required vars
if [[ -z "$FOLDER_ID" || -z "$API_KEY" ]]; then
	echo "❌ FOLDER_ID or API_KEY not set in .env"
	exit 1
fi

OUTPUT="videos.json"

# Google Drive API endpoint
URL="https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'video/'&fields=files(id,name,mimeType,thumbnailLink)&key=${API_KEY}"

# Fetch and pretty-print JSON
echo "📡 Fetching videos from folder $FOLDER_ID ..."
curl -s "$URL" | jq . >"$OUTPUT"

if [[ $? -eq 0 ]]; then
	echo "✅ Video list saved to $OUTPUT"
else
	echo "❌ Failed to fetch videos"
fi
