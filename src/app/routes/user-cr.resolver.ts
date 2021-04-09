import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, Router
} from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {paramMapToObj} from './routing.helper';
import {CourseService} from '@service/course.service';
import {UserService} from '@service/user.service';
import {DocumentService} from '@service/document.service';
import {filter, map, switchMap, take, tap} from 'rxjs/operators';
import {CourseRaw, UserCourseRelation} from '@lib/models/course.model';
import {StatEntryRaw} from '@lib/models/document/document-stat.model';
import {AcademicUser} from '@lib/models/user.model';
import {elseRedirectTo, thenMap, elseSwitchMap} from './routing.pipes';

export interface UserCrData {
  userCR: UserCourseRelation,
  course: CourseRaw,
  stat?: StatEntryRaw
}

@Injectable({
  providedIn: 'root'
})
export class UserCrResolver implements Resolve<UserCrData> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const params = paramMapToObj(route.paramMap);

    if (!params.semId || !params.courseCode)
      throw new Error('UserCrResolver could not find semId or courseCode in url');

    return combineLatest([this.user, this.courseService.getCourse(params.semId, params.courseCode)])
      .pipe(
        switchMap(([user, course]) => {

          if (!user)
            throw new Error('UserCrResolver called with un-authenticated user');

          const userCR = buildUserCR(user, course);
          let stat: StatEntryRaw;

          // authGuard like pattern
          return of(!!(userCR.isFaculty || userCR.isHod || userCR.isStudent)) // is user related to course
            .pipe(
              elseRedirectTo('404'),
              thenMap(() => !params.documentId || userCR.isFaculty || !userCR.isHod && !userCR.isExamCell), // is private check not needed
              elseSwitchMap(() =>
                this.documentService.getStat(params).pipe(
                  tap(_stat => stat = _stat),
                  map(stat => stat?.status != 'private') // is not private document
                )
              ),
              elseRedirectTo('404'),
              // thenMap(() => userCR.isStudent), // is StudentEntry Check required
              // TODO: verify whether student is enrolled in course
              map(activate => {
                if (activate == true) return {userCR, course, stat};
                this.router.navigate([activate as string]);
                return null;
              })
            );
        }),
        filter(data => data != null),
        take(1),
      );
  }

  constructor(
    private documentService: DocumentService,
    private courseService: CourseService,
    private user: UserService,
    private router: Router,
  ) {
  }
}

function buildUserCR(user: AcademicUser, course: CourseRaw): UserCourseRelation {
  return {
    isFaculty: user.isFaculty && user.uid == course.facultyId,
    isHod: !!user.isHod && user.isHod in course.dept,
    isStudent: user.isStudent,
  };
}
