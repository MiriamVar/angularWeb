import { Group } from './group';

export class User {
  constructor(
    public name: string,
    public email: string,
    public id?: number,
    public lastLogin?: Date,
    public password: string = '',
    public active: boolean = true,
    public groups: Array<Group> = []
  ) {}

  getSkLastLogin(): string {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeStyle: 'long',
      hour: '2-digit',
      minute: '2-digit'
    };
    console.log(this.lastLogin);
    return this.lastLogin
      ? this.lastLogin.toLocaleTimeString('sk-SK', options)
      : 'nikdy';
  }
}
