 Setup Instructions

1. Clone the repository:


git clone https://github.com/yourusername/your-repo.git
cd your-repo
`

2. Build the Docker image for the Node.js app:


docker build -t your-dockerhub-username/your-app:latest .


3. Push the image to Docker Hub (or your container registry):


docker push your-dockerhub-username/your-app:latest




 Deploy MongoDB on Kubernetes

1. Apply persistent storage for MongoDB:


kubectl apply -f k8s/mongo-pv-pvc.yaml


2. Create Kubernetes secret for MongoDB user credentials:


kubectl apply -f k8s/mongo-secret.yaml


3. Deploy MongoDB:


kubectl apply -f k8s/mongo-deployment.yaml


4. Verify MongoDB pod and service are running:


kubectl get pods
kubectl get svc




 Deploy Application on Kubernetes

1. Update `app-deployment.yaml` if needed to use your Docker image.

2. Deploy the Node.js application:


kubectl apply -f k8s/app-deployment.yaml


3. Verify app pod and service are running:


kubectl get pods
kubectl get svc




 Access the Application

Since NodePort services may not be exposed externally depending on your cluster setup, use port-forwarding to access the app locally:


kubectl port-forward pod/<app-pod-name> 8080:3000


Now the API is accessible at:


http://localhost:8080




 Testing with Postman

Use Postman to interact with the API:

 GET all notes: `GET http://localhost:8080/notes`
 Create a note:


POST http://localhost:8080/notes
Content-Type: application/json

{
  "title": "Sample Note",
  "content": "This is a test note"
}


 Update a note:


PUT http://localhost:8080/notes/<note_id>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}


 Delete a note:


DELETE http://localhost:8080/notes/<note_id>




 Troubleshooting

 If port-forwarding fails, ensure the pod is running (`kubectl get pods`).
 Check logs for errors: `kubectl logs pod/<app-pod-name>`
 Ensure your app listens on the port forwarded (`app.js` should have `app.listen(3000)`).
 Use localhost and port-forwarding for local testing if NodePort isn’t accessible.

