// Type of the generated mcp/metadata.json, so TypeScript never infers it from the 450 KB file
// (and type-checks even before the file is built). Needs allowArbitraryExtensions.
import type { Metadata } from './types.js';

declare const metadata: Metadata;
export = metadata;
