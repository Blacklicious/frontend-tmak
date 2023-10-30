#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# If you have any pre-start tasks, you can add them here

# Start the Next.js application
exec "$@"
