import { Client, ClientOptions } from "@blockless/sdk/assembly/http";
import { JSON } from "@blockless/sdk/assembly/json";

export function getSecret(
  orgId: string,
  projId: string,
  appName: string,
  secretKey: string,
  hcpToken: string
): JSON.Obj {
  let headers: Map<string, string> = new Map();
  headers.set("Authorization", `Bearer ${hcpToken}`);

  let clientOptions: ClientOptions = new ClientOptions(
    "https://api.cloud.hashicorp.com",
    headers
  );

  let client: Client = new Client(clientOptions);
  let url = `/secrets/2023-06-13/organizations/${orgId}/projects/${projId}/apps/${appName}/open/${secretKey}`;

  let response = client.get(url);

  return response;
}
