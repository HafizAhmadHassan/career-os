import type { ProjectBuild } from '@/types';
import { productionRagAgent } from './ragAgent';
import { contextEngineeringLab } from './contextEngineeringLab';
import { multiAgentResearchSystem } from './multiAgentResearch';
import { mcpBusinessAgent } from './mcpBusinessAgent';
import { browserUseAgent } from './browserUseAgent';
import { agentMemorySystem } from './agentMemorySystem';
import { enterpriseRagPlatform } from './enterpriseRagPlatform';
import { llmGateway } from './llmGateway';
import { agenticSupportCopilot } from './agenticSupportCopilot';

export const projectBuilds: ProjectBuild[] = [
  productionRagAgent,
  contextEngineeringLab,
  multiAgentResearchSystem,
  mcpBusinessAgent,
  browserUseAgent,
  agentMemorySystem,
  enterpriseRagPlatform,
  llmGateway,
  agenticSupportCopilot,
];

export function getProjectBuild(slug: string): ProjectBuild | undefined {
  return projectBuilds.find((p) => p.slug === slug);
}

export function getProjectBuildById(projectId: string): ProjectBuild | undefined {
  return projectBuilds.find((p) => p.projectId === projectId);
}

export function getProjectSkillId(projectId: string, skillId: string): string | undefined {
  return getProjectBuildById(projectId)?.skills.find((s) => s.id === skillId)?.id;
}