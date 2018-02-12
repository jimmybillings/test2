import {
  Component, Input, Output, ViewChild,
  EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { FormFields } from '../../shared/interfaces/forms.interface';
import { WzFormComponent } from '../../shared/modules/wz-form/wz.form.component';
import { Capabilities } from '../../shared/services/capabilities.service';
import { SubclipMarkers } from '../../shared/interfaces/subclip-markers';
import { AppStore } from '../../app.store';
import { Asset } from '../../shared/interfaces/common.interface';

@Component({
  moduleId: module.id,
  selector: 'asset-save-subclip',
  templateUrl: 'asset-save-subclip.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AssetSaveSubclipComponent {
  @Input() config: any;
  @Input() public userCan: Capabilities;
  @Input() asset: Asset;
  @Input() activeCollectionName: string;
  @Input() subclipMarkers: SubclipMarkers;
  @Output() onAddSubclipToCart: EventEmitter<null> = new EventEmitter<null>();
  @Output() ontoggleSubclipPanel: EventEmitter<null> = new EventEmitter<null>();

  public showAssetSaveSubclip: boolean;
  public serverErrors: any;
  public formItems: Array<any> = [];

  @ViewChild(WzFormComponent) private wzForm: WzFormComponent;

  constructor(private store: AppStore, private changeDetector: ChangeDetectorRef) { }

  public addSubclipToActiveCollection(comment: any): void {
    this.store.dispatch(factory => factory.activeCollection.addAsset(this.asset, this.subclipMarkers));
    this.clearAndClose();
  }

  public addSubclipToCart(): void {
    this.onAddSubclipToCart.emit();
    this.clearAndClose();
  }

  public clearAndClose(): void {
    this.formItems = this.clearForm();
    this.wzForm.resetForm();
    this.changeDetector.markForCheck();
    this.ontoggleSubclipPanel.emit();
  }

  private clearForm() {
    return this.formItems
      .map((field: FormFields) => {
        field.value = '';
        return field;
      });
  }

  private error(error: any) {
    this.serverErrors = error.json();
    this.changeDetector.markForCheck();
  }
}
