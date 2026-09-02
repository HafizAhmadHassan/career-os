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
  slug: string;
  description: string;
  status: RoadmapStatus;
  skillId?: string;
  skillIds?: string[];
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

// ===== Writing system =====

export type ArticleStatus =
  | "idea"
  | "researching"
  | "outlining"
  | "drafting"
  | "editing"
  | "published"
  | "archived";

export const writingWorkflow: { status: ArticleStatus; label: string }[] = [
  { status: "idea", label: "Idea" },
  { status: "researching", label: "Research" },
  { status: "outlining", label: "Outline" },
  { status: "drafting", label: "Draft" },
  { status: "editing", label: "Technical Review" },
  { status: "editing", label: "Edit" },
  { status: "published", label: "Publish" },
  { status: "published", label: "Add Evidence" },
];

export const defaultQualityChecks = () => [
  { key: "problem", label: "Problem clearly explained", help: "The reader understands the problem before the answer.", done: false },
  { key: "claims", label: "Technical claims verified", help: "Every claim you make is something you can back up.", done: false },
  { key: "code", label: "Code tested", help: "Snippets actually run; no guesswork in code blocks.", done: false },
  { key: "architecture", label: "Architecture explained", help: "Systems described with components, not vibes.", done: false },
  { key: "tradeoffs", label: "Trade-offs discussed", help: "You show what you gave up and why.", done: false },
  { key: "limitations", label: "Limitations acknowledged", help: "You state what this approach does NOT do.", done: false },
  { key: "sources", label: "Sources added where appropriate", help: "Real links to docs, papers and repos.", done: false },
  { key: "no_fake_benchmarks", label: "No fabricated benchmarks", help: "No invented numbers or citations.", done: false },
  { key: "no_fake_results", label: "No fabricated results", help: "Experiments report what actually happened.", done: false },
  { key: "working_examples", label: "Examples actually work", help: "Reader can copy and run them.", done: false },
];

export type ArticleQualityCheck = {
  key: string;
  label: string;
  help?: string;
  done: boolean;
};

export type ArticleTemplateId = "tutorial" | "deep_dive" | "experiment" | "case_study";

export type ArticleTemplate = {
  id: ArticleTemplateId;
  name: string;
  description: string;
  sections: { title: string; hint: string }[];
};

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  stage: number; // 0..7 position in writingWorkflow
  status: ArticleStatus;
  content: string; // markdown
  wordCount: number;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  lastSavedAt: string;
  researchId?: string;
  template?: ArticleTemplateId;
  relatedSkillIds: string[];
  relatedProjectIds: string[];
  qualityChecks: ArticleQualityCheck[];
  featured: boolean;
  publishedUrl?: string;
  publishedAt?: string;
}

export type WritingIdeaStatus = ArticleStatus;

export type IdeaPriority = "high" | "medium" | "low";

export type IdeaSource =
  | { kind: "manual" }
  | { kind: "project"; projectId: string; targetId?: string; targetType?: "lab" | "experiment" }
  | { kind: "roadmap"; roadmapSlug: string };

export interface WritingIdea {
  id: string;
  title: string;
  category: string;
  description: string;
  whyItMatters: string;
  relatedSkillIds: string[];
  relatedProjectIds: string[];
  difficulty: QuestionDifficulty;
  priority: IdeaPriority;
  status: WritingIdeaStatus;
  source: IdeaSource;
  recommended?: boolean;
  recommendation?: string;
  createdAt: string;
}

export type ResearchItemKind = "note" | "quote" | "key_fact" | "question" | "claim";

export type ResearchSource = {
  id: string;
  url: string;
  title: string;
  kind: string;
};

export type ResearchItem = {
  id: string;
  kind: ResearchItemKind;
  text: string;
  sourceId?: string;
  createdAt: string;
};

export interface ResearchNote {
  id: string;
  articleId: string;
  sources: ResearchSource[];
  items: ResearchItem[];
  updatedAt: string;
}

// ===== Interview system =====

export type QuestionType =
  | "conceptual"
  | "practical"
  | "debugging"
  | "architecture"
  | "trade_off"
  | "coding"
  | "behavioral";

export type QuestionDifficulty = "beginner" | "intermediate" | "advanced" | "senior" | "staff";

export type InterviewConfidence =
  | "not_attempted"
  | "weak"
  | "learning"
  | "good"
  | "strong"
  | "interview_ready";

export type InterviewFollowUp = {
  question: string;
  hint?: string;
};

