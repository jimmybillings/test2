#!/bin/bash
#
# Jenkins will make available several environment variables.
# 
# GIT_BRANCH
#   Name of branch being built
# BUILD_NUMBER
#   The current build number, such as "153"
# JENKINS_HOME
#   The absolute path of the directory assigned on the master node for Jenkins to store data.
# JENKINS_URL
#   Full URL of Jenkins, like http://server:port/jenkins/ (note: only available if Jenkins URL set in system configuration)
# BUILD_URL
#   Full URL of this build, like http://server:port/jenkins/job/foo/15/ (Jenkins URL must be set)
# JOB_URL
#   Full URL of this job, like http://server:port/jenkins/job/foo/ (Jenkins URL must be set)
#
# For a full list, see http://build.thoughtequity.com:8080/jenkins/env-vars.html/
# set -x

sourceHome=/home/video/src
gitHome=git@github.com:t3mediacorp
PATH=/home/video/bin/tools/jenkins:$PATH

baseDir=$( dirname "$0" )

project=wazee-ui

# This is used as the apache host directory for the site. It should match the 
# first part of the hostname for the site.
# Ex: poc9.dev.wzplatform.com => has a sitename of 'poc9'
siteName=poc19

if [ -n "$JENKINS_HOME" ]; then
  # add jenkins tools to the path
  export PATH=/home/video/bin/tools/jenkins:$PATH

  # Special PhantomJS build that works with Centos
  # JWILLIAMS 10/25/16 - commment out to see if current phantom works
  # export PHANTOMJS_BIN=/home/video/bin/phantomjs.2.0.1.patch_12506

  # Setup a tmpdir on a volume with more space
  export TMPDIR=/home/video/tmp/$project
fi

clean_up() {
  # Remove anything in the tmp directory
  if [ -n "$JENKINS_HOME" ]; then
    rm -rf /home/video/tmp/$project
    rm -rf $TMPDIR/wazee-ui-library
    rm -rf $TMPDIR/wazee-crux-version-control
  fi
  restore-maven-version.sh
}
trap clean_up EXIT 


build_prod() {
  npm test || exit 1
  npm run aot || exit 1

  # create build.properties file
  set-maven-build-information.sh --path=${baseDir}/dist/prod --version=${buildVersion}
  create-status-html.sh "${baseDir}/dist/prod/build.properties" "${baseDir}/dist/prod/status.html"

  # package into an rpm
  cp -f ${baseDir}/post_install.sh ${baseDir}/dist/prod
  build-rpm.sh --srcDir=dist/prod --dstDir=. --artifactName=${project} --targetDir=/opt/app/apache/htdocs/hosts/${siteName}/docs --postInstall=post_install.sh --version=${buildVersion} || exit 1

  # Only deploy & tag if we're on Jenkins
  if [ -n "$JENKINS_HOME" ]; then

    # Push to our nexus server 
    deliverable=$( ls *.rpm )
    deploy-to-nexus.sh --version=${buildVersion} --group="com.wazeedigital.${project}" --artifact=${project} "--file=$deliverable"  || exit 1

     # tag the repository with this build version so we can find it again
    git tag "version=${buildVersion}"

    git push --tags origin
    restore-maven-version.sh   || exit 1  #CHANGE?

    # put the calculated artifact version into a properties file so jenkins can find it
    create-jenkins-properties.sh ${buildVersion}
  fi

  return 0
}

build_library() {
  npm run build.library  || exit 1

  # Only deploy & tag if we're on Jenkins
  if [ -n "$JENKINS_HOME" ]; then
    # push to github. ||| NOTE: Eventually we want to move this to the nexus repo, but we're waiting on
    # nexus to get upgraded to include support for node modules
    git clone git@github.com:t3mediacorp/wazee-ui-library.git $TMPDIR/wazee-ui-library || exit 1
    rm -rf $TMPDIR/wazee-ui-library/*
    mv dist/library/* $TMPDIR/wazee-ui-library || exit 1
    pushd $TMPDIR/wazee-ui-library || exit 1

    # only push if there are changes
    changes=$( git status -s )
    if [ -n "${changes}" ]; then
      echo $changes | grep -q '??'
      if [[ $? == 0 ]]; then
        git add .
      fi
      git commit -m "version=${buildVersion}"  $TMPDIR/wazee-ui-library
      git push origin
    fi
    git tag "version=${buildVersion}"
    git push --tags origin
    popd
  fi

  return 0
}

# debugging information
print-build-environment.sh

#checkout/verify/pull wazee-crux-version-control repo
if [ ! -d "$TMPDIR/wazee-crux-version-control/.git" ]; then
  echo ""
  echo "Cannot find version repo, cloning repo $TMPDIR/wazee-crux-version-control.git"
  rm -rf "$TMPDIR/wazee-crux-version-control"
  [ "$dryrun" ] || git clone "$gitHome/wazee-crux-version-control.git" "$TMPDIR/wazee-crux-version-control"
fi
packageJson=$(pwd)
cd "$TMPDIR/wazee-crux-version-control"
git checkout --force develop
git pull origin develop
python /home/video/bin/tools/jenkins/incrementUIPortalVersionFile.py ${project} $(git rev-parse HEAD) ${packageJson}/package.json
buildVersion=$(python /home/video/bin/tools/jenkins/currentVersion.py $TMPDIR/wazee-crux-version-control/${project}.version)
cd -

# Install modules
npm install

# Build the dev webapp
build_prod


# ##################################################################################################################
# # build the UI library
# #
# ###### BEFORE BUILDING A LIBRARY GO INTO THE SHARED MODULE AND COMMENT OUT THESE TWO LINES: 
# ###### 1. The import statement for StoreDevTools - import { StoreDevtoolsModule } from '@ngrx/store-devtools';
# ###### 2. The StoreDevtoolsModule.instrument() item in the imports array.
# # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
# build_library
# #
# ####################################################################################################################

cd "$TMPDIR/wazee-crux-version-control"
git pull origin develop
eval $(python /home/video/bin/tools/jenkins/commitVersionChange.py ${project})
git push
