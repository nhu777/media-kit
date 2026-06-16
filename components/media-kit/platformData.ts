import type { Platform } from './shared';

export interface AgeBreakdown {
  percent: number;
  range: string;
}

export interface LocationRanking {
  rank: number;
  label: string;
  percent: string;
}

export type LocationTab = 'cities' | 'countries' | 'states';

export interface GenderBreakdownItem {
  label: string;
  percent: number;
  color: string;
}

export interface AudienceStats {
  gender: string;
  averageAge: string;
  topLocation: string;
  genderBreakdown: GenderBreakdownItem[];
  ageBreakdown: AgeBreakdown[];
  locations: Record<LocationTab, LocationRanking[]>;
}

export interface SocialStats {
  totalLabel: string;
  total: string;
  impressionsLabel: string;
  impressions: string;
  growthLabel: string;
  growth: string;
  growthPositive: boolean;
  engagementRate: string;
  engagementGrowth: string;
  engagementGrowthPositive: boolean;
  averageEmv: string;
  postingFrequencyPrimary: string;
  postingFrequencySecondary: string;
}

export interface PlatformStats {
  audience: AudienceStats;
  social: SocialStats;
}

export const PLATFORM_STATS: Record<Platform, PlatformStats> = {
  instagram: {
    audience: {
      gender: '56% female',
      averageAge: '28-36',
      topLocation: 'New York, USA',
      genderBreakdown: [
        { label: 'Female', percent: 56, color: '#a9b791' },
        { label: 'Male', percent: 41, color: '#7d9753' },
        { label: 'Other', percent: 3, color: '#202a0f' },
      ],
      ageBreakdown: [
        { percent: 65, range: '13-17' },
        { percent: 35, range: '18-24' },
        { percent: 24, range: '25-34' },
      ],
      locations: {
        cities: [
          { rank: 1, label: '🇺🇸 New York', percent: '10%' },
          { rank: 2, label: '🇨🇦 Kitchener', percent: '8%' },
          { rank: 3, label: '🇺🇸 Atlanta', percent: '6%' },
        ],
        countries: [
          { rank: 1, label: '🇺🇸 United States', percent: '62%' },
          { rank: 2, label: '🇨🇦 Canada', percent: '14%' },
          { rank: 3, label: '🇬🇧 United Kingdom', percent: '9%' },
        ],
        states: [
          { rank: 1, label: 'New York', percent: '18%' },
          { rank: 2, label: 'California', percent: '15%' },
          { rank: 3, label: 'Texas', percent: '11%' },
        ],
      },
    },
    social: {
      totalLabel: 'Total followers',
      total: '145.8k',
      impressionsLabel: 'Impressions',
      impressions: '2.3M',
      growthLabel: 'Follower growth',
      growth: '+8.2%',
      growthPositive: true,
      engagementRate: '3.8%',
      engagementGrowth: '+12.5%',
      engagementGrowthPositive: true,
      averageEmv: '$500',
      postingFrequencyPrimary: '4-5x',
      postingFrequencySecondary: 'per week',
    },
  },
  tiktok: {
    audience: {
      gender: '62% female',
      averageAge: '18-24',
      topLocation: 'Los Angeles, USA',
      genderBreakdown: [
        { label: 'Female', percent: 62, color: '#a9b791' },
        { label: 'Male', percent: 35, color: '#7d9753' },
        { label: 'Other', percent: 3, color: '#202a0f' },
      ],
      ageBreakdown: [
        { percent: 72, range: '18-24' },
        { percent: 22, range: '25-34' },
        { percent: 15, range: '35-44' },
      ],
      locations: {
        cities: [
          { rank: 1, label: '🇺🇸 Los Angeles', percent: '14%' },
          { rank: 2, label: '🇺🇸 Chicago', percent: '9%' },
          { rank: 3, label: '🇺🇸 Miami', percent: '7%' },
        ],
        countries: [
          { rank: 1, label: '🇺🇸 United States', percent: '58%' },
          { rank: 2, label: '🇲🇽 Mexico', percent: '12%' },
          { rank: 3, label: '🇧🇷 Brazil', percent: '8%' },
        ],
        states: [
          { rank: 1, label: 'California', percent: '22%' },
          { rank: 2, label: 'Texas', percent: '13%' },
          { rank: 3, label: 'Florida', percent: '10%' },
        ],
      },
    },
    social: {
      totalLabel: 'Total followers',
      total: '892k',
      impressionsLabel: 'Video views',
      impressions: '18.4M',
      growthLabel: 'Follower growth',
      growth: '+15.3%',
      growthPositive: true,
      engagementRate: '5.2%',
      engagementGrowth: '+18.1%',
      engagementGrowthPositive: true,
      averageEmv: '$750',
      postingFrequencyPrimary: '5-6x',
      postingFrequencySecondary: 'per week',
    },
  },
  youtube: {
    audience: {
      gender: '48% female',
      averageAge: '25-34',
      topLocation: 'New York, USA',
      genderBreakdown: [
        { label: 'Female', percent: 48, color: '#a9b791' },
        { label: 'Male', percent: 49, color: '#7d9753' },
        { label: 'Other', percent: 3, color: '#202a0f' },
      ],
      ageBreakdown: [
        { percent: 45, range: '18-24' },
        { percent: 38, range: '25-34' },
        { percent: 22, range: '35-44' },
      ],
      locations: {
        cities: [
          { rank: 1, label: '🇺🇸 New York', percent: '12%' },
          { rank: 2, label: '🇬🇧 London', percent: '8%' },
          { rank: 3, label: '🇨🇦 Toronto', percent: '6%' },
        ],
        countries: [
          { rank: 1, label: '🇺🇸 United States', percent: '54%' },
          { rank: 2, label: '🇬🇧 United Kingdom', percent: '16%' },
          { rank: 3, label: '🇨🇦 Canada', percent: '11%' },
        ],
        states: [
          { rank: 1, label: 'California', percent: '16%' },
          { rank: 2, label: 'New York', percent: '14%' },
          { rank: 3, label: 'Illinois', percent: '9%' },
        ],
      },
    },
    social: {
      totalLabel: 'Total subscribers',
      total: '42.3k',
      impressionsLabel: 'Views',
      impressions: '1.2M',
      growthLabel: 'Subscriber growth',
      growth: '+6.4%',
      growthPositive: true,
      engagementRate: '4.1%',
      engagementGrowth: '+9.8%',
      engagementGrowthPositive: true,
      averageEmv: '$320',
      postingFrequencyPrimary: '2-3x',
      postingFrequencySecondary: 'per week',
    },
  },
};
