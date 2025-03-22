import React, { useState } from 'react';
import { Input } from 'shadcn/ui';

const AccountForm = () => {
  const [githubPat, setGithubPat] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [claudeKey, setClaudeKey] = useState('');
  const [localLLMUrl, setLocalLLMUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="githubPat">GitHub PAT</label>
        <Input
          id="githubPat"
          type="text"
          value={githubPat}
          onChange={(e) => setGithubPat(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="openaiKey">OpenAI API Key</label>
        <Input
          id="openaiKey"
          type="text"
          value={openaiKey}
          onChange={(e) => setOpenaiKey(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="claudeKey">Claude API Key</label>
        <Input
          id="claudeKey"
          type="text"
          value={claudeKey}
          onChange={(e) => setClaudeKey(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="localLLMUrl">Local LLM URL</label>
        <Input
          id="localLLMUrl"
          type="text"
          value={localLLMUrl}
          onChange={(e) => setLocalLLMUrl(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default AccountForm;
