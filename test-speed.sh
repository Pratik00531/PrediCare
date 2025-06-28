#!/bin/bash

echo "⚡ Testing PrediCare AI Doctor Response Speed..."
echo "=============================================="

# Test basic health endpoint first
echo "1. Testing health endpoint..."
time curl -s http://localhost:8000/api/health > /dev/null

echo ""
echo "2. Testing fast chat response..."
echo "Question: 'I have a headache'"

start_time=$(date +%s.%N)

curl -s -X POST "http://localhost:8000/api/chat" \
     -F "message=I have a headache" \
     -F "include_voice=false" > /tmp/response.json

end_time=$(date +%s.%N)
duration=$(echo "$end_time - $start_time" | bc)

echo "Response time: ${duration} seconds"
echo ""
echo "Response preview:"
echo "=================="
cat /tmp/response.json | python3 -c "
import json, sys
data = json.load(sys.stdin)
if data.get('success'):
    response = data['response'][:200] + '...' if len(data['response']) > 200 else data['response']
    print(response)
else:
    print('Error:', data.get('error', 'Unknown error'))
"

echo ""
echo "🎯 Target: Under 3 seconds for good user experience"
echo "⚡ Current: ${duration} seconds"

if (( $(echo "$duration < 3" | bc -l) )); then
    echo "✅ FAST - Good response time!"
else
    echo "⚠️  SLOW - Consider further optimization"
fi
