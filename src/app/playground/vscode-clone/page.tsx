"use client";

import { useState } from "react";
import VSCodeActivityBar from "../../components/vscode/VSCodeActivityBar";
import VSCodeSidebar from "../../components/vscode/VSCodeSidebar";
import VSCodeEditor from "../../components/vscode/VSCodeEditor-new";
import VSCodeSearchPanel from "../../components/vscode/VSCodeSearchPanel";

// Mock file structure
const mockFileStructure = [
  {
    name: "examples",
    type: "folder" as const,
    children: [
      {
        name: "calculator.js",
        type: "file" as const,
        language: "javascript",
        content: `// Simple Calculator
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function calculate() {
  const x = 10;
  const y = 5;
  
  console.log('Addition:', add(x, y));
  console.log('Multiplication:', multiply(x, y));
  console.log('Powers of 2:');
  
  for (let i = 1; i <= 5; i++) {
    console.log(\`2^\${i} = \${Math.pow(2, i)}\`);
  }
  
  return {
    sum: add(x, y),
    product: multiply(x, y)
  };
}

// Run the calculator
const result = calculate();
console.log('Final result:', result);`,
      },
      {
        name: "array-methods.js",
        type: "file" as const,
        language: "javascript",
        content: `// Array Methods Demo
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('Original array:', numbers);

// Filter even numbers
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('Even numbers:', evenNumbers);

// Map to squares
const squares = numbers.map(num => num * num);
console.log('Squares:', squares);

// Reduce to sum
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log('Sum of all numbers:', sum);

// Find first number > 5
const firstBig = numbers.find(num => num > 5);
console.log('First number > 5:', firstBig);

// Check if all numbers are positive
const allPositive = numbers.every(num => num > 0);
console.log('All numbers positive:', allPositive);`,
      },
      {
        name: "demo.html",
        type: "file" as const,
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Demo</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            backdrop-filter: blur(10px);
        }
        button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 5px;
            transition: all 0.3s;
        }
        button:hover {
            background: #45a049;
            transform: translateY(-2px);
        }
        input {
            padding: 10px;
            border-radius: 5px;
            border: none;
            margin: 5px;
            width: 100px;
        }
        #output {
            background: rgba(0, 0, 0, 0.3);
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <h1>🚀 Interactive Demo Page</h1>
    
    <div class="card">
        <h2>Calculator</h2>
        <input type="number" id="num1" placeholder="Number 1" value="10">
        <input type="number" id="num2" placeholder="Number 2" value="5">
        <br>
        <button onclick="calculate('+')">Add</button>
        <button onclick="calculate('-')">Subtract</button>
        <button onclick="calculate('*')">Multiply</button>
        <button onclick="calculate('/')" >Divide</button>
    </div>
    
    <div class="card">
        <h2>Random Fun</h2>
        <button onclick="generateRandomColor()">Random Color</button>
        <button onclick="showRandomQuote()">Random Quote</button>
        <button onclick="animateButton(this)">Animate Me!</button>
    </div>
    
    <div id="output"></div>

    <script>
        function calculate(operation) {
            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);
            let result;
            
            switch(operation) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/': result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero'; break;
            }
            
            updateOutput(\`\${num1} \${operation} \${num2} = \${result}\`);
        }
        
        function generateRandomColor() {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.background = \`linear-gradient(135deg, \${randomColor} 0%, #764ba2 100%)\`;
            updateOutput(\`New background color: \${randomColor}\`);
        }
        
        function showRandomQuote() {
            const quotes = [
                "The only way to do great work is to love what you do. - Steve Jobs",
                "Innovation distinguishes between a leader and a follower. - Steve Jobs",
                "Life is what happens to you while you're busy making other plans. - John Lennon",
                "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
            ];
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            updateOutput(\`💫 \${randomQuote}\`);
        }
        
        function animateButton(button) {
            button.style.transform = 'scale(1.2) rotate(360deg)';
            button.style.background = '#FF6B6B';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
                button.style.background = '#4CAF50';
            }, 500);
            updateOutput('🎉 Button animated!');
        }
        
        function updateOutput(message) {
            const output = document.getElementById('output');
            const timestamp = new Date().toLocaleTimeString();
            output.innerHTML += \`<div>[\${timestamp}] \${message}</div>\`;
            output.scrollTop = output.scrollHeight;
        }
        
        // Initial welcome message
        updateOutput('Welcome to the interactive demo! Try the buttons above.');
    </script>
</body>
</html>`,
      },
      {
        name: "fibonacci.js",
        type: "file" as const,
        language: "javascript",
        content: `// Fibonacci Sequence Generator
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacciIterative(n) {
  if (n <= 1) return n;
  
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

console.log('=== Fibonacci Sequence Demo ===');
console.log('First 10 Fibonacci numbers:');

for (let i = 0; i < 10; i++) {
  const fib = fibonacciIterative(i);
  console.log(\`F(\${i}) = \${fib}\`);
}

console.log('\\n=== Performance Comparison ===');
const n = 30;

console.time('Recursive');
const recursiveResult = fibonacci(n);
console.timeEnd('Recursive');

console.time('Iterative');
const iterativeResult = fibonacciIterative(n);
console.timeEnd('Iterative');

console.log(\`F(\${n}) = \${recursiveResult} (recursive)\`);
console.log(\`F(\${n}) = \${iterativeResult} (iterative)\`);`,
      },
      {
        name: "simple-test.js",
        type: "file" as const,
        language: "javascript",
        content: `// Simple Test
console.log('Hello World!');

const numbers = [1, 2, 3, 4, 5];
console.log('Numbers:', numbers);

const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('Developer'));

// Test template literals
const age = 25;
const message = \`I am \${age} years old\`;
console.log(message);`,
      },
      {
        name: "modern-js-features.js",
        type: "file" as const,
        language: "javascript",
        content: `// Modern JavaScript Features Demo
console.log('=== Modern JS Features ===');

// Arrow functions
const square = x => x * x;
const add = (a, b) => a + b;

console.log('Square of 5:', square(5));
console.log('Add 3 + 7:', add(3, 7));

// Destructuring
const person = { name: 'Alice', age: 30, city: 'New York' };
const { name, age } = person;
console.log(\`Person: \${name}, Age: \${age}\`);

const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log('First:', first, 'Second:', second, 'Rest:', rest);

// Template literals and expressions
const greeting = \`Hello, \${name}! You are \${age} years old.\`;
console.log(greeting);

// Array methods
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log('Original:', numbers);
console.log('Doubled:', doubled);
console.log('Evens:', evens);
console.log('Sum:', sum);

// Object shorthand
const x = 10, y = 20;
const point = { x, y };
console.log('Point:', point);

// Spread operator
const moreNumbers = [...numbers, 6, 7, 8];
console.log('More numbers:', moreNumbers);

// Default parameters
function greet(name = 'World', exclamation = '!') {
  return \`Hello, \${name}\${exclamation}\`;
}

console.log(greet());
console.log(greet('Developer'));
console.log(greet('Coder', '!!!'));

console.log('\\n=== All tests completed! ===');`,
      },
    ],
  },
  {
    name: "src",
    type: "folder" as const,
    children: [
      {
        name: "components",
        type: "folder" as const,
        children: [
          {
            name: "Header.tsx",
            type: "file" as const,
            language: "typescript",
            content: `import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;`,
          },
          {
            name: "Button.tsx",
            type: "file" as const,
            language: "typescript",
            content: `import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary' 
}) => {
  const baseClasses = "px-4 py-2 rounded-sm font-medium transition-colors";
  const variantClasses = variant === 'primary' 
    ? "bg-blue-500 hover:bg-blue-600 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-gray-800";

  return (
    <button 
      className={\`\${baseClasses} \${variantClasses}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;`,
          },
        ],
      },
      {
        name: "pages",
        type: "folder" as const,
        children: [
          {
            name: "index.tsx",
            type: "file" as const,
            language: "typescript",
            content: `import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <Header title="Welcome to VS Code Clone" />
      <main className="p-8">
        <h2 className="text-xl mb-4">Hello, World!</h2>
        <p className="mb-4">
          This is a VS Code-like interface built with React and Tailwind CSS.
        </p>
        <Button onClick={handleClick}>
          Click Me!
        </Button>
      </main>
    </div>
  );
};

export default HomePage;`,
          },
        ],
      },
      {
        name: "styles",
        type: "folder" as const,
        children: [
          {
            name: "globals.css",
            type: "file" as const,
            language: "css",
            content: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}

.editor-container {
  height: 100vh;
  overflow: hidden;
}

.line-numbers {
  color: #858585;
  user-select: none;
  font-family: 'Courier New', monospace;
}

.code-content {
  font-family: 'Courier New', monospace;
  white-space: pre;
  tab-size: 2;
}`,
          },
        ],
      },
    ],
  },
  {
    name: "package.json",
    type: "file" as const,
    language: "json",
    content: `{
  "name": "vscode-clone",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "typescript": "^5"
  }
}`,
  },
  {
    name: "README.md",
    type: "file" as const,
    language: "markdown",
    content: `# VS Code Clone

A beautiful VS Code-like interface built with Next.js, React, and Tailwind CSS.

## Features

- 📁 File Explorer
- 📝 Code Editor with Syntax Highlighting
- 🎨 Dark/Light Theme
- 📋 Multiple Tabs
- 🔍 Search Functionality

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Tech Stack

- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **FontAwesome** - Icons

Enjoy coding! 🚀`,
  },
];

interface FileItem {
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
  content?: string;
  language?: string;
}

export default function VSCodePage() {
  const [activeView, setActiveView] = useState("explorer");
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [fileContents, setFileContents] = useState<{ [key: string]: string }>(
    {}
  );

  const handleFileSelect = (file: FileItem) => {
    if (file.type === "file") {
      setSelectedFile(file);
    }
  };

  const handleCloseFile = () => {
    setSelectedFile(null);
  };

  const handleContentChange = (content: string) => {
    if (selectedFile) {
      setFileContents((prev) => ({
        ...prev,
        [selectedFile.name]: content,
      }));
    }
  };

  // Get current file content (either modified or original)
  const getCurrentFileContent = (file: FileItem) => {
    return fileContents[file.name] || file.content || "";
  };

  // Update selected file with current content
  const currentFile = selectedFile
    ? {
        ...selectedFile,
        content: getCurrentFileContent(selectedFile),
      }
    : null;

  const renderSidePanel = () => {
    switch (activeView) {
      case "explorer":
        return (
          <VSCodeSidebar
            files={mockFileStructure}
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
          />
        );
      case "search":
        return <VSCodeSearchPanel />;
      case "source-control":
        return (
          <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">🔄</div>
              <p className="text-sm">Source Control</p>
              <p className="text-xs">Coming Soon</p>
            </div>
          </div>
        );
      case "debug":
        return (
          <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">🐛</div>
              <p className="text-sm">Run and Debug</p>
              <p className="text-xs">Coming Soon</p>
            </div>
          </div>
        );
      case "extensions":
        return (
          <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">🧩</div>
              <p className="text-sm">Extensions</p>
              <p className="text-xs">Coming Soon</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Activity Bar */}
      <VSCodeActivityBar activeView={activeView} onViewChange={setActiveView} />

      {/* Side Panel */}
      {renderSidePanel()}

      {/* Main Editor */}
      <VSCodeEditor
        file={currentFile}
        onCloseFile={handleCloseFile}
        onContentChange={handleContentChange}
      />
    </div>
  );
}
