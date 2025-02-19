#!/bin/sh

if [ -f "done" ]; then
  echo "Setup already completed. Skipping installation steps."
else
  apt-get update -y
  
  apt-get install -y nano screen curl
  apt-get install -y nodejs npm

  apt-get clean
  touch done
fi

cd /app

while true; do
    npm run dev
    sleep 5
done


echo ""
echo "Server Ready!"
echo ""

tail -f /dev/null
