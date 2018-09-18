echo "Testing /slack/events... by sending canned slack event"
real_json=`cat ./change_status.json`

curl -X POST -d "$real_json" -H "Content-Type: application/json" localhost:4123/slack/events
