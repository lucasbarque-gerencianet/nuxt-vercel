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

export const getConfig = async () => {
  const config = await {
    server: {},
    environments: {}
  };
  return config;
};
