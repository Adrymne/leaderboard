import { propOr, identity } from 'ramda';
import { loop, Cmd } from 'redux-loop';

export const createReducer = (initial, spec) => (state = initial, action) =>
  propOr(identity, action.type, spec)(state, action);

// Helper for specifying simple case of Cmd.run
export const runWith = f => state => {
  const { cmd, onSuccess, args } = f(state);
  return loop(state, Cmd.run(cmd, { successActionCreator: onSuccess, args }));
};
export const run = spec => runWith(() => spec);
