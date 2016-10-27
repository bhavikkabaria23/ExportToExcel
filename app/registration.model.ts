export class Coach {
    _id: string;
    coachID: string;
    coachName: string;
    selected: boolean;
}
export class Image {
    name: string;
}
export class Registration {
    _id: string;
    dateOfApplication: Date;
    playerID: string;
    playerName: string;
    givenName: string;
    familyName: string;
    fFANumber: string;
    birthDate: Date;
    ageGroup: string;
    preferredPlayingPosition: number;
    gender: string;
    objectivesAmbitions: string;
    images: Image[];
    residentialAddress: string;
    homeNumber: string;
    mobileNumber: string;
    email: string;
    coaches: Coach[] = [];

    contactPerson1_id: string;
    contact1_personName: string;
    contact1_relationship: string;
    contact1_contactNumber: string;
    contact1_email: string;

    contactPerson2_id: string;
    contact2_personName: string;
    contact2_relationship: string;
    contact2_contactNumber: string;
    contact2_email: string;

    studyWorkDetails_id: string;
    schoolDetails: string;
    employementDetails: string;

    playingHistory_id: string;
    previousClub2016: string;
    previousClub2015: string;
    suspensionsDetails: string;
    injuriesDetails: string;

    footballAcademyDetails_id: string
    headCoachName: string;
    contactDetails: string;
    academicSessionPerWeekCount: number;
    arrangedBy: string;
    destination: string;
    purposeOfTrip: string;

    hide: Boolean = true;
}