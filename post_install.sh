#!/bin/bash

# Runs after the rpm is extracted on a target machine

# RPM_INSTALL_PREFIX will be set to the installation directory on the target machine
cd $RPM_INSTALL_PREFIX

if [ -f '/tmp/env' ]; then
  # load the api url from the temp file written during install
  APP_ENV=`cat /tmp/env`
  if [ "$APP_ENV" ]; then
    mv -f ${APP_ENV}.index.html index.html
  fi
fi
