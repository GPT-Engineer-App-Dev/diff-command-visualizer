import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, RotateCcw } from "lucide-react";

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

  useEffect(() => {
    highlightChanges();
  }, [code, commands]);

  const highlightChanges = () => {
    const commandLines = commands.split('\n');
    let currentCode = code;
    let highlighted = '';
    let lastIndex = 0;

    for (let i = 0; i < commandLines.length; i += 2) {
      const search = commandLines[i];
      const replace = commandLines[i + 1] || '';

      if (search && currentCode.includes(search)) {
        const index = currentCode.indexOf(search);
        highlighted += currentCode.slice(lastIndex, index);
        highlighted += `<span class="bg-yellow-200">${search}</span>`;
        highlighted += `<span class="bg-green-200">${replace}</span>`;
        lastIndex = index + search.length;
      }
    }

    highlighted += currentCode.slice(lastIndex);
    setHighlightedCode(highlighted);
  };

  const executeCommands = () => {
    const commandLines = commands.split('\n');
    let currentCode = code;

    for (let i = 0; i < commandLines.length; i += 2) {
      const search = commandLines[i];
      const replace = commandLines[i + 1] || '';

      if (search && currentCode.includes(search)) {
        currentCode = currentCode.replace(search, replace);
      }
    }

    setCode(currentCode);
  };

  const resetCode = () => {
    setCode(initialCode);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Real-time Code Change Visualizer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Code</h2>
          <div 
            className="h-64 font-mono p-2 border rounded overflow-auto whitespace-pre"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
          <Button onClick={resetCode} className="mt-2" variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset Code
          </Button>
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Search and Replace Commands</h2>
          <Textarea
            value={commands}
            onChange={(e) => setCommands(e.target.value)}
            className="h-64 font-mono"
            placeholder="Enter search and replace commands (one per line)"
          />
          <Button onClick={executeCommands} className="mt-2">
            <Play className="mr-2 h-4 w-4" /> Execute Commands
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Index;