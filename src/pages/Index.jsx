import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Diff, Search, Play } from "lucide-react";

const Index = () => {
  const [code, setCode] = useState(`function greet(name) {
  console.log("Hello, " + name + "!");
}

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(num) {
  return num * 2;
});

let x = 10;
if (x > 5) {
  console.log("x is greater than 5");
}`);

  const [commands, setCommands] = useState(`console.log("Hello, " + name + "!");
console.log(\`Hello, \${name}!\`);
const doubled = numbers.map(function(num) {
const doubled = numbers.map((num) =>
if (x > 5) {
if (x > 5 && x < 15) {
let x = 10;
const x = 10;`);

  const [diffs, setDiffs] = useState([]);

  const executeCommands = () => {
    const commandLines = commands.split('\n');
    let currentCode = code;
    const newDiffs = [];

    for (let i = 0; i < commandLines.length; i += 2) {
      const search = commandLines[i];
      const replace = commandLines[i + 1] || '';

      if (search && currentCode.includes(search)) {
        const beforeIndex = currentCode.indexOf(search);
        const afterIndex = beforeIndex + search.length;
        const newCode = currentCode.replace(search, replace);

        newDiffs.push({
          before: currentCode.slice(beforeIndex, afterIndex),
          after: replace,
          lineNumber: currentCode.slice(0, beforeIndex).split('\n').length
        });

        currentCode = newCode;
      }
    }

    setCode(currentCode);
    setDiffs(newDiffs);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Real-time Code Diff Viewer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Code</h2>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-64 font-mono"
            placeholder="Enter your code here"
          />
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
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-semibold mb-2">Diffs</h2>
        <ScrollArea className="h-64">
          {diffs.map((diff, index) => (
            <div key={index} className="mb-4">
              <p className="text-sm text-gray-500">Line {diff.lineNumber}</p>
              <div className="flex items-center">
                <Diff className="mr-2 h-4 w-4 text-orange-500" />
                <pre className="bg-red-100 p-1 rounded">{diff.before}</pre>
              </div>
              <div className="flex items-center mt-1">
                <Search className="mr-2 h-4 w-4 text-green-500" />
                <pre className="bg-green-100 p-1 rounded">{diff.after}</pre>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Index;