export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  // user state (merged with seed)
  myAnswer: string;
  notes: string;
  confidence: InterviewConfidence;
  // seed content (revealed after answering)
  suggestedAnswer: string;
  importantConcepts: string[];
  commonMistakes: string[];
  followUps: InterviewFollowUp[];
  relatedProjectId?: string;
  roadmapSlugs: string[];
  skillIds: string[];
  // spaced repetition
  dueDate?: string;
  lastReviewedAt?: string;
  reviewCount: number;
  correctInARow: number;
  bestScore: number;
}

export const interviewConfidenceOrder: InterviewConfidence[] = [
  "not_attempted",
  "weak",
  "learning",
  "good",
  "strong",
  "interview_ready",
];

export type RubricScores = {
  accuracy: number; // 0-5
  depth: number;
  clarity: number;
  architecture: number;
  tradeoffs: number;
  production: number;
  communication: number;
};

export const rubricKeys: (keyof RubricScores)[] = [
  "accuracy",
  "depth",
  "clarity",
  "architecture",
  "tradeoffs",
  "production",
  "communication",
];

export type InterviewAttempt = {
  id: string;
  questionId: string;
  answer: string;
  scores: RubricScores;
  overallScore: number; // 0-100
  manualAdjusted: boolean;
  timeTakenSeconds: number;
  confidenceBefore: InterviewConfidence;
  reviewedIdeal: boolean;
  notes: string;
  createdAt: string;
};

export type MockInterviewType = "technical" | "system_design" | "coding" | "behavioral" | "mixed";

export type MockInterviewResult = {
  questionId: string;
  answer: string;
  timeTakenSeconds: number;
  revealed: boolean;
  selfScore: number; // 0-100
  notes: string;
};

export type MockInterview = {
  id: string;
  title: string;
  role: string;
  type: MockInterviewType;
  difficulty: QuestionDifficulty;
  questionIds: string[];
  results: MockInterviewResult[];
  status: "in_progress" | "completed";
  startedAt: string;
  completedAt?: string;
};

export type SystemDesignProblem = {
  id: string;
  title: string;
  category: string;
  prompt: string;
  requirements: string[];
  constraints: string[];
  scale: string;
  discussionAreas: string[];
  rubric: string[];
  followUps: string[];
};

export type SystemDesignPractice = {
  id: string;
  problemId: string;
  canvas: string; // free-form / mermaid text
  notes: string;
  timeTakenMinutes: number;
  rubricScores: Record<string, number>; // rubric label -> 0-5
  reviewNotes: string;
  createdAt: string;
  updatedAt: string;
};

export type CodingChallenge = {
  id: string;
  title: string;
  category: string;
  difficulty: QuestionDifficulty;
  prompt: string;
  examples: { input: string; output: string }[];
  testHints: string[];
  solutionNotes: string; // revealed after first attempt
};

export type CodingAttemptRecord = {
  id: string;
  challengeId: string;
  code: string;
  testsPassed: number;
  totalTests: number;
  timeTakenSeconds: number;
  notes: string;
  createdAt: string;
};

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

// ===== Learning module / curriculum types =====

export type ModuleDifficulty = "beginner" | "intermediate" | "advanced";

export type ModuleObjective = {
  id: string;
  text: string;
};

export type ResourceKind =
  | "documentation"
  | "repository"
  | "tutorial"
  | "article"
  | "paper"
  | "video"
  | "example"
  | "blog";

export type ModuleResource = {
  id: string;
  title: string;
  kind: ResourceKind;
  source: string;
  url: string;
  description: string;
  difficulty: ModuleDifficulty;
  estimatedMinutes: number;
  priority: "high" | "medium" | "low";
};

export type LabRequirement = {
  id: string;
  text: string;
};

export type Lab = {
  id: string;
  title: string;
  problem: string;
  whyItMatters: string;
  prerequisites: string[];
  requirements: LabRequirement[];
  hints: string;
  expectedOutput: string;
  acceptanceCriteria: LabRequirement[];
  skillsPracticed: string[];
  estimatedMinutes: number;
  difficulty: ModuleDifficulty;
};

export type MiniProject = {
  id: string;
  title: string;
  problem: string;
  requirements: LabRequirement[];
  acceptanceCriteria: LabRequirement[];
  skillsPracticed: string[];
  estimatedHours: number;
};

export type AssessmentQuestionType = "mcq" | "short_answer" | "architecture";

