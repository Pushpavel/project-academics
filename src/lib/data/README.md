## Data Services 📂

Service classes that provides source and sink of data, 
hides database implementation and dependencies

### Guidelines

- ```./base``` -  utility or base interfaces & implementations
- ```./convert``` -  Firestore snapshot to custom model Converters (functions)
  - 🐵 Must only convert from one representation to another and never have dependencies or compute new values 
- ```./combine``` -  functions that maps multiple dependencies to custom model and computes fields
- ```./source``` -  services that makes queries to database and gets the data
- ```./sink``` - services that handles uploading data to database
