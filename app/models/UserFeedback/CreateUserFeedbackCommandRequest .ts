export interface CreateUserFeedbackCommandRequest {
  title: string;
  message: string;
  userFeedbackEnum: UserFeedbackEnum;
}
export enum UserFeedbackEnum {
  Suggestion = 0,
  Criticism = 1,
  BugReport = 2,
  FeatureRequest = 3,
  Other = 4,
}
export const UserFeedbackEnumLabels: { [key in UserFeedbackEnum]: string } = {
  [UserFeedbackEnum.Suggestion]: "Öneri",
  [UserFeedbackEnum.Criticism]: "Eleştiri",
  [UserFeedbackEnum.BugReport]: "Hata Bildirimi",
  [UserFeedbackEnum.FeatureRequest]: "Özellik Talebi",
  [UserFeedbackEnum.Other]: "Diğer",
};
