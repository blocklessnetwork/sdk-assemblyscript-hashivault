import { Client, ClientOptions } from "@blockless/sdk/assembly/http";

export function getSecrets(
  hcpToken: string,
  hcpOrgId: string,
  hcpProjId: string,
  appName: string
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const secretsUrl = `https://api.cloud.hashicorp.com/secrets/2023-06-13/organizations/${hcpOrgId}/projects/${hcpProjId}/apps/${appName}/secrets`;

    let secretsHeaders: Map<string, string> = new Map();
    secretsHeaders.set("Authorization", `Bearer ${hcpToken}`);

    let secretsClientOptions: ClientOptions = new ClientOptions(
      secretsUrl,
      secretsHeaders
    );

    let secretsClient: Client = new Client(secretsClientOptions);

    let secretsResponse = secretsClient.get("");

    secretsResponse
      .then((secretsResult) => {
        if (secretsResult.statusCode === 200) {
          resolve(secretsResult.body.toString());
        } else {
          reject(
            new Error(
              `Failed to retrieve secrets from HashiCorp Vault: ${secretsResult.statusCode}`
            )
          );
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
