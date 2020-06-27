import { Injectable } from '@angular/core';
import { Step } from '../models/step.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  private routes = ['start', 'set-player', 'waiting-for-players', 'game', 'winner'];
  private currentStep$ = new BehaviorSubject<Step>({ id: 0, completed: false });

  constructor(private router: Router) {
    this.handleSteps();
  }

  currentStep(): Observable<Step> {
    return this.currentStep$.asObservable();
  }

  completeCurrentStep() {
    const step: Step = { ...this.currentStep$.value, completed: true };
    this.currentStep$.next(step);
  }

  prevStep() {
    if (0 === this.currentStep$.value.id) {
      return;
    }
    const lastStep: Step = {
      id: this.currentStep$.value.id - 1,
      completed: false,
    };
    this.currentStep$.next(lastStep);
  }

  private handleSteps() {
    this.currentStep$.pipe(filter((step) => !!step)).subscribe((step) => {
      let route;
      if (step.completed) {
        this.nextStep();
        route = `/${this.routes[step.id + 1]}`;
      } else {
        route = `/${this.routes[step.id]}`;
      }
      this.router.navigate([route]);
    });
  }

  private nextStep() {
    const nextStep: Step = {
      id: this.currentStep$.value.id + 1,
      completed: false,
    };
    this.currentStep$.next(nextStep);
  }
}
