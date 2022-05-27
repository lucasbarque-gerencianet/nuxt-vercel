import ElasticAPM from 'elastic-apm-node';
import { Config } from '../config/config';

export default class APM {
  private config: Config;
  private apm: typeof ElasticAPM;

  constructor(config: Config) {
    this.config = config;
    this.start();
  }

  private start() {
    this.apm = ElasticAPM.start({
      serviceName: this.config.project,
      serverUrl: this.config.log.apm.server,
      environment: this.config.env,
      active: this.config.env !== 'development',
    });
  }

  public startTransaction(name?: string, options?: any) {
    return this.apm.startTransaction(name, options);
  }

  public endTransaction(transaction: any) {
    return transaction.endTransaction();
  }

  public setTransactionName(name: string) {
    this.apm.setTransactionName(name);
  }
}
