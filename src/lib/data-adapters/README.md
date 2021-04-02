## Data Adapters 🔌

Provides Abstraction over source and sink of data. UI Components should not be aware of any database implementation so
that the implementation can be replaced gracefully

### Guidelines

- ```./base``` - contains utility or base interfaces & implementations
- ```./convert``` - contains Firestore snapshot to custom model Converters (functions)
  - should only work with constants and the provided snapshot
- ```./combine``` - contains functions that maps multiple dependencies to custom model
- ```foo.adapter.ts``` - contains functions that either take ```Sink``` or returns Data from particular location in DB
