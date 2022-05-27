import fs from 'fs';
import { resolve } from 'path';
import AWS from 'aws-sdk';
import appPackage from '../../package.json';

const env = process.env.NODE_ENV || 'development';

export type Config = {
  readonly project: string;
  readonly timezone: string;
  readonly log: {
    readonly apm: {
      readonly server: string;
    };
  };
  readonly environments: {
    readonly endpoints: {
      readonly [key: string]: string;
    };
  };
  readonly env: string;
};

const buildParamName = (param: string): string => {
  return `/${env}/${appPackage.name}/${param}`;
};

const PARAMETER_CONFIG = buildParamName('config');
const PARAMETER_TIMEZONE = `/${env}/common/timezone`;

const getParameters = async (): Promise<{ [key: string]: string }> => {
  if (env === 'development') {
    return {
      [PARAMETER_CONFIG]: fs.readFileSync(resolve(__dirname, 'config.json')).toString(),
      [PARAMETER_TIMEZONE]: 'America/Sao_Paulo',
    };
  }

  const ssm = new AWS.SSM({ apiVersion: '2014-11-06' });

  const options = {
    Names: [PARAMETER_CONFIG, PARAMETER_TIMEZONE],
    WithDecryption: true,
  };

  const response: any = await ssm.getParameters(options).promise();

  const params: { [key: string]: string } = {};

  response.Parameters.forEach((p: { [key: string]: string }) => {
    params[p.Name] = p.Value;
  });

  return params;
};

export const getConfig = async () => {
  const params = await getParameters();

  const config = JSON.parse(params[PARAMETER_CONFIG]);

  config.timezone = params[PARAMETER_TIMEZONE];

  if (env === 'development' && config.aws) {
    AWS.config.update(config.aws);
  }
  if (env !== 'development') {
    config.server = {
      host: '0.0.0.0',
      port: 3000,
    };
  }

  config.env = env;

  return config;
};
