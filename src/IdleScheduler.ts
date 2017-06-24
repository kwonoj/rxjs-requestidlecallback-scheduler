import { AsyncScheduler } from 'rxjs/scheduler/AsyncScheduler';
import { AsyncAction } from 'rxjs/scheduler/AsyncAction';
export class IdleScheduler extends AsyncScheduler {
  public flush(action?: AsyncAction<any>): void {
    this.active = true;
    this.scheduled = undefined;

    const { actions } = this;
    let error: any;
    let index: number = -1;
    let count: number = actions.length;
    action = action || actions.shift();

    if (action) {
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (++index < count && (action = actions.shift()));
    }

    this.active = false;

    if (error) {
      while (++index < count && (action = actions.shift())) {
        action.unsubscribe();
      }
      throw error;
    }
  }
}
