/**
 * Firebase entry point: the 540 design system MCP as an HTTP Cloud Function (2nd gen).
 * Firebase Hosting rewrites /mcp to it (firebase.json). It is bundled with its metadata into
 * firebase/functions/ by scripts/build-mcp-firebase.ts; never deployed from this file directly.
 */
import { onRequest } from 'firebase-functions/v2/https';
import metadata from './metadata.json' with { type: 'json' };
import { handleMcpRequest } from './http.js';
import { sendWebResponse, toWebRequest } from './node-adapter.js';

export const mcp = onRequest(
  {
    region: 'europe-west1',
    /** Public: Claude calls it without a Google login. Read-only, and its content is public. */
    invoker: 'public',
    memory: '256MiB',
    /** No idle instances: free when unused, at the cost of a cold start after a quiet spell. */
    minInstances: 0,
    maxInstances: 10,
    concurrency: 80,
    timeoutSeconds: 30,
  },
  async (req, res) => {
    const request = toWebRequest(req, `https://${req.hostname}`, req.rawBody);
    await sendWebResponse(res, await handleMcpRequest(request, metadata));
  },
);
