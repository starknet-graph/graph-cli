import { version } from './version';

export const GRAPH_CLI_SHARED_HEADERS = {
  'User-Agent': `@starknet-graph/graph-cli@${version}` as const,
};
