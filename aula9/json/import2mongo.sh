#!/bin/bash
# make sure you always put $f in double quotes to avoid any nasty surprises i.e. "$f"
for f in $*
do
  echo "Processing $f file..."
  mongoimport --host localhost:27017 --db amd --collection obras --file $f 
done
