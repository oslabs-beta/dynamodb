export interface ProvisionFormData {
  //removed AWS account name for MVP as a stretch feature we would like users to have the option to switch between accounts
  //aWSAccountName: string;
  tableName: string;
  startTime: string | null;
  endTime: string | null;
}

export interface StatusBoxProps {
  onSubmit: (data: ProvisionFormData) => void;
}

export interface GraphContainerProps {
  currentProvision: ProvisionFormData | null;
}

export interface RcuGraphContainerProps {
  provisionData: ProvisionFormData;
  metrics: any;
}

export interface WcuGraphContainerProps {
  provisionData: ProvisionFormData;
  metrics: any;
}

<<<<<<< HEAD
export interface TotalTimeContainerProps {
  provisionData: ProvisionFormData;
  metrics: any;
=======
export interface BedrockAnalysisProps {
  currentProvision: ProvisionFormData | null;
  currentMetrics: any | null;
  // fetchAnalysis: () => Promise<any>;
}

export interface TitleProps {
  children?: React.ReactNode;
>>>>>>> 7a883519c8bd13b17368e7d56ed827d6e1314cb0
}
