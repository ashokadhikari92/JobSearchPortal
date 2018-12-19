import { Action } from "@ngrx/store";
import { SeekerProfile } from "./../profile.model";
import * as ProfileActions from "./profile.actions";

export interface State {
  profile: SeekerProfile;
}

const profile = JSON.parse(localStorage.getItem("seeker_profile"));
let newProfile = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  educationLevel: '',
  latestJobLevel: '',
  workExperience: '',
  country: '',
  location: '',
  skillSet: [],
  linkedinProfile: '',
  resume: ''
};
if (profile){
  newProfile = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
    educationLevel: profile.educationLevel,
    latestJobLevel: profile.latestJobLevel,
    workExperience: profile.workExperience,
    country: profile.country,
    location: profile.location,
    skillSet: profile.skillSet.map(skill => skill),
    linkedinProfile: profile.linkedinProfile,
    resume: profile.resume
  };
}
const initialState: State = {
  profile: newProfile
};

export function seekerProfileReducer(
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
