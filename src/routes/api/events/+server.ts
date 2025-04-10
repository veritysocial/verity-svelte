import { emitters } from '$lib/server/events/clients';
import { produce } from 'sveltekit-sse';

export function POST() {
  return produce(function start({ emit }) {
    // Add the emitter to the global collection
    emitters.add(emit);

    // Remove the emitter when the client disconnects
    return function stop() {
      emitters.delete(emit);
    };
  });
}