export type AssessmentQuestion = {
  id: string;
  type: AssessmentQuestionType;
  question: string;
  options?: string[];
  correctOption?: number;
  idealAnswer?: string;
};

export type CurriculumInterviewQuestion = {
  id: string;
  question: string;
  idealAnswer: string;
};

export type RepoStudyStep = {
  id: string;
  text: string;
};

export type RepositoryStudy = {
  id: string;
  name: string;
  url: string;
  whyStudy: string;
  whatToLookFor: string;
  importantFiles: string[];
  concepts: string[];
  guidedSteps: RepoStudyStep[];
};

export type TopicCurriculum = {
  topicId: string;
  introduction: string;
  estimatedHours: number;
  difficulty: ModuleDifficulty;
  objectives: ModuleObjective[];
  resources: ModuleResource[];
  labs: Lab[];
  miniProject: MiniProject;
  repositories: RepositoryStudy[];
  assessment: AssessmentQuestion[];
  interviewQuestions: CurriculumInterviewQuestion[];
};

// ===== Local learning progress (IndexedDB) =====

export type TopicStatus =
  | "not_started"
  | "learning"
  | "practicing"
  | "building"
  | "demonstrated"
  | "mastered";

export type LabStatusValue = "not_started" | "in_progress" | "completed";

export type ResourceReadState = {
  dateRead: string;
  notes: string;
  rating: number; // 0-5
  keyTakeaway: string;
};

export type LabState = {
  status: LabStatusValue;
  startedAt?: string;
  completedAt?: string;
  githubUrl: string;
  notes: string;
  timeSpentMinutes: number;
  evidence: string;
};

export type MiniProjectState = {
  completed: boolean;
  githubUrl: string;
  notes: string;
  completedAt?: string;
};

export type AssessmentAnswer = {
  selectedOption?: number;
  text: string;
  score?: number;
  submittedAt?: string;
};

export type InterviewProgress = {
  status: InterviewStatus;
  confidence: number; // 0-100
  myAnswer: string;
};

export type TopicEvidence = {
  id: string;
  type: string;
  title: string;
  url: string;
  date: string;
};

export type TopicProgress = {
  topicId: string;
  status: TopicStatus;
  objectivesCompleted: string[];
  resourcesRead: Record<string, ResourceReadState>;
  labs: Record<string, LabState>;
  miniProject: MiniProjectState;
  assessment: Record<string, AssessmentAnswer>;
  interview: Record<string, InterviewProgress>;
  repositorySteps: Record<string, string[]>;
  evidence: TopicEvidence[];
  notes: string;
  startedAt?: string;
  lastStudiedAt?: string;
  completedAt?: string;
};

export const defaultTopicProgress = (topicId: string): TopicProgress => ({
  topicId,
  status: "not_started",
  objectivesCompleted: [],
  resourcesRead: {},
  labs: {},
  miniProject: { completed: false, githubUrl: "", notes: "" },
  assessment: {},
  interview: {},
  repositorySteps: {},
  evidence: [],
  notes: "",
});

// Progress weights (configurable)
export const progressWeights = {
  resources: 0.1,
  objectives: 0.1,
  labs: 0.35,
  miniProject: 0.25,
  assessment: 0.1,
  interview: 0.05,
  evidence: 0.05,
} as const;

// ===== Guided project builds (Projects section) =====

export type ProjectDifficulty = "beginner" | "intermediate" | "advanced" | "production";

export type BuildPrerequisite = {
  id: string;
  skill: string;
  roadmapSlug?: string;
  required: boolean;
};

export type TechChoice = {
  id: string;
  label: string;
  recommended: string;
  alternatives: string[];
  why: string;
};

export type ArchitectureDecision = {
  id: string;
  question: string;
  answer: string;
};

export type ProjectArchitecture = {
  flow: string[];
  branch?: { after: string; left: string[]; right: string[]; join: string };
  why: string[];
  decisions: ArchitectureDecision[];
};

export type ImplementationTask = {
  id: string;
  milestoneId: string;
  title: string;
  goal: string;
  whyItMatters: string;
  prerequisites: string[];
  concepts: string[];
  approach: string[];
  acceptanceCriteria: string[];
  commonMistakes?: string[];
  hints?: string;
  resources?: { title: string; url: string }[];
  relatedRoadmapSlugs?: string[];
  evidenceRequirement?: string;
};

export type ProjectMilestone = {
  id: string;
  title: string;
  summary: string;
  taskIds: string[];
};

