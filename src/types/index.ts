export type SkillLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type SkillStatus =
  | "not_started"
  | "learning"
  | "practicing"
  | "building"
  | "demonstrated"
  | "mastered";

export type EvidenceType =
  | "project"
  | "repository"
  | "pull_request"
  | "article"
  | "benchmark"
  | "certification"
  | "deployment"
  | "interview_exercise"
  | "experiment";

export type RoadmapStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "skipped";

export type ProjectStatus =
  | "planned"
  | "in_progress"
  | "completed"
  | "deployed";

export type CertificationStatus =
  | "planned"
  | "in_progress"
  | "completed"
  | "expired";

export type ContributionType =
  | "code"
  | "documentation"
  | "bug_fix"
  | "feature"
  | "review"
  | "issue";

export type GoalTimeframe = "30_days" | "90_days" | "6_months" | "1_year";

export type InterviewStatus =
  | "not_attempted"
  | "attempted"
  | "confident"
  | "mastered";

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  status: SkillStatus;
  description: string;
  evidenceIds: string[];
  relatedProjectIds: string[];
  lastUpdated: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skillIds: string[];
  weight: number;
}

export interface RoadmapItem {
  id: string;
  phase: number;
  phaseName: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  skillId?: string;
  resources: Resource[];
  evidenceIds: string[];
  projectId?: string;
  notes: string;
  completionDate?: string;
  order: number;
}

export interface Resource {
  title: string;
  url: string;
  type: "course" | "article" | "video" | "book" | "docs" | "repository";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  architecture: string;
  technologies: string[];
  skillIds: string[];
  githubUrl?: string;
  demoUrl?: string;
  screenshots: string[];
  benchmarks: Benchmark[];
  status: ProjectStatus;
  cost?: string;
  latency?: string;
  evaluation?: string;
  security?: string;
  failureModes?: string;
  tradeoffs?: string;
  lessonsLearned?: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
}

export interface Benchmark {
  name: string;
  value: number;
  unit: string;
  description: string;
}

export interface Evidence {
  id: string;
  type: EvidenceType;
  title: string;
  description: string;
  skillIds: string[];
  projectId?: string;
  url?: string;
  date: string;
  quality: "low" | "medium" | "high" | "exceptional";
}

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  topics: string[];
  status: "to_study" | "studying" | "implemented" | "deep_understanding" | "contributed";
  notes: string;
  experimentIds: string[];
  issuesStudied: number;
  pullRequests: number;
  implementationNotes: string;
  relatedProjectId?: string;
  stars?: number;
  language?: string;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  status: CertificationStatus;
  startDate?: string;
  completionDate?: string;
  credentialUrl?: string;
  skillIds: string[];
  relatedProjectIds: string[];
}

export interface Contribution {
  id: string;
  repositoryName: string;
  prUrl?: string;
  issueUrl?: string;
  type: ContributionType;
  date: string;
  description: string;
  outcome: string;
  skillIds: string[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  readingTime: number;
  date: string;
  relatedSkillIds: string[];
  relatedProjectIds: string[];
  published: boolean;
}

export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  status: InterviewStatus;
  confidence: number;
  myAnswer: string;
  idealAnswer: string;
  notes: string;
  relatedProjectId?: string;
}

export interface Goal {
  id: string;
  timeframe: GoalTimeframe;
  description: string;
  deadline: string;
  progress: number;
  milestones: Milestone[];
  evidenceIds: string[];
  status: "active" | "completed" | "abandoned";
}

export interface Milestone {
  id: string;
  description: string;
  completed: boolean;
  date?: string;
}

export interface DailyLog {
  id: string;
  date: string;
  focus: string;
  learned: string;
  built: string;
  confused: string;
  hours: number;
  evidenceCreated: string[];
}

export interface WeeklyReview {
  id: string;
  weekStarting: string;
  hoursStudied: number;
  hoursCoding: number;
  projectsWorkedOn: string;
  conceptsLearned: string;
  githubCommits: number;
  articlesRead: number;
  articlesWritten: number;
  openSourceWork: string;
  interviewQuestions: number;
  biggestLesson: string;
  biggestFailure: string;
  nextWeekPriority: string;
}

export interface Experiment {
  id: string;
  name: string;
  description: string;
  type: string;
  metrics: ExperimentMetrics;
  date: string;
  notes: string;
  projectId?: string;
}

export interface ExperimentMetrics {
  accuracy?: number;
  tokens?: number;
  cost?: number;
  latency?: number;
  contextRelevance?: number;
  failureRate?: number;
}

export interface CareerReadiness {
  category: string;
  score: number;
  weight: number;
  skills: { name: string; level: SkillLevel; evidenceCount: number }[];
}

export interface GitHubProfile {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  name: string;
  fullName: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  updatedAt: string;
}
