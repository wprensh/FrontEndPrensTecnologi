import { InjectionToken } from '@angular/core';

import { environment } from '../../../environments/environment';

/** URL base del backend .NET; vacía cuando el sitio se publica sin API. */
export const API_URL = new InjectionToken<string>('API_URL', { providedIn: 'root', factory: () => environment.apiUrl });
