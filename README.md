# sdk-assemblyscript-hashivault

retrieve Hashicorp Vault Secrets with your Blockless Functions.


## Authentication

authentication is included, but shouldn't be used in production.


## Use

update `bls.toml` to allow `hashicorp` hosted endpoints.

```
name = "hashi-test"
version = "1.0.0"

[deployment]
permission = "private"
nodes = 4
permissions = ["https://auth.hashicorp.com","https://api.cloud.hashicorp.com"]

[build]
dir = "build"
entry = "hashi-test_debug.wasm"
command = "npm run build:debug"

[build_release]
dir = "build"
entry = "hashi-test.wasm"
command = "npm run build:release"
```

Call into the SDK helpers to get secrets. 


```typescript
import { Console } from "as-wasi/assembly";
import { getAuthToken } from "@blocklessnetwork/hashi-vault/getAuthToken";
import { getSecret } from "@blocklessnetwork/hashi-vault/getSecret";

// get access token.
// this is example only
// should not be done in production
// functions should only get access token from the caller
const hcpClientId = "";
const hcpClientSecret =
  "";

let authToken = getAuthToken(hcpClientId, hcpClientSecret);
if (authToken != null) {
  // get secret from the vault
  let OrgId = "";
  let ProjId = "";
  let AppName = "";
  let SecretKey = "";

  let secret = getSecret(
    OrgId,
    ProjId,
    AppName,
    SecretKey,
    authToken as string
  );
  Console.log(secret.toString());
}

```


