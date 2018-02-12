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
gitHome=git@github.com:t3mediacorp
PATH=/home/video/bin/tools/jenkins:$PATH

baseDir=$( dirname "$0" )

project=wazee-ui

baseDir=$( dirname "$0" )

# This is used as the apache host directory for the site. It should match the 
# first part of the hostname for the site.
# Ex: cnn.dev.t3mediasource.xyz. => has a sitename of 'cnn'
siteName=crux

if [ -n "$JENKINS_HOME" ]; then
  # add jenkins tools to the path
  export PATH=/home/video/bin/tools/jenkins:$PATH:/home/video/bin

  # Setup a tmpdir on a volume with more space
  export TMPDIR=/home/video/tmp/$project
fi

clean_up() {
  # Remove anything in the tmp directory
  if [ -n "$JENKINS_HOME" ]; then
    rm -rf /home/video/tmp/$project
    rm -rf $TMPDIR/wazee-ui-library
  fi
  restore-maven-version.sh
}
trap clean_up EXIT 


build_prod() {
  set -x
  npm run build.prod.aot || exit 1

  # create build.properties file
  set-maven-build-information.sh --path=${baseDir}/dist/prod --version=${buildVersion}
  create-status-html.sh "${baseDir}/dist/prod/build.properties" "${baseDir}/dist/prod/status.html"
  
  # package into an rpm
  build-rpm.sh --srcDir=dist/prod --dstDir=. --artifactName=${project} --targetDir=/opt/app/apache/htdocs/hosts/${siteName}/docs --version=${buildVersion} || exit 1

  # Only deploy & tag if we're on Jenkins
  if [ -n "$JENKINS_HOME" ]; then

    # Push to our nexus server
    deliverable=$( ls *.rpm )
    deploy-to-nexus.sh --version=${buildVersion} --group="com.wazeedigital.wazee-ui" --artifact=wazee-ui "--file=$deliverable"  || exit 1

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

print-build-environment.sh


#checkout/verify/pull wazee-crux-version-control repo
if [ ! -d "$TMPDIR/wazee-crux-version-control/.git" ]; then
	echo ""
	echo "Cannot find version repo, cloning repo $gitHome/wazee-crux-version-control.git"
	rm -rf "$TMPDIR/wazee-crux-version-control"
	[ "$dryrun" ] || git clone "$gitHome/wazee-crux-version-control.git" "$TMPDIR/wazee-crux-version-control"
fi

cd "$TMPDIR/wazee-crux-version-control"
git checkout --force develop
git pull origin develop
python /home/video/bin/tools/jenkins/incrementVersionFile.py ${project} $(git rev-parse HEAD)
buildVersion=$(python /home/video/bin/tools/jenkins/currentVersion.py ${TMPDIR}/wazee-crux-version-control/${project}.version)
cd -


# Install modules
npm install

# Build the dev webapp
build_prod 

# build the UI library
build_library

cd "$TMPDIR/wazee-crux-version-control"
git pull origin develop
eval $(python /home/video/bin/tools/jenkins/commitVersionChange.py ${project})
git push
