import { environment } from "src/environments/environment";

export class EndPoint {

    public static uriBase(url: string): string {
        return environment.urlApi + url;
    }

}