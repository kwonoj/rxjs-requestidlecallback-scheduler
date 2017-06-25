import { IdleAction } from './IdleAction';
import { IdleScheduler } from './IdleScheduler';

const idle = new IdleScheduler(IdleAction);

export {
  idle
};