[![npm](https://img.shields.io/npm/v/rxjs-requestidlecallback-scheduler.svg)](https://www.npmjs.com/package/rxjs-requestidlecallback-scheduler)

# rxjs-requestidlecallback-scheduler

`rxjs-requestidlecallback-scheduler` provides scheduler implementation to [`requestIdleCallback`](https://developer.mozilla.org/en/docs/Web/API/Window/requestIdleCallback). Scheduling behavior follows `AnimationFrameScheduler` while actions are schduled via requestIdleCallback instead.

# Install

This has a peer dependencies of `rxjs@5.*.*`, which will have to be installed as well

```sh
npm install --save-dev rxjs-requestidlecallback-scheduler
```

# Usage

```js
import { idle } from `rxjs-requestidlecallback-scheduler`
```