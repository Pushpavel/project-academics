export const ROUTING_PARAMS = ['semId', 'courseCode', 'documentId', 'batchId'] as const;

export const ROUTING_REGEXES: Partial<Record<RoutingParam, RegExp>> = {
  semId: /20[0-9][0-9]_[12]/,
  // TODO: OTHER REGEXES
};


export const ROUTING_PARAMS_AS_OBJECT = ROUTING_PARAMS.reduce((obj, key) => ({
  ...obj,
  [key]: key
}), {} as Record<RoutingParam, RoutingParam>);

export type RoutingParam = (typeof ROUTING_PARAMS)[number]
