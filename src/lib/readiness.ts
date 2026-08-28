import type { CareerReadiness, SkillLevel, Skill } from '@/types';
import { skillCategories, skills } from '@/data/skills';

function calculateSkillScore(level: SkillLevel, evidenceCount: number): number {
  const levelScore = (level / 5) * 0.6;
  const evidenceScore = Math.min(evidenceCount * 0.1, 0.4);
  return levelScore + evidenceScore;
}

export function calculateCareerReadiness(): CareerReadiness[] {
  return skillCategories.map((category) => {
    const categorySkills: Skill[] = category.skillIds
      .map((id) => skills.find((s) => s.id === id))
      .filter((s): s is Skill => s !== undefined);

    const skillsData = categorySkills.map((skill) => ({
      name: skill.name,
      level: skill.level,
      evidenceCount: skill.evidenceIds.length,
    }));

    const avgScore =
      skillsData.length > 0
        ? skillsData.reduce(
            (sum: number, s) => sum + calculateSkillScore(s.level, s.evidenceCount),
            0
          ) / skillsData.length
        : 0;

    return {
      category: category.name,
      score: Math.round(avgScore * 100),
      weight: category.weight,
      skills: skillsData,
    };
  });
}

export function getOverallReadiness(): number {
  const readiness = calculateCareerReadiness();
  return Math.round(
    readiness.reduce((sum: number, r) => sum + r.score * r.weight, 0)
  );
}

export function getTodayMission(): {
  title: string;
  skill: string;
  estimatedTime: string;
  whyItMatters: string;
  relatedProject: string;
} {
  const inProgressSkills = skills.filter(
    (s) => s.status === 'learning' || s.status === 'practicing'
  );
  if (inProgressSkills.length === 0) {
    return {
      title: 'Start your first skill',
      skill: 'Any skill from your roadmap',
      estimatedTime: '1 hour',
      whyItMatters: 'Every expert journey begins with the first step',
      relatedProject: 'Career OS Setup',
    };
  }
  const skill = inProgressSkills[0];
  return {
    title: `Continue learning ${skill.name}`,
    skill: skill.name,
    estimatedTime: '2 hours',
    whyItMatters: `${skill.name} is a core skill in ${skill.category.replace('-', ' ')}`,
    relatedProject: 'Personal Learning',
  };
}
