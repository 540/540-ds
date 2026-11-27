import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import type { Metadata, SkillFile, SkillMeta } from './types.js';

/**
 * Agent Skills over MCP, as the skills extension (beta) describes them:
 * https://skills.extensions.modelcontextprotocol.io/specification/beta/skills
 *
 * - every file of a skill is a resource at skill://<name>/<path>, SKILL.md included;
 * - skills/list and skills/get return the catalog: the SKILL.md uri, its frontmatter and every file with
 *   its digest and size;
 * - the extension is declared in the initialize capabilities (this SDK has no server/discover yet).
 *
 * Clients that do not read resources get the same files with the get-skill tool.
 */
export const SKILLS_EXTENSION = 'io.modelcontextprotocol/skills';

/** The skills change only on a deploy: hosts may keep an entry for five minutes. */
const CACHE = { ttlMs: 300_000, cacheScope: 'public' } as const;

export const skillUri = (skill: SkillMeta, file: Pick<SkillFile, 'path'> = { path: 'SKILL.md' }) => `skill://${skill.name}/${file.path}`;

const entry = (skill: SkillMeta) => ({
  uri: skillUri(skill),
  frontmatter: skill.frontmatter,
  resources: skill.files.map((f) => ({ uri: skillUri(skill, f), digest: f.digest, size: f.size })),
});

const ListSkillsRequestSchema = z.object({
  method: z.literal('skills/list'),
  params: z.object({ cursor: z.string().optional() }).passthrough().optional(),
});

const GetSkillRequestSchema = z.object({
  method: z.literal('skills/get'),
  params: z.object({ uri: z.string() }).passthrough(),
});

export function registerSkills(server: McpServer, metadata: Metadata): void {
  for (const skill of metadata.skills) {
    for (const file of skill.files) {
      const uri = skillUri(skill, file);
      server.registerResource(
        `${skill.name}/${file.path}`,
        uri,
        {
          title: file.path === 'SKILL.md' ? `Skill ${skill.name}` : `${skill.name}: ${file.path}`,
          description: file.path === 'SKILL.md' ? skill.description : `Supporting file of the ${skill.name} skill.`,
          mimeType: file.mimeType,
        },
        () => ({ contents: [{ uri, mimeType: file.mimeType, text: file.content }] }),
      );
    }
  }

  // A handful of skills: one page, every entry whole.
  server.server.setRequestHandler(ListSkillsRequestSchema, () => ({ resultType: 'complete', skills: metadata.skills.map(entry), ...CACHE }));

  server.server.setRequestHandler(GetSkillRequestSchema, (request) => {
    const skill = metadata.skills.find((s) => skillUri(s) === request.params.uri);
    if (!skill) throw new McpError(ErrorCode.InvalidParams, `No skill is served at ${request.params.uri}`);
    return { resultType: 'complete', skill: entry(skill), ...CACHE };
  });
}
