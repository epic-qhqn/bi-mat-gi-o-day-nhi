# TEAM CONCURRENT GIT PROTOCOL & AUTO-SYNC RULE

This rule must be followed on EVERY user interaction and request without exception.

## 1. At Start of Every Request (Pre-Task)
- Run `git fetch --all --prune` to check for new commits/branches pushed by team members.
- Run `git status` and inspect divergence from upstream.
- If upstream or other team branches have new commits:
  - If working directory has changes, safely stash them (`git stash`), pull/rebase cleanly, then `git stash pop` and resolve conflicts seamlessly.
  - If on `main` and creating a new feature or working in parallel, branch off cleanly or keep branches synchronized.
  - Ensure zero merge conflict markers or syntax errors exist before starting work on the user's request.

## 2. At Completion of Every Request (Post-Task)
- Verify code integrity (JS syntax check, CSS balance, responsive/runtime checks).
- Re-check remote (`git fetch origin`) to catch any concurrent commits made by teammates during the session.
- Harmonize/merge if new commits arrived.
- Commit cleanly and push so the team always has the latest stable state.

## 3. Silent & Token-Optimized Protocol
- Perform all Git synchronization and harmonization silently.
- Do NOT output verbose explanations or command outputs regarding routine Git operations.
- Save maximum tokens and deliver concise, polished answers.
