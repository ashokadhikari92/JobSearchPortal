import { Action } from '@ngrx/store';
import { SeekerProfile } from './../profile.model';

export const SAVE_ALL_DETAIL = 'SAVE_ALL';
export const UPDATE_ALL_DETAIL = 'UPDATE_ALL';

export class SaveAllDetail implements Action {
  readonly type = SAVE_ALL_DETAIL;

  constructor(public payload: SeekerProfile) {}
}

export class UpdateAllDetail implements Action {
  readonly type = UPDATE_ALL_DETAIL;

  constructor(public payload: SeekerProfile) {}
}

export type Actions = SaveAllDetail | UpdateAllDetail;
