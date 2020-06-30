export interface DroneBuildStages {
  id: number,
  repo_id: number,
  build_id: number,
  number: number,
  name: string,
  kind: string,
  type: string,
  status: string,
  errignore: boolean,
  exit_code: number,
  machine: string,
  os: string,
  arch: string,
  started: number,
  stopped: number,
  created: number,
  updated: number,
  version: number,
  on_success: boolean,
  on_failure: boolean
}

export interface DroneBuild {
  id: number,
  repo_id: number,
  number: number,
  status: string,
  event: string,
  action: string,
  link: string,
  message: string,
  before: string,
  after: string,
  ref: string,
  source_repo: string,
  source: string,
  target: string,
  author_login: string,
  author_name: string,
  author_email: string,
  author_avatar: string,
  sender: string,
  started: number,
  finished: number,
  created: number,
  updated: number,
  version: number,
  stages: DroneBuildStages[],
}

