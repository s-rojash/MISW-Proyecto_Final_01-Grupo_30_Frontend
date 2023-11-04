export class Message {
  from: string;
  subject: string;
  content: string;

  constructor(from: string, subject: string, content: string) {
    this.from = from;
    this.subject = subject;
    this.content = content;
  }
}
