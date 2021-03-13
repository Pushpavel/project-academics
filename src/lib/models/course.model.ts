export interface Course{
    courseId : String 
    CourseName : String 
}

export interface CourseCollection{
    id?:String
    title : String
    courses : Course[] 
}