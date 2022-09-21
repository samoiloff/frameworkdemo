export class TextUtils {
  static getResultText(isWin: boolean): string {
    return isWin ? "You Won!" : "You Lost.";
  }

  static getBalanceText(balance: number): string {
    return `Your balance: ${balance}`;
  }
}