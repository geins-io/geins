
![Geins logo](./docs/public/logo/geins-logo-black.png)

[![core-badge-version]][core-npm-url] 
[![cms-badge-version]][cms-npm-url] 
[![crm-badge-version]][crm-npm-url]



# Geins SDK

Welcome to the Geins SDK Repository, a collection of tools and libraries designed to provide a seamless developer experience for Node.js applications.

## What is Geins?

Geins is a platform that enables developers to build and deploy applications quickly and easily. The Geins SDK provides a set of tools and libraries that help developers build applications faster, with less code and fewer bugs.

## Quick Start

To start developing with the Geins SDK, read the [Getting Started](https://sdk.geins.dev/getting-started/) guide.


## About this Repository

### Overview

The Geins SDK is organized as a monorepo, which means that multiple packages are housed within a single repository. This structure allows for easier management of interdependent packages, consistent versioning, and streamlined development workflows.


### Packages

This repository is a monorepo. The main directories are:

**packages/sdk/**: The packages, including:
  - `@geins/core`: Core functionality like channel management and GraphQL client.
  - `@geins/cms`: CMS-specific features, including menus and content areas.
  - `@geins/crm`: CRM features like user authentication and profile management.  
  - `@geins/types`: Type definitions for Geins SDK.

### Documentation

Find detailed guides, examples, and API references in the [docs/](./docs) directory or visit the [online documentation](https://sdk.geins.dev/).

## Contributing

We welcome contributions! Please follow our [contribution guidelines](CONTRIBUTING.md).

## License

Licensed under the MIT License. Check the [LICENSE](LICENSE.md) file for details.

[core-npm-url]: https://www.npmjs.com/package/@geins/core
[core-badge-version]: https://img.shields.io/npm/v/%40geins%2Fcore?style=for-the-badge&label=@geins/core


[cms-npm-url]: https://www.npmjs.com/package/@geins/cms
[cms-badge-version]: https://img.shields.io/npm/v/%40geins%2Fcms?style=for-the-badge&label=@geins/cms


[crm-npm-url]: https://www.npmjs.com/package/@geins/crm
[crm-badge-version]: https://img.shields.io/npm/v/%40geins%2Fcrm?style=for-the-badge&label=@geins/crm





    if (args.item) {
      vars.item = {
        skuId: args.item.skuId ? parseInt(args.item.skuId.toString(), 10) : 0,
        quantity: args.item.quantity,
        ...(args.item.message && { message: args.item.message }),
      };


    const variables = await this.generateVars(vars);
    const options: any = {
      query: queries.cartAddItem,
      variables,
    };
