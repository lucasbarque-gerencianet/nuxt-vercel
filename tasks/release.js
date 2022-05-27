'use strict';

const execSync = require('child_process').execSync;
const fs = require('fs');
const gulp = require('gulp');

const getPackageVersion = () => {
  return JSON.parse(fs.readFileSync('./package.json')).version;
};

const bumpVersion = () => {
  const changelog = execSync('git log -1 --format="%s%n%b"');

  if (changelog.includes('[BREAKING]')) {
    execSync('npm version --no-git-tag-version major');
  } else if (changelog.includes('[FEATURE]')) {
    execSync('npm version --no-git-tag-version minor');
  } else if (changelog.includes('[PATCH]')) {
    execSync('npm version --no-git-tag-version patch');
  }
};

const commitChanges = (version) => {
  execSync('git add package.json yarn.lock .gitlab-ci.yml');
  execSync(`git commit -m "Release ${version}"`);
  execSync(`git tag -a ${version} -m "Release ${version}"`);
  execSync('git push -f --tags origin HEAD:master');
};

const createRelease = (done) => {
  execSync('mkdir -p ~/.ssh && chmod 644 ~/.ssh && touch ~/.ssh/known_hosts');
  execSync(`ssh-keyscan ${process.env.GN_GITLAB_TESTING_URL} >> ~/.ssh/known_hosts`);
  execSync('chmod 644 ~/.ssh/known_hosts');
  execSync(`echo "${process.env.SSH_PRIVATE_KEY}" | ssh-add -`);

  execSync(`git remote set-url --push origin ${process.env.REPO}`);
  execSync(`git config --global user.name "${process.env.GITLAB_USER_NAME}"`);
  execSync(`git config --global user.email "${process.env.GITLAB_USER_EMAIL}"`);
  execSync('git config --global http.sslVerify false');

  const lastVersion = getPackageVersion();
  bumpVersion();
  const newVersion = getPackageVersion();

  if (newVersion === lastVersion) {
    throw new Error('Warning: No changes (breaking, feature, patch) found in changelog.');
  }
  commitChanges(newVersion);
  done();
};

gulp.task('release', createRelease);
