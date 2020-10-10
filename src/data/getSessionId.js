import { nanoid } from 'nanoid';

// TODO - store this in localstorage?
const sessionId = nanoid();

/** Return a session id */
export default function getSessionId() {
  return sessionId;
}
