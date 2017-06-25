import { IdleScheduler } from './IdleScheduler';
import { IdleAction } from './IdleAction';

const idle = new IdleScheduler(IdleAction);

export {
  idle
};