#!/bin/sh

# Check if the "done" file exists
if [ -f "done" ]; then
  echo "Setup already completed. Skipping installation steps."
else
  # Update package lists
  apt-get update -y
  
  # Install necessary packages
  apt-get install -y nano screen curl
  apt-get install -y nodejs npm

  # Install npm dependencies
  npm install express
  npm install cors
  npm install @telegram-apps/init-data-node
  npm install -g nodemon
  npm install typescript ts-node nodemon @types/node --save-dev
  npm install --save-dev @types/express @types/cors
  npm install sharp
  npm install node-cron
  npm install mysql2
  npm install node-cron
  npm install --save-dev @types/node

  # Clean up to reduce image size
  apt-get clean

  # Create the "done" file to indicate setup is complete
  touch done
fi

# Change to the app directory
cd /app

# Run the server
while true; do
    # Your commands go here
    echo "Running the command at $(date)"
    npm run dev
    # Sleep for a certain amount of time (e.g., 5 seconds)
    sleep 5
done
#screen -dmS app node main.js

echo ""
echo "Server Ready!"
echo ""

# Keep the container running
tail -f /dev/null
