import { UserManagementComponent } from './user-management.component';

export function main() {
  describe('User Management Component', () => {
    let componentUnderTest: UserManagementComponent;
    beforeEach(() => {
      componentUnderTest = new UserManagementComponent();
    });

    it('creates instance of UserManagementComponent', () => {
      expect(componentUnderTest instanceof UserManagementComponent).toBeTruthy();
    });
  });
}
