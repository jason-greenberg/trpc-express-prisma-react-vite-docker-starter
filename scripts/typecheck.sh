#!/bin/bash
echo "Checking types"
START=$(date +%s.%N)

(cd packages/server && tsc --incremental --noEmit && echo "✅ Server") &
SERVER_PID=$!

(cd packages/client && tsc --incremental --noEmit && echo "✅ Client") &
CLIENT_PID=$!

wait $SERVER_PID
SERVER_EXIT_CODE=$?

wait $CLIENT_PID
CLIENT_EXIT_CODE=$?

END=$(date +%s.%N)
DIFF=$(echo "$END - $START" | bc)

if [ $CLIENT_EXIT_CODE -ne 0 ] || [ $SERVER_EXIT_CODE -ne 0 ]; then
  echo "Typechecks failed in $DIFF seconds"
  exit 1
fi

echo "All typechecks passed in $DIFF seconds"
 
# This script will run the TypeScript compiler in incremental mode for both the client and server packages.
# It will output the following: 
# Checking types
# ✅ Client
# ✅ Server
# Done in 0.123 seconds
