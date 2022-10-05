import { MintState } from '../types/mint-state';

export default class JupApeNftInvoker {
  constructor(private state: MintState) {}

  async execute() {
    // Here goes the logic
    return this.state;
  }
}
