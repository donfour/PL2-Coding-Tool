import React, { useCallback, useState } from "react";
import { parse } from "csv-parse/lib/sync";
import LandingPage from "./pages/landing/LandingPage";
import EditorPage from "./pages/editor/EditorPage";

function App() {
  const [csv, setCsv] = useState<object[]>();
  const [questionColumn, setQuestionColumn] = useState<string>();
  const [responseColumn, setResponseColumn] = useState<string>();
  const [isEditorLaunched, setIsEditorLaunched] = useState(false);

  const onFileUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    const content = (await file.text()) as string;
    const csv = parse(content, {
      columns: true,
      skip_empty_lines: true,
    }) as object[];
    console.log(csv); // TOOD: remove
    setCsv(csv);
  }, []);

  return isEditorLaunched ? (
    <EditorPage csv={csv} />
  ) : (
    <LandingPage
      csv={csv}
      questionColumn={questionColumn}
      responseColumn={responseColumn}
      setQuestionColumn={setQuestionColumn}
      setResponseColumn={setResponseColumn}
      onFileUpload={onFileUpload}
      onEditorLaunch={() => setIsEditorLaunched(true)}
    />
  );
}

export default App;
