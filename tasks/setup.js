'use strict';

const fs = require('fs');
const gulp = require('gulp');

const copyConfig = async () => {
  if (!fs.existsSync('infra/config/config.json')) {
    let content = fs.readFileSync('infra/config/git-ignored/config.json', 'utf8');

    content = content.replace(/{{DEVELOPER_REGISTRATION}}/g, process.env.DEVELOPER_REGISTRATION);

    await fs.writeFileSync('infra/config/config.json', content);
  }
};

gulp.task('setup', gulp.series([copyConfig]));
