import { Client, ClientOptions } from "@blockless/sdk/assembly/http";
import { JSON } from "@blockless/sdk/assembly/json";

export class AuthToken {
  audience: string;
  grantType: string;
  clientId: string;
  clientSecret: string;

  constructor(
    audience: string,
    grantType: string,
    clientId: string,
    clientSecret: string
  ) {
    this.audience = audience;
    this.grantType = grantType;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }
}

export function getAuthToken(
  clientId: string,
  clientSecret: string,
  audience: string = "https://api.hashicorp.cloud",
  grantType: string = "client_credentials"
): String | null {
  let payload: JSON.Obj = new JSON.Obj();
  payload.set("audience", audience);
  payload.set("grant_type", grantType);
  payload.set("client_id", clientId);
  payload.set("client_secret", clientSecret);

  let headers: Map<string, string> = new Map();
  headers.set("Content-Type", "application/json");

  let clientOptions: ClientOptions = new ClientOptions(
    "https://auth.hashicorp.com",
    headers
  );

  let client: Client = new Client(clientOptions);

  let response = client.post("/oauth/token", payload.toString());

  let atString = "";
  let kvs = response.valueOf();
  if (kvs != null) {
    let accessToken = kvs.get("access_token");
    if (accessToken != null) {
      atString = accessToken.toString();
    }
  }

  return atString;
}
