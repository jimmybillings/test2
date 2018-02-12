import * as ts from "typescript";

export class SourceParser {
  private _className: string = 'SomeClass';
  private _constructorParameterCount: number = 3;

  constructor(private sourceFilename: string) {
    this.parse();
  }

  public get className(): string {
    return this._className;
  }

  public get constructorParameterCount(): number {
    return this._constructorParameterCount;
  }

  private parse(): void {
    const program: ts.Program = ts.createProgram([this.sourceFilename], {});
    const sourceFile: ts.SourceFile = program.getSourceFile(this.sourceFilename);
    const checker: ts.TypeChecker = program.getTypeChecker();

    // Walk the source file's tree to search for classes
    // We'll use the FIRST class we find in the file (hopefully there is just one),
    // and its FIRST constructor (again, hopefully there is just one).
    ts.forEachChild(sourceFile, node => {
      // Skip non-exported nodes.
      if (!this.isNodeExported(node)) return false;

      // Skip everything but class declarations.
      if (node.kind !== ts.SyntaxKind.ClassDeclaration) return false;

      const symbol: ts.Symbol =
        checker.getSymbolAtLocation((<ts.ClassDeclaration>node).name);

      this._className = symbol.getName();

      this._constructorParameterCount =
        checker
          .getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)
          .getConstructSignatures()[0]
          .parameters
          .length;

      // Found a class, so stop iterating.
      return true;
    });
  }

  private isNodeExported(node: ts.Node): boolean {
    return (node.flags & ts.NodeFlags.ExportContext) !== 0 ||
      (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);
  }
}
