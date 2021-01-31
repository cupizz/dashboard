import { GOOGLE_ANALYTICS_API } from '@/constant';
import HttpClient from '@/utils/HttpClient';
import { stringify } from 'qs';
import type { Responses } from './response';

export class GoogleAnalyticsService {
  public static async getCity(): Promise<
    Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>
  > {
    return HttpClient.get<Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>>(
      `${GOOGLE_ANALYTICS_API}/city`,
    );
  }
  public static async getCountry(): Promise<
    Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>
  > {
    return HttpClient.get<Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>>(
      `${GOOGLE_ANALYTICS_API}/country`,
    );
  }

  public static async getPlatform(): Promise<
    Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>
  > {
    return HttpClient.get<Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>>(
      `${GOOGLE_ANALYTICS_API}/platform`,
    );
  }

  public static async getGender(): Promise<
    Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>
  > {
    return HttpClient.get<Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>>(
      `${GOOGLE_ANALYTICS_API}/gender`,
    );
  }

  public static async getDeviceCategory(): Promise<
    Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>
  > {
    return HttpClient.get<Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>>(
      `${GOOGLE_ANALYTICS_API}/device/category`,
    );
  }

  public static async getSession(params: {
    startDate: number;
    endDate: number;
  }): Promise<Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>> {
    return HttpClient.get<Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>>(
      `${GOOGLE_ANALYTICS_API}/session_by_day?${stringify(params)}`,
    );
  }

  public static async getTimeLine(): Promise<
    Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>
  > {
    return HttpClient.get<Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse>>(
      `${GOOGLE_ANALYTICS_API}/timeline`,
    );
  }
}
