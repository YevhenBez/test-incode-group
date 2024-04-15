import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Column from '../column';


const IssueTracker = ({ repoUrl }) => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const apiUrl = `${repoUrl}/issues`;
        const response = await axios.get(apiUrl);
        setIssues(response.data);
      } catch (error) {
        console.error('Error loading issues:', error);
      }
    };

    if (repoUrl) {
      loadIssues();
    }
  }, [repoUrl]);

  return (
    <div>
      <h1>GitHub Issue Tracker</h1>
      <div>
        <Column title="ToDo" issues={issues.filter(issue => !issue.state || issue.state === 'open')} />
        <Column title="In Progress" issues={issues.filter(issue => issue.assignee)} />
        <Column title="Done" issues={issues.filter(issue => issue.state === 'closed')} />
      </div>
    </div>
  );
};
export default IssueTracker;