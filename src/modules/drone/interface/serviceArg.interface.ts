export interface TriggerArg {
  owner: string,
  repo: string,
  branch?: string,
  commit?: string,
}

export interface CancelBuildArg {
  owner: string,
  repo: string,
  build: number;
}