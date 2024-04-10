import { createTypedHooks } from 'easy-peasy';
import { Model } from './models';

const { useStoreState, useStoreActions } = createTypedHooks<Model>();

export { useStoreState, useStoreActions };
