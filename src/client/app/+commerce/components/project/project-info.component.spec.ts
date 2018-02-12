import { ProjectInfoComponent } from './project-info.component';

export function main() {
  describe('Project Info Component', () => {
    let componentUnderTest: ProjectInfoComponent;

    beforeEach(() => {
      componentUnderTest = new ProjectInfoComponent();
    });

    it('has no testable functionality', () => {
      expect(true).toBe(true);
    });

  });
}
