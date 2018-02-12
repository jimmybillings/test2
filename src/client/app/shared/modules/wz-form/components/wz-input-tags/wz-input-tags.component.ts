import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'wz-input-tags',
  template: `<div class="mat-input-wrapper wz-tags">
                <ul *ngIf="tags.length > 0">
                  <li [ngClass]="{'ready-delete': checkBeforeDelete(tag)}" *ngFor="let tag of tags;">
                    {{tag}}
                    <a class="button delete" mat-icon-button (click)="delete($event, tag)">
                      <mat-icon>cancel</mat-icon>
                    </a>
                  </li>
                </ul>
                <ng-content></ng-content>
             </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class WzInputTagsComponent {
  @Input() fControl: FormControl;
  @Input() tags: Array<string> = [];
  private finalDelete: boolean = false;
  constructor(private ref: ChangeDetectorRef) { }

  public submit(e: any) {
    switch (e.code) {

      case 'Enter':
        let tag: string = e.target.value;
        if (!this.find(tag) && tag !== '' && this.tags.length <= 10) {
          this.create(tag);
        }
        e.target.value = '';
        e.preventDefault();
        this.ref.markForCheck();
        return;

      case 'Backspace':
        if (e.target.value === '') {
          if (this.finalDelete) {
            this.delete(false, this.tags[this.tags.length - 1]);
          } else {
            this.finalDelete = true;
          }
        }
        this.ref.markForCheck();
        return;

      default:
        this.finalDelete = false;
        this.ref.markForCheck();
        return;
    }
  }

  public checkBeforeDelete(tag: string): boolean {
    return (this.finalDelete && this.tags[this.tags.length - 1] === tag);
  }

  public delete($event = false, tagForDelete: string) {
    this.tags = this.tags.filter((tag) => tag !== tagForDelete);
    this.fControl.setValue(this.tags.toString());
    this.finalDelete = false;
  }

  private create(tag: string) {
    this.tags = this.tags.concat(tag);
    this.fControl.setValue(this.tags.toString());
  }

  private find(tagCandidate: string): boolean {
    return this.tags.filter((tag) => tag === tagCandidate).length > 0;
  }
}
