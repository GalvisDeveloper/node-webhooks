import { GithubIssuePayload, GithubStarPayload } from "../../../interfaces";



export class GithubService {

    constructor() { }


    onStar(payload: GithubStarPayload): string {

        const { action, repository, sender, starred_at } = payload;

        return `${sender.login} ${action} starred ${repository.full_name} ${starred_at ? `at ${starred_at} ` : ''}`;
    }


    onIssue(payload: GithubIssuePayload): string {

        const { action, repository, sender, issue } = payload;

        return `An issue was ${action} with the title: ${issue.title}`;
    }
}