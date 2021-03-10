# ProjectAcademics 📚

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3.
## Architecture 🔥
### 📦 NgModules
- [ ] 🏡 HomeModule
  - [ ] CourseGridComponent
    - inputs = Course[], Title, enable_pac_download
    - routes to corresponding course page on click
    - pac_download button calls downloadPAC 
  - [ ] HomePageComponent
  - [ ] BatchGridsComponent
    - List of CourseGridComponent with enable_pac_download flag set
    - inputs = dictionary of { Title : Course[] } 
- [ ] 📚 CourseModule
  - [ ] CollapsingCoursePanelComponent
    - Wraps TopBarComponent
- [ ] 🔏 AuthModule
- [ ] 📑 ResultModule
- [ ] 📁 ArchiveModule
- [ ] 🔳 TablePagesModule
- [ ] 👩🏻‍🎓 GradeCriteriaModule
- [ ] 🤝🏻 SharedModule
  - [ ] TabBarComponent
  - [ ] TopBarComponent
    - changes with url
  - [ ] DataCardComponent
    - inputs = Title, dictionary of { heading : value }, ngContent
    - place ngContent at last 
### 🍱 Local Libraries
- [ ] sheets
- [ ] models
  - [ ] Course
- [ ] functions
  - [ ] downloadPAC (courses : Course[])
- [ ] utils
  - [ ] getStringSimilarities (ids : string[], minLength : number) : string[]
    - groups ids that start with same substring with @param minLength and returns the substring of each group
    - used to optimize firestore query (reduces number of queries needed)
    - ex = ['CS19B1042','CS19B1009','ME17B1052'] returns ['CS19B10','ME17B1052]
### 👷🏻‍♂️ Core Services
- [ ] UserService
- [ ] CourseService
