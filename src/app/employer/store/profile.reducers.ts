import { Action } from "@ngrx/store";
import { EmployerProfile } from "./../profile.model";
import * as ProfileActions from "./profile.actions";

export interface State {
  profile: EmployerProfile;
}

const profile = JSON.parse(localStorage.getItem("employer_profile"));
let newProfile = {
  fullName: '',
  name: '',
  website: '',
  contactEmail: '',
  contactPhone: '',
  introduction: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
};
if (profile) {
  newProfile = {
    fullName: profile.fullName,
    name: profile.name,
    website: profile.website,
    contactEmail: profile.contactEmail,
    contactPhone: profile.contactPhone,
    introduction: profile.introduction,
    street: profile.street,
    city: profile.city,
    state: profile.state,
    zipCode: profile.zipCode
  };
}
const initialState: State = {
  profile: newProfile
};

export function employerProfileReducer(
  state: State = initialState,
  action: ProfileActions.Actions
) {
  switch (action.type) {
    case ProfileActions.SAVE_ALL_DETAIL:
      return {
        ...state,
        profile: action.payload
      };

    case ProfileActions.UPDATE_ALL_DETAIL:
      return {};

    default:
      return state;
  }
}
