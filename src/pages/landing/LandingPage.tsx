import React, { ChangeEvent, useCallback, useMemo, useState } from "react";

import csvIcon from "../../assets/csv-icon.png";
import csvIconSmall from "../../assets/csv-icon-small.png";
import checkIcon from "../../assets/check-icon.svg";

import UploadButton from "./UploadButton";
import Button from "../../components/Button";

interface LandingPageProps {
  csv?: any;
  questionColumn?: string;
  responseColumn?: string;
  setQuestionColumn: (value: string) => void;
  setResponseColumn: (value: string) => void;
  onFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onEditorLaunch: () => void;
}

function LandingPage(props: LandingPageProps) {
  const {
    csv,
    onFileUpload,
    onEditorLaunch,
    questionColumn,
    responseColumn,
    setQuestionColumn,
    setResponseColumn,
  } = props;
  const [fileName, setFileName] = useState<string>();

  const columns: string[] = useMemo(() => {
    return csv ? Object.keys(csv[0]) : [];
  }, csv);

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFileName(event?.target?.files?.[0]?.name);
      onFileUpload(event);
    },
    [onFileUpload]
  );

  return (
    <div className="h-screen bg-blue-50 flex justify-center items-center">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-4xl text-primary font-bold">
          PL2 AI-assisted Coding Tool
        </h1>
        <h2 className="text-gray-500">Upload a csv file to get started!</h2>
        <div className="flex">
          <div
            className={`h-96 w-32rem flex flex-col items-center bg-white rounded-sm ${
              csv ? "" : "border justify-center"
            } border-primary border-dashed gap-5 p-4`}
          >
            {!csv && (
              <>
                <img
                  className="h-32 w-32"
                  src={csvIcon}
                  alt="An icon for an HTML file"
                />
                <UploadButton onUpload={handleFileUpload}>
                  Upload CSV
                </UploadButton>
              </>
            )}
            {csv && (
              <>
                <div className="flex justify-between w-full border-b h-32">
                  <div className="flex items-center gap-3 mr-2">
                    <img
                      className="h-10 w-10"
                      src={csvIconSmall}
                      alt="An icon for an HTML file"
                    />
                    {fileName}
                    <img
                      className="h-4 w-4"
                      src={checkIcon}
                      alt="An checkmark icon"
                    />
                  </div>
                  <UploadButton replace onUpload={handleFileUpload} />
                </div>
                <div className="flex flex-col gap-4">
                  <label>Select the column that contains the question:</label>
                  <select
                    className="border rounded border-black"
                    value={questionColumn}
                    onChange={(e) => setQuestionColumn(e.target.value)}
                  >
                    {columns
                      .filter((column) => column !== "")
                      .map((column) => (
                        <option key={column} value={column}>
                          {column}
                        </option>
                      ))}
                  </select>
                  <label>Select the column that contains the response:</label>
                  <select
                    className="border rounded border-black"
                    value={responseColumn}
                    onChange={(e) => setResponseColumn(e.target.value)}
                  >
                    {columns
                      .filter((column) => column !== "")
                      .map((column) => (
                        <option key={column} value={column}>
                          {column}
                        </option>
                      ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
        <Button onClick={onEditorLaunch} disabled={!csv}>
          Launch
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
