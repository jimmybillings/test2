import { RouterModule } from '@angular/router';

import { PrivacyPolicyComponent } from './privacy-policy.component';
import { PRIVACY_POLICY_ROUTES } from './privacy-policy.routes';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { PrivacyPolicyGuard } from './services/privacy-policy.guard';
import { PrivacyPolicyResolver } from './services/privacy-policy.resolver';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(PRIVACY_POLICY_ROUTES)],
  declarations: [PrivacyPolicyComponent],
  exports: [PrivacyPolicyComponent],
  providers: [PrivacyPolicyResolver, PrivacyPolicyGuard]
})
export class PrivacyPolicyModule { }
