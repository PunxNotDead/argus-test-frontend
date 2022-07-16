import {MatSnackBar} from '@angular/material/snack-bar';
import {Injectable} from '@angular/core';

@Injectable()
export default class ShortMessageService {
  constructor(private snackBar: MatSnackBar) {

  }

  showSuccess(message: string, action?: string, onAction?: () => void) {
    this.showMessage('success-message-container', message, action, onAction);
  }

  showError(error: string, action?: string, onAction?: () => void) {
    this.showMessage('error-message-container', error, action, onAction);
  }

  public showMessage(className: string, message: string, action?: string, onAction?: () => void) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      panelClass: className,
      duration: 5000
    });
  }
}
