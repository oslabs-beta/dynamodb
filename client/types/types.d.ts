export interface ProvisionFormData {
  //removed AWS account name for MVP as a stretch feature we would like users to have the option to switch between accounts
  //aWSAccountName: string;
  tableName: string;
  startTime: Date | string | null;
  endTime: Date | string | null;
}

export interface DataStatsProps {
  provisionData: ProvisionFormData;
  currentMetrics: Metrics | null;
}

export interface ReportsProps {
  timeFrame?: string;
}

export interface StatusBoxProps {
  onSubmit: (data: ProvisionFormData) => void;
}

export interface GraphContainerProps {
  currentProvision: ProvisionFormData | null;
  currentMetrics: Metrics | null;
}

export interface RcuGraphContainerProps {
  provisionData: ProvisionFormData;
  //check graph metrics type
  metrics: any;
}

export interface WcuGraphContainerProps {
  provisionData: ProvisionFormData;
  //check graph metrics type
  metrics: any;
}

export interface BedrockAnalysisProps {
  currentProvision: ProvisionFormData | null;
  currentMetrics: Metrics | null;
}

export interface TitleProps {
  children?: React.ReactNode;
}

export interface LoginData {
  email: string
  password: string
}

export interface AWSBody {
  AWSAccountName: string
  AWSAccessKey: string
  AWSSecretKey: string
  Region: string
}

export interface Metrics {
  ConsRCU: Array
  ConsWCU: Array
  ProvRCU: number
  ProvWCU: number
}

export interface PastAnalysis {
  ConsRCU: Array
  ConsWCU: Array
  ProvRCU: number
  ProvWCU: number
  bedrockAnalysis: string
}