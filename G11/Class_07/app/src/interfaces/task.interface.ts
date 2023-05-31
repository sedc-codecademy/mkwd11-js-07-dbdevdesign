export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum Status {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN PROGRESS',
  POSTPONED = 'POSTPONED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
}

export interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: number; // timestamp
  priority: Priority;
  status: Status;
}
