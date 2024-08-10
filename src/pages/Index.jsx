import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, RotateCcw, Code, ChevronRight } from "lucide-react";

const initialCode = `function greet(name) {
  console.log("Hello, " + name + "!");
}

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(num) {
  return num * 2;
});

let x = 10;
if (x > 5) {
  console.log("x is greater than 5");
}`;

const Index = () => {
  const [code, setCode] = useState(initialCode);
  const [commands, setCommands] = useState(`console.log("Hello, " + name + "!");
console.log(\`Hello, \${name}!\`);
const doubled = numbers.map(function(num) {
const doubled = numbers.map((num) =>
if (x > 5) {
if (x > 5 && x < 15) {
let x = 10;
const x = 10;`);

  const [highlightedCode, setHighlightedCode] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    highlightChanges();
  }, [code, commands, currentStep]);

  const highlightChanges = () => {
    const commandLines = commands.split('\n');
    let currentCode = code;
    let highlighted = '';
    let lastIndex = 0;

    for (let i = 0; i < Math.min(currentStep * 2, commandLines.length); i += 2) {
      const search = commandLines[i];
      const replace = commandLines[i + 1] || '';

      if (search && currentCode.includes(search)) {
        const index = currentCode.indexOf(search);
        highlighted += currentCode.slice(lastIndex, index);
        if (i === (currentStep - 1) * 2) {
          highlighted += `<span class="bg-yellow-200 transition-all duration-500">${search}</span>`;
          highlighted += `<span class="bg-green-200 transition-all duration-500">${replace}</span>`;
        } else {
          highlighted += replace;
        }
        lastIndex = index + search.length;
        currentCode = currentCode.replace(search, replace);
      }
    }

    highlighted += currentCode.slice(lastIndex);
    setHighlightedCode(highlighted);
  };

  const executeNextStep = () => {
    const commandLines = commands.split('\n');
    if (currentStep * 2 < commandLines.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setCurrentStep(0);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Code className="mr-2 h-8 w-8 text-blue-500" />
            Real-time Code Change Visualizer
          </h1>
          <div className="flex space-x-2">
            <Button onClick={resetCode} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset Code
            </Button>
            <Button onClick={executeNextStep}>
              <ChevronRight className="mr-2 h-4 w-4" /> Next Step
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow p-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          <Card className="p-4 flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <Code className="mr-2 h-5 w-5 text-blue-500" /> Code
            </h2>
            <div 
              className="flex-grow font-mono p-4 border rounded overflow-auto whitespace-pre text-sm bg-white"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </Card>
          <Card className="p-4 flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-2">Search and Replace Commands</h2>
            <Textarea
              value={commands}
              onChange={(e) => setCommands(e.target.value)}
              className="flex-grow font-mono text-sm resize-none"
              placeholder="Enter search and replace commands (one per line)"
            />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;