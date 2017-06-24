import { root } from 'rxjs/util/root';

export class IdleCallbackDefinition {
  public readonly cancelIdle: (handle: number) => void;
  public readonly requestIdle: (cb: () => void) => number;

  constructor(root: any) {
    this.cancelIdle = root.cancelIdleCallback.bind(root);
    this.requestIdle = root.requestIdleCallback.bind(root);

    if (!this.requestIdle || !this.cancelIdle) {
      throw new Error(`RequestIdleCallback not supported`);
    }
  }
}

export const idleCallback = new IdleCallbackDefinition(root);
