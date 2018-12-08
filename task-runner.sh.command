#!/bin/bash
# Task Runner

# To make this file runnable:
#     $ chmod +x *.sh.command

banner="dna.js Smart Update over Websockets"
projectHome=$(cd $(dirname $0); pwd)

setupTools() {
   cd $projectHome
   echo
   echo $banner
   echo $(echo $banner | sed s/./=/g)
   pwd
   echo
   echo "Node.js:"
   which node || { echo "Need to install Node.js: https://nodejs.org"; exit; }
   node --version
   npm install
   npm update
   npm outdated
   echo
   }

runSpecs() {
   cd $projectHome
   echo "Specifications:"
   npm test
   }

startServer() {
   cd $projectHome
   echo "Starting server:"
   npm start
   echo
   }

setupTools
runSpecs
startServer
