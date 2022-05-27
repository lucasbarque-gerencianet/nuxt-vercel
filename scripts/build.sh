# !/bin/sh
set -e

export AWS_REGION=${GN_AWS_REGION}
export NODE_ENV=${GN_ENVIRONMENT}

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
SRC="$DIR/.."

npm install
npm run build

rm -rf "$SRC/node_modules"
rm -rf "$SRC/infra/config/git-ignored"
rm -rf "$SRC/docker"
rm -rf "$SRC/docker-compose.yml"
rm -rf "$SRC/Makefile"
rm -rf "$SRC/Dockerfile"

DIST="$SRC/dist"
mkdir -p "$DIST"

cd $SRC

cp -R `ls -A | grep -vE "dist"` $DIST/

cd $DIST

npm install --production --prefix "$DIST"
