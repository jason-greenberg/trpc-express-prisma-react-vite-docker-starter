#!/bin/bash

echo "Checking types"
START=$(date +%s.%N)

(cd packages/server && tsc --build --incremental && echo "✅ Server") # Server must be built for client to typecheck
SERVER_EXIT_CODE=$?

if [ $SERVER_EXIT_CODE -ne 0 ]; then
  echo "Server typecheck failed"
  exit 1
fi

(cd packages/client && tsc --incremental --noEmit --tsBuildInfoFile ../../dist/client/tsconfig.tsbuildinfo  && echo "✅ Client")
CLIENT_EXIT_CODE=$?

END=$(date +%s.%N)
DIFF=$(echo "$END - $START" | bc)

if [ $CLIENT_EXIT_CODE -ne 0 ]; then
  echo "Client typecheck failed in $DIFF seconds"
  exit 1
fi

echo "All typechecks passed in $DIFF seconds"
 
# This script will run the TypeScript compiler in incremental mode for both the client and server packages.
# It will output the following: 
# Checking types
# ✅ Client
# ✅ Server
# Done in 0.123 seconds
