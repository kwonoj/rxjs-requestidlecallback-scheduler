import { IdleScheduler } from './src/IdleScheduler';
import { IdleAction } from './src/IdleAction';

const idle = new IdleScheduler(IdleAction);

export {
  idle
};