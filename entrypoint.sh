#!/bin/sh
# THIS SCRIPT CONTAINS THE ALL THE DEPENDENCIES (only needed if you are making this project from scratch)
# Even without the node_modules folder you can just do "npm -i" and it should install all the dependencies inside of the package.json
# Check if the "done" file exists
if [ -f "done" ]; then
  echo "Setup already completed. Skipping installation steps."
else
  # Update and install necessary packages
  apt-get update -y
  apt-get install -y nano screen
  apt-get clean

  # Install npm dependencies
  npm install vite
  npm install react-router-dom
  npm install -D tailwindcss postcss autoprefixer
  npm install react-router-dom
  npm install react-animate-height
  npm install @tailwindcss/aspect-ratio --save-dev

  npx tailwindcss init

  # Create the "done" file to indicate setup is complete
  touch done

fi

# Run the development server
npm run dev --host

echo ""
echo "Everything's ready"
echo ""

# Keep the container running (ONLY NEEDED WHEN USING DOCKER)
tail -f /dev/null