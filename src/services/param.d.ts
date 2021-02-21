import type { analyticsdata_v1alpha } from 'googleapis';

export namespace Params {
  export type LoginInput = {
    username: string;
    password: string;
  }

  export enum UserStatus {
    enabled = 'enabled',
    disabled = 'disabled',
  }
  export type DeleteHobby = {
    id: string;
  }

  export type CreateHobby = {
    value: string;
    isValid: boolean;
  }

  export type UpdateHobby = {
    id: string;
    value: string;
    isValid: boolean;
  }

  export type DeleteQuestion = {
    id: string;
  }

  export type CreateQuestion = {
    content: string;
    color: string;
    textColor: string;
    gradient?: string[];
  }

  export type UpdateQuestion = {
    id: string;
    content?: string;
    color?: string;
    textColor?: string;
    gradient?: string[];
  }

  export type DeleteQNA = {
    id: string;
  }

  export type CreateQNA = {
    question: string;
    answer: string;
  }

  export type UpdateQNA = {
    id: string;
    question: string;
    answer: string;
  }

  export type NotificationInput = {
    title: string;
    subtitle: string;
    content: string;
    image: File;
  }
  export type QueryReportGoogleAnalytic = {
    startDate?: Date;
    endDate?: Date;
    metrics?: analyticsdata_v1alpha.Schema$Metric[];
    dimensions?: analyticsdata_v1alpha.Schema$Dimension[];
    orderBy?: any;
    filter?: any;
  }

  export type CreatePostCategory = {
    value: string;
    color: string;
  }

  export type UpdatePostCategory = {
    id: string;
    value: string;
    color: string;
  }
}
