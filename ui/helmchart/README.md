## Kai: Helm Deployments

#### Openshift Production Deployment

1. Navigate to the UI directory

`$ cd ui/`

2. Login to Openshift. If logging in to the online console, you can select your username in the top right corner and use the 'Copy Login Command' feature to paste in to your terminal.

`$ oc login --token [TOKEN] --server [SERVER]`

3. Create a new project or select an existing one.

New Project: `$ oc new-project [PROJECT_NAME]`
(Optional: append a project display name and/or description `--display-name=[DISPLAYNAME] --description=[DESCRIPTION]`)

Existing Project: `$ oc project [PROJECT_NAME]`

4. Use the helmchart in ./ui directory to deploy Kai to Openshift.

`$helm install [NAME] helmchart`

(Optional: supply overrides with flags [`--set key=value`] or file `-f [FILE_NAME].yaml`)

#### Dev Deployment With Mock Kai API