export type ProjectLab = {
  id: string;
  title: string;
  problem: string;
  description: string;
  compare: string[];
  measure: string[];
  deliverables: string[];
  estimatedMinutes: number;
};

export type ExperimentTemplate = {
  id: string;
  name: string;
  description: string;
  variants: string[];
  metrics: string[];
  expectedInsights: string;
};

export type ProjectMetric = {
  key: string;
  name: string;
  unit: string;
  description: string;
};

export type SecurityItem = {
  id: string;
  title: string;
  threat: string;
  attackExample: string;
  mitigation: string;
  test: string;
};

export type ChecklistItem = {
  id: string;
  text: string;
  description: string;
};

export type ContextEngineeringQuestion = {
  id: string;
  question: string;
  example: string;
};

export type PortfolioField = {
  id: string;
  label: string;
  placeholder: string;
};

export type ProjectBuild = {
  projectId: string;
  title: string;
  slug: string;
  tagline: string;
  overview: string;
  problem: string;
  difficulty: ProjectDifficulty;
  estimatedHours: { min: number; max: number };
  skills: { id: string; name: string }[];
  technologies: TechChoice[];
  prerequisites: BuildPrerequisite[];
  objectives: ModuleObjective[];
  contextEngineering: ContextEngineeringQuestion[];
  architecture: ProjectArchitecture;
  milestones: ProjectMilestone[];
  tasks: ImplementationTask[];
  labs: ProjectLab[];
  experiments: ExperimentTemplate[];
  evaluation: { description: string; metrics: ProjectMetric[] };
  testing: ChecklistItem[];
  security: SecurityItem[];
  deployment: ChecklistItem[];
  relatedRoadmap: { slug: string; label: string }[];
  relatedRepositories: RepositoryStudy[];
  portfolioFields: PortfolioField[];
  completionRequirements: {
    projectComplete: string[];
    portfolioReady: string[];
    interviewReady: string[];
  };
  githubUrl?: string;
  demoUrl?: string;
};

// ===== Guided project progress (IndexedDB) =====

export type ProjectStatusValue =
  | "not_started"
  | "in_progress"
  | "project_complete"
  | "portfolio_ready"
  | "interview_ready";

export type TaskProgress = { completed: boolean; notes: string };

export type ProjectExperimentResult = {
  id: string;
  name: string;
  version: string;
  date: string;
  metrics: Record<string, number | null>;
  notes: string;
};

export type ProjectJournalEntry = {
  id: string;
  date: string;
  today: string;
  problem: string;
  solution: string;
  lesson: string;
  hours: number;
};

export type ProjectADR = {
  id: string;
  title: string;
  date: string;
  status: "proposed" | "accepted" | "superseded";
  context: string;
  alternatives: string[];
  decision: string;
  reason: string;
};

export type ProjectEvidenceItem = {
  id: string;
  type: string;
  title: string;
  url: string;
  date: string;
};

export type ProjectProgress = {
  projectId: string;
  status: ProjectStatusValue;
  prerequisitesCompleted: string[];
  objectivesCompleted: string[];
  tasks: Record<string, TaskProgress>;
  labs: Record<string, LabState>;
  experiments: ProjectExperimentResult[];
  evaluation: Record<string, number | null>;
  testingCompleted: string[];
  securityCompleted: string[];
  deploymentCompleted: string[];
  contextEngineering: Record<string, string>;
  technologyDecisions: Record<string, string>;
  repositories: Record<string, string[]>;
  journal: ProjectJournalEntry[];
  adrs: ProjectADR[];
  evidence: ProjectEvidenceItem[];
  caseStudy: Record<string, string>;
  githubUrl: string;
  demoUrl: string;
  timeSpentMinutes: number;
  notes: string;
  startedAt?: string;
  lastActivityAt?: string;
  completedAt?: string;
};

export const defaultProjectProgress = (projectId: string): ProjectProgress => ({
  projectId,
  status: "not_started",
  prerequisitesCompleted: [],
  objectivesCompleted: [],
  tasks: {},
  labs: {},
  experiments: [],
  evaluation: {},
  testingCompleted: [],
  securityCompleted: [],
  deploymentCompleted: [],
  contextEngineering: {},
  technologyDecisions: {},
  repositories: {},
  journal: [],
  adrs: [],
  evidence: [],
  caseStudy: {},
  githubUrl: "",
  demoUrl: "",
  timeSpentMinutes: 0,
  notes: "",
});
