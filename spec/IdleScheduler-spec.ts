import { expect } from 'chai';
import * as sinon from 'sinon';
import { idle } from '../index';

describe('Scheduler.Idle', () => {
  it('should exist', () => {
    expect(idle).exist;
  });

  it('should act like the async scheduler if delay > 0', () => {
    let actionHappened = false;
    const sandbox = sinon.sandbox.create();
    const fakeTimer = sandbox.useFakeTimers();
    idle.schedule(() => {
      actionHappened = true;
    }, 50);
    expect(actionHappened).to.be.false;
    fakeTimer.tick(25);
    expect(actionHappened).to.be.false;
    fakeTimer.tick(25);
    expect(actionHappened).to.be.true;
    sandbox.restore();
  });

  it('should cancel animationFrame actions when delay > 0', () => {
    let actionHappened = false;
    const sandbox = sinon.sandbox.create();
    const fakeTimer = sandbox.useFakeTimers();

    idle
      .schedule(() => {
        actionHappened = true;
      }, 50)
      .unsubscribe();

    expect(actionHappened).to.be.false;
    fakeTimer.tick(25);
    expect(actionHappened).to.be.false;
    fakeTimer.tick(25);
    expect(actionHappened).to.be.false;
    sandbox.restore();
  });

  it('should schedule an action to happen later', (done: MochaDone) => {
    let actionHappened = false;
    idle.schedule(() => {
      actionHappened = true;
      done();
    });

    //Scheduled action happened synchronously
    expect(actionHappened).to.be.false;
  });

  it('should execute recursively scheduled actions in separate asynchronous contexts', (
    done: MochaDone
  ) => {
    let syncExec1 = true;
    let syncExec2 = true;
    idle.schedule(
      function(index: any) {
        if (index === 0) {
          this.schedule(1);
          idle.schedule(() => {
            syncExec1 = false;
          });
        } else if (index === 1) {
          this.schedule(2);
          idle.schedule(() => {
            syncExec2 = false;
          });
        } else if (index === 2) {
          this.schedule(3);
        } else if (index === 3) {
          if (!syncExec1 && !syncExec2) {
            done();
          } else {
            done(new Error('Execution happened synchronously.'));
          }
        }
      },
      0,
      0
    );
  });

  it('should cancel the animation frame if all scheduled actions unsubscribe before it executes', (
    done: MochaDone
  ) => {
    let idleExec1 = false;
    let idleExec2 = false;

    const action1 = idle.schedule(() => {
      idleExec1 = true;
    });
    const action2 = idle.schedule(() => {
      idleExec2 = true;
    });

    expect(idle.scheduled).to.exist;
    expect(idle.actions.length).to.equal(2);

    action1.unsubscribe();
    action2.unsubscribe();

    expect(idle.actions.length).to.equal(0);
    expect(idle.scheduled).to.equal(undefined);

    idle.schedule(() => {
      expect(idleExec1).to.equal(false);
      expect(idleExec2).to.equal(false);
      done();
    });
  });

  it('should execute the rest of the scheduled actions if the first action is canceled', (
    done: MochaDone
  ) => {
    let actionHappened = false;
    let firstSubscription = null;
    let secondSubscription: any = null;

    firstSubscription = idle.schedule(() => {
      actionHappened = true;
      if (secondSubscription) {
        secondSubscription.unsubscribe();
      }
      done(new Error('The first action should not have executed.'));
    });

    secondSubscription = idle.schedule(() => {
      if (!actionHappened) {
        done();
      }
    });

    if (actionHappened) {
      done(new Error('Scheduled action happened synchronously'));
    } else {
      firstSubscription.unsubscribe();
    }
  });
});
