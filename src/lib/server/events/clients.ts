import type { Unsafe } from 'sveltekit-sse';
type Emitter = (eventName: string, data: string) => Unsafe<void, Error>;
export const emitters: Set<Emitter> = new Set();
