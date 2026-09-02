import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import SkillsPage from '@/pages/SkillsPage';
import RoadmapPage from '@/pages/RoadmapPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ProjectPage from '@/pages/projects/ProjectPage';
import GitHubPage from '@/pages/GitHubPage';
import WritingPage from '@/pages/WritingPage';
import ArticleEditorPage from '@/pages/writing/ArticleEditorPage';
import InterviewPage from '@/pages/InterviewPage';
import InterviewPracticePage from '@/pages/InterviewPracticePage';
import InterviewQuestionPage from '@/pages/InterviewQuestionPage';
import MockInterviewSetupPage from '@/pages/InterviewMockSetupPage';
import MockInterviewSessionPage from '@/pages/InterviewMockSessionPage';
import SystemDesignListPage from '@/pages/SystemDesignListPage';
import SystemDesignCanvasPage from '@/pages/SystemDesignCanvasPage';
import CodingListPage from '@/pages/CodingListPage';
import CodingWorkspacePage from '@/pages/CodingWorkspacePage';
import FreelancePage from '@/pages/FreelancePage';
import DashboardPage from '@/pages/DashboardPage';
import ContactPage from '@/pages/ContactPage';
import TopicPage from '@/pages/roadmap/TopicPage';
import PhasePage from '@/pages/roadmap/PhasePage';

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/roadmap/phase/:phaseId" element={<PhasePage />} />
          <Route path="/roadmap/:topicSlug" element={<TopicPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectSlug" element={<ProjectPage />} />
          <Route path="/github" element={<GitHubPage />} />
          <Route path="/blog" element={<WritingPage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/writing/articles/:articleId" element={<ArticleEditorPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/interview/practice/:categoryId" element={<InterviewPracticePage />} />
          <Route path="/interview/question/:questionId" element={<InterviewQuestionPage />} />
          <Route path="/interview/mock" element={<MockInterviewSetupPage />} />
          <Route path="/interview/mock/:sessionId" element={<MockInterviewSessionPage />} />
          <Route path="/interview/system-design" element={<SystemDesignListPage />} />
          <Route path="/interview/system-design/:problemId" element={<SystemDesignCanvasPage />} />
          <Route path="/interview/coding" element={<CodingListPage />} />
          <Route path="/interview/coding/:challengeId" element={<CodingWorkspacePage />} />
          <Route path="/freelance" element={<FreelancePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
