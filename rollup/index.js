const __DEV__ = false;
do {
  if (__DEV__) {
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
  } else {
    try {
      commitLayoutEffects(root, expirationTime);
    } catch (error) {
      invariant(nextEffect !== null, 'Should be working on an effect.');
      captureCommitPhaseError(nextEffect, error);
      nextEffect = nextEffect.nextEffect;
    }
  }
} while (nextEffect !== null);

// rollup index.js --file bundle.js --format iife
