// src/types/babel-standalone.d.ts
declare module "@babel/standalone" {
  export as namespace Babel;

  export interface TransformOutput {
    code?: string;
    map?: Record<string, unknown>; 
    ast?: unknown;
  }

  export function transform(code: string, options?: unknown): TransformOutput;

  const _default: {
    transform: typeof transform;
  };

  export default _default;
}