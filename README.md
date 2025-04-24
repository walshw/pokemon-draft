# Pokemon Draft
1. Adjust the ip addresses marked with x's in socket-server/ and webapp/ .env files

Running these commands in the pokemon-draft/ directory will prevent changes from being tracked by git:
- git update-index --skip-worktree socket-server/.env
- git update-index --skip-worktree webapp/.env


2. Run `npm run install` in the pokemon-draft/ root directory to start installs for socket-server/ and webapp/

3. Run `npm run start` in the root directory to start the application stack!
