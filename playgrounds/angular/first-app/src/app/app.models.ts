import { Blockchain } from './blockchain/blockchain.models';

export interface AppState {
  readonly blockchain: Blockchain[];
}
