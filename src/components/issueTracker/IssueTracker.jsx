import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Column from '../column';


const IssueTracker = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [issues, setIssues] = useState([]);

   // Определение loadIssues с использованием useCallback
  const loadIssues = useCallback(async () => {
    try {
      if (repoUrl) {
        const apiUrl = `${repoUrl}/issues`;
        const response = await axios.get(apiUrl);
        setIssues(response.data);
      }
    } catch (error) {
      console.error('Error loading issues:', error);
    }
  }, [repoUrl]); // зависимость repoUrl указана здесь

   useEffect(() => {
    if (repoUrl) {
      loadIssues(); // вызываем loadIssues при изменении repoUrl
    }
  }, [repoUrl, loadIssues]); // передаем loadIssues как зависимость

  const handleLoadClick = () => {
    if (repoUrl) {
      loadIssues();
    }
    };
    
    const handleUrlChange = (event) => {
    // Обработчик изменения URL репозитория
    setRepoUrl(event.target.value);
  };

  return (
    <div>
      <h1>GitHub Issue Tracker</h1>
      <div className="input-container">
        <input
          type="text"
          value={repoUrl}
          onChange={handleUrlChange}
          placeholder="Enter GitHub repo URL"
        />
        <button onClick={handleLoadClick}>Load</button>
      </div>
      <div className="columns-container">
        <Column title="ToDo" issues={issues.filter(issue => !issue.state || issue.state === 'open')} />
        <Column title="In Progress" issues={issues.filter(issue => issue.assignee)} />
        <Column title="Done" issues={issues.filter(issue => issue.state === 'closed')} />
      </div>
    </div>
  );
};

export default IssueTracker;