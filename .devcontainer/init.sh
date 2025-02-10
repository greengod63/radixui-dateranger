#!/bin/bash
# Script used as initializeCommand inside devcontainer.json
# It prepares the host system for running the project in container

# There are several directories that get mounted as volumes into the container, however
# they might not exist on the host machine (eg if AWS has not been set up yet).
# Here, we ensure that they exist, so that the container may start
mkdir -p ~/.aws
touch ~/.aws/config
