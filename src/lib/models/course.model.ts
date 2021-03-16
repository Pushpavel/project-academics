export interface Course{
    courseId : String 
    CourseName : String 
}

//Yet Extra data can be added
export interface CourseCollection{
    id?:String
    title : String
    courses : Course[] 
}