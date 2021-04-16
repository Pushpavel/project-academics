## Scenarios 🧪

contains source files and exported firestore and auth data from firebase emulators to test specific scenarios

### Usage

- edit ```package.json > scripts.start-dev``` and change ```--import=./firebase/functions/scenario/generated/*``` where *
  is the scenario to use
- execute ```npm run start-dev``` or ```npm run start```

### Generating a Scenario

- uncomment code that exports generateScenario https callable of the generating scenario
  in ```firebase/functions/src/index.ts```
- edit ```package.json > scripts.scenario``` and change the path ```./firebase/functions/scenarios/generated/*``` where *
  is the scenario to use
- call ```generateScenario``` cloud function somewhere from angular project
- delete ```./firebase/functions/scenarios/generated/*``` where *
  is the scenario to use folder
- execute ``npm run scenario``
- exit terminal after the generateScenario cloud function is executed
