#!/bin/bash
# variable for session name
SESH="mern-task-app"
# check already exists
tmux has-session -t $SESH 2>/dev/null

# otherwise create new session
if [ $? != 0 ]; then
  tmux new-session -d -s $SESH -n "frontend"
  tmux send-keys -t $SESH:frontend "cd ~/my/book/mern/Task-MERN/frontend" C-m
  tmux send-keys -t $SESH:frontend "nvim ." C-m

  tmux new-window -t $SESH -n "backend"
  tmux send-keys -t $SESH:backend "cd ~/my/book/mern/Task-MERN/backend" C-m
  tmux send-keys -t $SESH:backend "nvim ." C-m

  tmux select-window -t $SESH:frontend
fi

#open book
ebook-viewer ~/book/now/mern_task.epub >/dev/null 2>&1 &
# otherwise reattach to it
tmux attach-session -t $SESH
