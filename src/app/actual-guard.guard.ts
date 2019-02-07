import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PlanService } from './services/plan.service';

@Injectable({
  providedIn: 'root'
})
export class ActualGuardGuard implements CanActivate {
  constructor(private planService: PlanService) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.planService.getActualPlan() !== undefined) {
      return true;
    } else {
      this.planService.navigatePage('/home');
      return false;
    }
  }
}
