import { z } from 'zod';
import { defineTool, error, text } from './shared.js';

/** The same files as the skill:// resources, for clients that do not read MCP resources. */
export const getSkill = defineTool({
  name: 'get-skill',
  title: 'Get skill',
  description:
    'Returns a file of a skill this server serves (Markdown, in Spanish): by default SKILL.md of the 540-ds skill, the ' +
    'process to build a 540 piece with the person (template or free design, HTML or React, approval, delivery). Its ' +
    'supporting files (e.g. referencias/etiquetas.md) come with `file`. The same files are the resources ' +
    'skill://<skill>/<file>: use this tool only if you cannot read those resources. Read SKILL.md before building a piece.',
  inputSchema: {
    skill: z.string().default('540-ds').describe('The skill name, e.g. "540-ds".'),
    file: z.string().default('SKILL.md').describe('The file inside the skill, e.g. "SKILL.md" or "referencias/react.md".'),
  },
  handler: ({ skill: name, file: filePath }, metadata) => {
    const skill = metadata.skills.find((s) => s.name === name);
    if (!skill) return error(`No skill "${name}". Skills: ${metadata.skills.map((s) => s.name).join(', ') || 'none'}.`);
    const file = skill.files.find((f) => f.path === filePath.replace(/^\.?\//, ''));
    if (!file) return error(`The skill "${name}" has no file "${filePath}". Files: ${skill.files.map((f) => f.path).join(', ')}.`);
    const others = skill.files.filter((f) => f !== file).map((f) => f.path);
    const header = `Source: ${skill.source}/${file.path} (design system ${metadata.version})${others.length ? `\nOther files of this skill: ${others.join(', ')}` : ''}`;
    return text(`${header}\n\n${file.content}`);
  },
});
