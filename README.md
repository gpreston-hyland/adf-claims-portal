# Arugumentum Claims Portal ADF application

Allows user to 'Start a claim' and upload documents. ***Runs on port 4300,*** rather than the default of 4200. 

## Quick start

```sh
npm install
npm start
```

## Supported ADF component libraries

This project has all the existing ADF component libraries already pre-configured.

**The ADF Process Services Cloud API services don't appear to have a method to 'easily' get the variables of a process.** I extended
the `ProcessCloudService` to add a new method `getProcessInstanceVariablesById()`. See [my-process-cloud.service.ts](src/app/services/my-process-cloud.service.ts).

The main focus of the project is:

- Simple Portal for initiating a Commercial Auto Claim

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4300/`. The app will automatically reload if you change any of the source files.

### General configuration

1. APA on the SSE instance requires using OAUTH authentication. The setting `"authType": "OAUTH"` must appear in the `app.config.json`.
1. APA is built on a verison of Activiti which needs the following stanza, also in `app.config.json` to contain the list of applications the ADF app will be referencing.

    ```json
      "alfresco-deployed-apps": [
        {"name": "apa-app-name-1"},
        {"name": "apa-app-name-2"}
      ]
      ```

1. The [global-values.service](src/app/services/global-values.service.ts) contains values shared among components. Names of APA process/tasks/etc. are there so I don't have to update multiple places when testing.

### Proxy settings

The template provides certain proxy settings to allow running web application locally without CORS setup.
You can find details in the `proxy.conf.json` file.

List of URLs being proxied:

- `/` -> `https://sse.dev.alfrescocloud.com`
- `/auth/realms/myrealm` -> `https://sse.dev.alfrescocloud.com`
- `/auth/admin/realms/myrealm` -> `https://sse.dev.alfrescocloud.com`
- `/alfresco` -> `https://sse.dev.alfrescocloud.com`

## Code scaffolding

Run `ng generate component component-name -m app.module` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
