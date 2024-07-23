import React from 'react';
import { Button } from '@mui/material';

const GitHubButton = () => {
  const gitHubClientID: string = 'Ov23li0zDnhtAMGQIJfT';

  const handleGitHubAuth = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${gitHubClientID}`
    );
  };

  return (
    <Button sx={{ mt: 3, mb: 2 }} onClick={handleGitHubAuth}>
      Login with GitHub
    </Button>
  );
};

export default GitHubButton;
