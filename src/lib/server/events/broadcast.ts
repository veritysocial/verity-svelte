// src/lib/broadcast.js
import { emitters } from './clients';
import type { TPostClient } from '../db/schema';

export function broadcast(eventName: string, data: TPostClient) {
  for (const emit of emitters) {
    const { error } = emit(eventName, JSON.stringify(data));
    if (error) {
      console.error('Error emitting event:', error);
    }
  }
}
