export class AlertMessage {
  constructor(public type: string, public text: string) {}
}

export type AlertMessageList = Array<AlertMessage>;
