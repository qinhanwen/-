(function () {
  'use strict';

  do {
    {
      invokeGuardedCallback(
        null,
        commitLayoutEffects,
        null,
        root,
        expirationTime
      );
      if (hasCaughtError()) {
        invariant(nextEffect !== null, 'Should be working on an effect.');
        const error = clearCaughtError();
        captureCommitPhaseError(nextEffect, error);
        nextEffect = nextEffect.nextEffect;
      }
    }
  } while (nextEffect !== null);

  // rollup index.js --file bundle.js --format iife

}());
