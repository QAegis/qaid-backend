#!/bin/bash
set -e

API_URL=${API_URL:-"http://localhost:3001"}
FRONTEND_URL=${FRONTEND_URL:-"http://localhost:3000"}

echo "Running smoke tests against API: $API_URL and Frontend: $FRONTEND_URL"

# Test API health endpoint
API_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/health)
if [ "$API_HEALTH" -eq 200 ]; then
  echo "✅ API health check passed"
else
  echo "❌ API health check failed with status $API_HEALTH"
  exit 1
fi

# Test Frontend
FRONTEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL)
if [ "$FRONTEND_RESPONSE" -eq 200 ]; then
  echo "✅ Frontend check passed"
else
  echo "❌ Frontend check failed with status $FRONTEND_RESPONSE"
  exit 1
fi

echo "�� All smoke tests passed!"
