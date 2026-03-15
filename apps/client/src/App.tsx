import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import TutorialPage from "./pages/tutorial/TutorialPage";
import ExamPage from "./pages/exam/ExamPage";
import ResultPage from "./pages/result/ResultPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<TutorialPage />} />
              <Route path="/exam" element={<ExamPage />} />
              <Route path="/result" element={<ResultPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
