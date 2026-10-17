import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

/** Peticiones que muestran su propio mensaje de error (por ejemplo, un formulario) y no necesitan el aviso global. */
export const HANDLES_OWN_ERRORS = new HttpContextToken<boolean>(() => false);

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!req.context.get(HANDLES_OWN_ERRORS)) {
        snackBar.open(`Error ${error.status}: no se pudo completar la petición`, 'Cerrar', { duration: 4000 });
      }
      return throwError(() => error);
    }),
  );
};
