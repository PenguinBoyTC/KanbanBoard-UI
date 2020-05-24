# Use a lighter version of Node as a parent image
FROM node:current-slim
# Set the working directory to /KanbanBoard-UI
WORKDIR /KanbanBoard-UI
# copy package.json into the container at /KanbanBoard-UI
COPY package*.json /KanbanBoard-UI/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /KanbanBoard-UI
COPY . /KanbanBoard-UI/
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]